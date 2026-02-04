# Commit AI - VS Code Marketplace Listing

## Basic Information

**Name:** Commit AI - Smart Git Commits  
**Publisher ID:** (to be created)  
**Identifier:** commit-ai

## Display Information

**Display Name:** Commit AI  
**Short Description:**
Generate meaningful, conventional commit messages with AI. One click in the Source Control panel.

## Full Description (Markdown supported)

# Commit AI 🤖

**Stop wasting time writing commit messages.** Let AI analyze your changes and generate perfect, conventional commit messages in one click.

## ✨ Features

### 🎯 One-Click Commit Messages
Click the Commit AI icon in your Source Control panel and get an instant, meaningful commit message.

### 📝 Three Message Styles
- **Conventional:** `feat:`, `fix:`, `docs:` format for projects using Conventional Commits
- **Simple:** Clear, concise descriptions for any project
- **Detailed:** Comprehensive messages with body explaining the changes

### ⚡ Smart Diff Analysis
Commit AI reads your staged changes and understands:
- What files changed
- What kind of changes were made
- The context and purpose of the changes

### 🎨 Source Control Integration
Seamlessly integrates into VS Code's Source Control panel - right where you need it.

## 🚀 How to Use

1. Stage your changes as normal
2. Click the **Commit AI** icon in the Source Control title bar
3. Select your preferred style (conventional, simple, or detailed)
4. Review and commit!

## ⚙️ Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `commitAi.style` | Default commit message style | `conventional` |
| `commitAi.maxDiffLength` | Max characters of diff to analyze | `4000` |

## 💎 Pricing

- **FREE:** Unlimited use
- Powered by Claude AI for high-quality results

## 🔒 Privacy

- Only your staged diff is sent for analysis
- No code is stored
- No telemetry or tracking

## Requirements

- VS Code 1.60.0 or higher
- Git repository

## Links

- [GitHub Repository](https://github.com/CruceSaunders/commit-ai-vscode)
- [Report Issues](https://github.com/CruceSaunders/commit-ai-vscode/issues)
- [Changelog](https://github.com/CruceSaunders/commit-ai-vscode/blob/main/CHANGELOG.md)

---

Made with ❤️ for developers who value their time.

## Categories
- **Primary:** SCM Providers
- **Secondary:** Other

## Tags (max 5)
- git
- commit
- ai
- productivity
- source-control

## Gallery Banner
- **Color:** #1a1a2e (dark blue/purple)
- **Theme:** dark

## Repository
https://github.com/CruceSaunders/commit-ai-vscode

## Submission Checklist

- [x] Extension package (.vsix) - commit-ai-1.0.0.vsix
- [x] Icon (128x128) - icon.png
- [x] README.md with full documentation
- [x] CHANGELOG.md
- [x] LICENSE (MIT)
- [x] package.json configured
- [x] GitHub repository public
- [ ] Azure DevOps account (free - needs creation)
- [ ] Publisher created in VS Code Marketplace

## Publishing Steps

1. Create Azure DevOps organization (free)
2. Generate Personal Access Token (PAT)
3. Create publisher via `vsce create-publisher`
4. Publish via `vsce publish`

**Commands:**
```bash
npm install -g @vscode/vsce
vsce create-publisher (publisher-name)
vsce login (publisher-name)
vsce publish
```

## Estimated Review Time

VS Code Marketplace typically auto-approves within minutes to a few hours if the extension passes automated checks. Manual review rare.

---

**Ready for instant publish when Azure DevOps account is created.**
