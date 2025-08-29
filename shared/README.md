# Setup Git for Windows SDK - Shared Library

This package contains the shared implementation for setting up Git for Windows SDK across different platforms.

## Overview

The shared library provides platform-agnostic functionality that can be used by various implementations:

- GitHub Actions
- Azure DevOps Tasks  
- Command-line tools
- Other CI/CD platforms

## Architecture

The library uses an abstraction pattern with the `ICore` interface that allows different platforms to provide their own implementations for:

- Input/output handling
- Caching
- Logging
- Environment variable management
- Path manipulation

## Main Functions

- `run(core: ICore)` - Main entry point that sets up the Git for Windows SDK
- `getViaGit()` - Downloads SDK via Git repository
- `getViaCIArtifacts()` - Downloads SDK via CI artifacts
- Various utility functions for Git operations, downloading, and spawning processes

## Usage

```typescript
import { run, ICore } from 'setup-git-for-windows-sdk-shared'

class MyPlatformCore implements ICore {
  // Implement the ICore interface methods
  // for your specific platform
}

const core = new MyPlatformCore()
await run(core)
```

## Dependencies

The shared library has minimal dependencies to keep it lightweight and platform-agnostic:

- `@octokit/rest` - GitHub API interactions
- `node-fetch` - HTTP requests  
- `unzipper` - Archive extraction
- `@adobe/node-fetch-retry` - Reliable HTTP requests

Platform-specific dependencies like `@actions/core` and `@actions/cache` are provided as peer dependencies by the consuming packages.
