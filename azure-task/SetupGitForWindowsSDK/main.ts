import {run, ICore} from 'setup-git-for-windows-sdk-shared'
import * as tl from 'azure-pipelines-task-lib'

export class AzurePipelinesCore implements ICore {
  isCacheAvailable(): boolean {
    // Azure Pipelines doesn't have built-in caching like GitHub Actions
    // This would need to be implemented using Azure Pipeline Caching tasks
    // or artifacts, but for simplicity we'll return false for now
    return false
  }

  async restoreCache(
    paths: string[],
    primaryKey: string
  ): Promise<string | undefined> {
    // Cache functionality would need to be implemented using Azure Pipeline
    // Cache task or artifacts. For now, we'll return undefined (no cache hit)
    tl.debug(
      `Cache restore requested for paths: ${paths.join(', ')}, key: ${primaryKey}`
    )
    return undefined
  }

  async saveCache(paths: string[], key: string): Promise<number> {
    // Cache functionality would need to be implemented using Azure Pipeline
    // Cache task or artifacts. For now, we'll return 0 (no cache saved)
    tl.debug(`Cache save requested for paths: ${paths.join(', ')}, key: ${key}`)
    return 0
  }

  getInput(name: string): string {
    // Map input names to Azure Pipelines task input names
    const inputMap: {[key: string]: string} = {
      'github-token': 'githubToken'
    }

    const mappedName = inputMap[name] || name
    return tl.getInput(mappedName, false) || ''
  }

  setOutput(name: string, value: string): void {
    // Azure Pipelines uses task.setVariable for outputs
    tl.setVariable(name, value)
  }

  addPath(inputPath: string): void {
    // Add to PATH environment variable
    tl.prependPath(inputPath)
  }

  exportVariable(name: string, value: string): void {
    // Set environment variable
    tl.setVariable(name, value)
  }

  info(message: string): void {
    // eslint-disable-next-line no-console
    console.log(message)
  }

  warning(message: string): void {
    tl.warning(message)
  }

  error(message: string): void {
    tl.error(message)
  }

  setFailed(message: string): void {
    tl.setResult(tl.TaskResult.Failed, message)
  }

  startGroup(name: string): void {
    // Azure Pipelines doesn't have direct group equivalent
    // We'll use a formatted log message instead
    // eslint-disable-next-line no-console
    console.log(`##[group]${name}`)
  }

  endGroup(): void {
    // Azure Pipelines doesn't have direct group equivalent
    // eslint-disable-next-line no-console
    console.log(`##[endgroup]`)
  }

  saveState(name: string, value: string): void {
    // Azure Pipelines doesn't have built-in state persistence between tasks
    // We'll use task variables for the current job scope
    tl.setVariable(`_state_${name}`, value)
  }

  getState(name: string): string {
    // Retrieve state from task variables
    return tl.getVariable(`_state_${name}`) || ''
  }
}

async function main(): Promise<void> {
  try {
    await run(new AzurePipelinesCore())
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    tl.setResult(tl.TaskResult.Failed, errorMessage)
  }
}

main()
