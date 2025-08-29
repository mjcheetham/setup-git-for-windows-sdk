// Core interfaces and types
export {ICore} from './src/core'

// Main action function
export {run} from './src/action'

// Utility functions
export {
  getArtifactMetadata,
  getViaGit,
  gitForWindowsUsrBinPath
} from './src/git'
export {getViaCIArtifacts} from './src/ci_artifacts'
export {mkdirp} from './src/downloader'
export {spawnAndWaitForExitCode, SpawnReturnArgs} from './src/spawn'
