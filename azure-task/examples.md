# Azure Pipeline Examples

Here are some example Azure Pipeline configurations using SetupGitForWindowsSDK:

## Basic Usage

```yaml
# azure-pipelines.yml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: SetupGitForWindowsSDK@1
  name: sdk
  displayName: 'Setup Git for Windows SDK'
  inputs:
    flavor: 'build-installers'
    architecture: 'x86_64'

- script: |
    echo "Git for Windows SDK is ready!"
    echo "SDK path: $(sdk.result)"
  displayName: 'Test SDK'
```

## Advanced Configuration

```yaml
# azure-pipelines.yml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: SetupGitForWindowsSDK@1
  name: sdk
  displayName: 'Setup Git for Windows SDK (Advanced)'
  inputs:
    flavor: 'full'
    architecture: 'x86_64'
    path: 'D:\git-sdk'
    githubToken: '$(secret.GITHUB_TOKEN)'
    verbose: 'true'
    msys: false

- script: |
    set PATH=$(sdk.result)\usr\bin;$(sdk.result)\mingw64\bin;%PATH%
    echo "Updated PATH with Git for Windows SDK"
    git --version
    gcc --version
  displayName: 'Use Git for Windows SDK'
```

## Multi-Architecture Build

```yaml
# azure-pipelines.yml
trigger:
- main

strategy:
  matrix:
    x64:
      imageName: 'windows-latest'
      arch: 'x86_64'
      mingw_prefix: 'mingw64'
    x86:
      imageName: 'windows-latest'
      arch: 'i686'
      mingw_prefix: 'mingw32'
    arm64:
      imageName: 'windows-arm64'
      arch: 'aarch64'
      mingw_prefix: 'clangarm64'

pool:
  vmImage: $(imageName)

steps:
- task: SetupGitForWindowsSDK@1
  name: sdk
  displayName: 'Setup Git for Windows SDK ($(arch))'
  inputs:
    flavor: 'full'
    architecture: '$(arch)'

- script: |
    set PATH=$(sdk.result)\usr\bin;$(sdk.result)\$(mingw_prefix)\bin;%PATH%
    echo "Building for $(arch)"
    gcc --version
  displayName: 'Build with $(arch)'
```

## Minimal Setup for Quick Builds

```yaml
# azure-pipelines.yml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: SetupGitForWindowsSDK@1
  name: sdk
  displayName: 'Setup Minimal Git for Windows SDK'
  inputs:
    flavor: 'minimal'
    architecture: 'x86_64'
    cache: 'auto'

- script: |
    echo "Quick build setup complete"
    echo "SDK location: $(sdk.result)"
  displayName: 'Verify Setup'
```
