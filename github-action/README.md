# Setup Git for Windows SDK - GitHub Action

This package contains the GitHub Actions specific implementation for setting up
Git for Windows SDK.

## Overview

This package provides a GitHub Action that uses the shared library
(`setup-git-for-windows-sdk-shared`) to set up Git for Windows SDK in GitHub
Actions workflows.

## Implementation

The GitHub Action implementation:

1. Implements the `ICore` interface using `@actions/core` and `@actions/cache`.
2. Calls the shared library's `run()` function with the GitHub Actions specific
   implementation.
3. Handles GitHub Actions specific inputs, outputs, and environment setup.

## Building

```bash
npm run build    # Compile TypeScript
npm run package  # Bundle with ncc for distribution
```

## Testing

```bash
npm test
```

## Usage

This package is used internally by the main GitHub Action. Users should use the
action via the `action.yml` file in the repository root.
