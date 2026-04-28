import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

vi.mock('@codesandbox/sandpack-react', () => ({
  Sandpack: ({
    files,
    options,
  }: {
    files?: Record<string, string | { code: string }>
    options?: { activeFile?: string }
  }) => {
    const activeFile = options?.activeFile ?? '/App.js'
    const activeFileEntry = files?.[activeFile]
    const activeCode = typeof activeFileEntry === 'string' ? activeFileEntry : activeFileEntry?.code

    return React.createElement(
      'div',
      { 'data-testid': 'sandpack-preview', 'data-active-file': activeFile },
      React.createElement('p', null, 'Sandpack Practice Preview'),
      React.createElement('pre', null, activeCode ?? 'export default function App() { return <h1>Hello world</h1> }'),
    )
  },
}))
