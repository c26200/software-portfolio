export interface PipelineStage {
  id: string;
  label: string;
  tool: string;
  cmd: string;
  log: string;
  duration: number;
}

/**
 * Illustrative CI/CD pipeline used by the pipeline section.
 * Timings are pacing values for the animation, not real build times.
 */
export const pipelineStages: PipelineStage[] = [
  {
    id: 'commit',
    label: 'commit',
    tool: 'git',
    cmd: 'git push origin main',
    log: '✓ commit · main',
    duration: 900,
  },
  {
    id: 'install',
    label: 'install',
    tool: 'pnpm',
    cmd: 'pnpm install --frozen-lockfile',
    log: '✓ install · 124 packages',
    duration: 1100,
  },
  {
    id: 'lint',
    label: 'lint',
    tool: 'eslint · tsc',
    cmd: 'pnpm lint && tsc --noEmit',
    log: '✓ lint · 0 problems',
    duration: 1000,
  },
  {
    id: 'test',
    label: 'test',
    tool: 'vitest',
    cmd: 'pnpm test --run',
    log: '✓ test · 42 passed',
    duration: 1200,
  },
  {
    id: 'build',
    label: 'build',
    tool: 'vite',
    cmd: 'pnpm build',
    log: '✓ build · 1.2 MB',
    duration: 1100,
  },
  {
    id: 'scan',
    label: 'scan',
    tool: 'trivy',
    cmd: 'trivy image app:sha-7f3c1a',
    log: '✓ scan · 0 critical',
    duration: 1100,
  },
  {
    id: 'deploy',
    label: 'deploy',
    tool: 'docker · cloudflare',
    cmd: 'docker compose up -d',
    log: '✓ deploy · production',
    duration: 1000,
  },
  {
    id: 'monitor',
    label: 'monitor',
    tool: 'uptime',
    cmd: 'curl -f https://software-portfolio-silk-eight.vercel.app',
    log: '✓ monitor · healthy',
    duration: 900,
  },
];
