/**
 * Fork-specific container environment variables.
 *
 * Reads env vars from .env that should be passed to containers as -e flags.
 * Unlike API secrets (handled by the credential proxy), these are visible
 * to Bash subprocesses — needed for CLI tools like gogcli.
 *
 * This file is intentionally separate from container-runner.ts to minimize
 * merge conflicts with upstream NanoClaw updates.
 */
import { readEnvFile } from './env.js';

/**
 * Returns env vars to inject into every container run.
 * Add new fork-specific env vars here.
 */
export function readContainerEnv(): Record<string, string> {
  const env = readEnvFile([
    'GOG_KEYRING_PASSWORD',
    'GOG_ACCOUNT',
    'TODOIST_API_KEY',
  ]);
  // QMD CLI needs XDG_CACHE_HOME to find the mounted index at /workspace/extra/qmd/
  env['XDG_CACHE_HOME'] = '/workspace/extra';
  // Skills detect NanoClaw context via this env var to adjust defaults (e.g., output channels)
  env['NANOCLAW'] = '1';
  return env;
}
