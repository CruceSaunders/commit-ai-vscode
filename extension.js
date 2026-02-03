const vscode = require('vscode');
const { exec } = require('child_process');
const https = require('https');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Commit AI is now active!');

    // Register the generate commit command
    let generateCommand = vscode.commands.registerCommand('commit-ai.generateCommit', async () => {
        await generateCommitMessage();
    });

    // Register the set API key command
    let setKeyCommand = vscode.commands.registerCommand('commit-ai.setApiKey', async () => {
        const key = await vscode.window.showInputBox({
            prompt: 'Enter your Anthropic API key',
            password: true,
            placeHolder: 'sk-ant-...'
        });
        if (key) {
            await vscode.workspace.getConfiguration('commit-ai').update('apiKey', key, true);
            vscode.window.showInformationMessage('API key saved successfully!');
        }
    });

    context.subscriptions.push(generateCommand, setKeyCommand);
}

async function generateCommitMessage() {
    const config = vscode.workspace.getConfiguration('commit-ai');
    const apiKey = config.get('apiKey');
    const commitStyle = config.get('commitStyle') || 'conventional';
    const maxDiffLines = config.get('maxDiffLines') || 500;

    if (!apiKey) {
        const result = await vscode.window.showWarningMessage(
            'No API key configured. Set your Anthropic API key to use Commit AI.',
            'Set API Key'
        );
        if (result === 'Set API Key') {
            vscode.commands.executeCommand('commit-ai.setApiKey');
        }
        return;
    }

    // Get workspace folder
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;

    // Show progress
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Generating commit message...',
        cancellable: false
    }, async (progress) => {
        try {
            // Get staged diff
            const stagedDiff = await getStagedDiff(workspacePath, maxDiffLines);
            
            if (!stagedDiff || stagedDiff.trim() === '') {
                // Try unstaged diff if no staged changes
                const unstagedDiff = await getUnstagedDiff(workspacePath, maxDiffLines);
                if (!unstagedDiff || unstagedDiff.trim() === '') {
                    vscode.window.showWarningMessage('No changes detected. Stage some files first.');
                    return;
                }
                // Ask if they want to stage all changes
                const stageResult = await vscode.window.showInformationMessage(
                    'No staged changes found, but there are unstaged changes. Stage all changes?',
                    'Stage All', 'Cancel'
                );
                if (stageResult === 'Stage All') {
                    await stageAll(workspacePath);
                } else {
                    return;
                }
            }

            // Get the diff again after potential staging
            const diff = await getStagedDiff(workspacePath, maxDiffLines);
            
            progress.report({ message: 'Analyzing changes...' });

            // Generate commit message using Claude
            const commitMessage = await callClaudeAPI(apiKey, diff, commitStyle);

            if (commitMessage) {
                // Show the commit message with options
                const result = await vscode.window.showInformationMessage(
                    commitMessage,
                    { modal: true },
                    'Use This', 'Edit', 'Regenerate'
                );

                if (result === 'Use This') {
                    // Set the commit message in SCM input
                    await setCommitMessage(commitMessage);
                } else if (result === 'Edit') {
                    const edited = await vscode.window.showInputBox({
                        value: commitMessage,
                        prompt: 'Edit commit message',
                        validateInput: (value) => value.trim() ? null : 'Commit message cannot be empty'
                    });
                    if (edited) {
                        await setCommitMessage(edited);
                    }
                } else if (result === 'Regenerate') {
                    // Regenerate
                    vscode.commands.executeCommand('commit-ai.generateCommit');
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });
}

function getStagedDiff(workspacePath, maxLines) {
    return new Promise((resolve, reject) => {
        exec('git diff --staged', { cwd: workspacePath, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            if (error && !stdout) {
                reject(new Error('Failed to get staged diff. Is this a git repository?'));
                return;
            }
            // Limit diff size
            const lines = stdout.split('\n');
            const truncated = lines.slice(0, maxLines).join('\n');
            if (lines.length > maxLines) {
                resolve(truncated + '\n\n[Diff truncated for cost control]');
            } else {
                resolve(truncated);
            }
        });
    });
}

function getUnstagedDiff(workspacePath, maxLines) {
    return new Promise((resolve, reject) => {
        exec('git diff', { cwd: workspacePath, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            if (error && !stdout) {
                resolve('');
                return;
            }
            const lines = stdout.split('\n');
            resolve(lines.slice(0, maxLines).join('\n'));
        });
    });
}

function stageAll(workspacePath) {
    return new Promise((resolve, reject) => {
        exec('git add -A', { cwd: workspacePath }, (error) => {
            if (error) {
                reject(new Error('Failed to stage changes'));
                return;
            }
            resolve();
        });
    });
}

async function setCommitMessage(message) {
    // Get the Git extension
    const gitExtension = vscode.extensions.getExtension('vscode.git');
    if (gitExtension) {
        const git = gitExtension.exports.getAPI(1);
        if (git.repositories.length > 0) {
            git.repositories[0].inputBox.value = message;
            vscode.window.showInformationMessage('Commit message set! Review and commit when ready.');
        }
    }
}

function callClaudeAPI(apiKey, diff, style) {
    return new Promise((resolve, reject) => {
        const stylePrompts = {
            conventional: `Generate a conventional commit message following the format: <type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
Keep the first line under 72 characters.
Add a blank line and bullet points for details if needed.`,
            
            simple: `Generate a simple, clear commit message in 1-2 sentences.
Be concise but descriptive.`,
            
            detailed: `Generate a detailed commit message with:
- A concise summary line (under 72 chars)
- A blank line
- Detailed explanation of what and why (not how)
- List any breaking changes`
        };

        const prompt = `You are a helpful assistant that generates git commit messages. Analyze the following git diff and generate an appropriate commit message.

${stylePrompts[style]}

Important:
- Focus on WHAT changed and WHY, not HOW
- Be specific but concise
- Don't include the diff in your response
- Just output the commit message, nothing else

Git diff:
\`\`\`
${diff}
\`\`\``;

        const data = JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            messages: [
                { role: 'user', content: prompt }
            ]
        });

        const options = {
            hostname: 'api.anthropic.com',
            port: 443,
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    if (parsed.error) {
                        reject(new Error(parsed.error.message || 'API error'));
                        return;
                    }
                    if (parsed.content && parsed.content[0]) {
                        resolve(parsed.content[0].text.trim());
                    } else {
                        reject(new Error('Unexpected API response'));
                    }
                } catch (e) {
                    reject(new Error('Failed to parse API response'));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`API request failed: ${e.message}`));
        });

        req.write(data);
        req.end();
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
