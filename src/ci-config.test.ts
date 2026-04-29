import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('GitHub Actions CI config', () => {
  it('runs test, build, and lint on pushes and pull requests to main', () => {
    const workflow = readFileSync(join(process.cwd(), '.github/workflows/ci.yml'), 'utf8')

    expect(workflow).toContain('name: CI')
    expect(workflow).toContain('push:')
    expect(workflow).toContain('pull_request:')
    expect(workflow).toContain('branches: [main]')
    expect(workflow).toContain('npm ci')
    expect(workflow).toContain('npm test -- --run')
    expect(workflow).toContain('npm run build')
    expect(workflow).toContain('npm run lint')
  })
})
