# Setup Git for Windows SDK - Azure DevOps Extension

This Azure DevOps extension provides a task to set up Git for Windows SDK in your build pipeline.

## Features

- Downloads and sets up Git for Windows SDK
- Supports multiple flavors: minimal, makepkg-git, build-installers, full
- Supports multiple architectures: i686, x86_64, aarch64
- Automatic fast disk detection for optimal performance
- Configurable caching (future enhancement)

## Usage

Add the "Setup Git for Windows SDK" task to your Azure DevOps pipeline:

```yaml
- task: SetupGitForWindowsSDK@1
  inputs:
    flavor: 'build-installers'  # or 'minimal', 'makepkg-git', 'full'
    architecture: 'x86_64'      # or 'i686', 'aarch64'
    cache: 'auto'               # or 'true', 'false'
    # Optional inputs:
    # path: 'C:\\custom\\path'
    # githubToken: '$(GITHUB_TOKEN)'
    # verbose: 'true'
    # msys: true
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `flavor` | The flavor of Git for Windows SDK | Yes | `build-installers` |
| `architecture` | Target architecture | Yes | `x86_64` |
| `cache` | Caching strategy | No | `auto` |
| `path` | Custom installation path | No | Auto-detected |
| `githubToken` | GitHub authentication token | No | Pipeline default |
| `verbose` | Enable verbose output | No | `false` |
| `msys` | Enable MSYS mode | No | `false` |

## Outputs

| Output | Description |
|--------|-------------|
| `result` | Path where Git for Windows SDK was installed |

## Building

To build the extension:

```bash
# Install dependencies
npm install

# Build the task
npm run build

# Package the extension
npm run package
```

## Installation

1. Build the extension using the steps above
2. Upload the generated `.vsix` file to your Azure DevOps organization
3. Install the extension in your projects
