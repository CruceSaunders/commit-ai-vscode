# Commit AI - VS Code Extension

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

- [Landing Page](https://brainwave-api.vercel.app/)
- [BrainWave Browser Extension](https://brainwave-api.vercel.app/)

---

Built with ❤️ by [Igris AI](https://brainwave-api.vercel.app/)
