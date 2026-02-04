# Commit AI - VS Code Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-blue.svg)](https://brainwave-api.vercel.app/commit-ai.vsix)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-orange.svg)](https://www.anthropic.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Generate meaningful commit messages with AI. One click. Three styles.

## Features

- **🚀 One-Click Generation** - Generate commit messages instantly from Source Control panel
- **📝 Three Styles** - Conventional, Simple, or Detailed commit messages
- **⚡ Fast** - Powered by Claude AI for speed and quality
- **💰 Cost Efficient** - Configurable diff limits to control API usage

## Installation

### Option 1: Direct Download
1. Download `commit-ai.vsix` from [brainwave-api.vercel.app](https://brainwave-api.vercel.app/commit-ai.vsix)
2. In VS Code, open Command Palette (Cmd/Ctrl+Shift+P)
3. Run "Extensions: Install from VSIX..."
4. Select the downloaded file

### Option 2: VS Code Marketplace
Coming soon!

## Usage

1. Stage your changes in Git
2. Click the ✨ icon in Source Control panel header
3. Or use Command Palette → "Commit AI: Generate Commit Message"
4. Commit message auto-fills in the input box

## Commit Styles

### Conventional (default)
```
feat(auth): add OAuth2 login support

- Implement Google OAuth flow
- Add token refresh logic
- Update user model
```

### Simple
```
Add OAuth2 login with Google support
```

### Detailed
```
feat(auth): implement OAuth2 authentication

This commit adds Google OAuth2 authentication support:
- New OAuth flow handler
- Automatic token refresh
- Updated user schema for OAuth data
- Error handling for auth failures

BREAKING CHANGE: User model now requires oauth_provider field
```

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `commit-ai.style` | Commit style: conventional, simple, detailed | conventional |
| `commit-ai.maxDiffLines` | Max diff lines to send (cost control) | 500 |

## Privacy

- No code stored
- Diff sent to API only when you request generation
- [Privacy Policy](https://brainwave-api.vercel.app/api/privacy)

## Tech Stack

- TypeScript
- VS Code Extension API
- Claude AI (Anthropic)

## License

MIT License - see [LICENSE](LICENSE)

## Links

- **Website**: [brainwave-api.vercel.app](https://brainwave-api.vercel.app/)
- **Chrome Extension**: [brainwave-ai-chrome](https://github.com/CruceSaunders/brainwave-ai-chrome)
- **Firefox Extension**: [brainwave-ai-firefox](https://github.com/CruceSaunders/brainwave-ai-firefox)

## Also By The Author

- **[Metacognition Template for OpenClaw](https://github.com/CruceSaunders/openclaw-metacog-template)** - Give any AI agent the ability to analyze and improve itself
