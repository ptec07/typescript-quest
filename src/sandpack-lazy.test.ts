import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Sandpack code splitting', () => {
  it('lazy-loads Sandpack instead of putting it in the initial App bundle', () => {
    const appSource = readFileSync(join(process.cwd(), 'src/App.tsx'), 'utf8')

    expect(appSource).not.toMatch(/import \{ Sandpack \} from ['"]@codesandbox\/sandpack-react['"]/) 
    expect(appSource).toContain("import('@codesandbox/sandpack-react')")
    expect(appSource).toContain('<Suspense')
  })
})
