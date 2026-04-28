import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Vercel deployment config', () => {
  it('rewrites SPA routes to the Vite entry and keeps a 404 shell fallback', () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))

    expect(config.version).toBe(2)
    expect(config.outputDirectory).toBe('dist')
    expect(config.rewrites).toEqual(
      expect.arrayContaining([
        { source: '/quests', destination: '/' },
        { source: '/quest/(.*)', destination: '/' },
        { source: '/dashboard', destination: '/' },
        { source: '/(.*)', destination: '/index.html' },
      ]),
    )
    expect(packageJson.scripts.build).toContain('cp dist/index.html dist/404.html')
  })
})
