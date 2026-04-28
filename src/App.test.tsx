import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach } from 'vitest'
import App from './App'
import { exercises, getExerciseForLesson, lessons } from './content/lessons'
import { STORAGE_KEY } from './features/progress/progress'

function renderAt(path: string) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('TypeScript Quest', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('renders a Korean TypeScript learning landing page with official references', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { name: /TypeScript Quest/i })).toBeInTheDocument()
    expect(screen.getByText(/타입스크립트 핸드북 Basic Types/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /한국어 핸드북 Basic Types/i })).toHaveAttribute(
      'href',
      'https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html',
    )
    expect(screen.getByRole('link', { name: /TypeScript 한국어 문서/i })).toHaveAttribute(
      'href',
      'https://typescript-kr.github.io/',
    )
    expect(screen.getByRole('link', { name: /퀘스트 시작하기/i })).toHaveAttribute('href', '/quests')
  })

  it('lists official-doc-aligned quests with self-describing lesson links', () => {
    renderAt('/quests')

    expect(screen.getByRole('heading', { name: /퀘스트 맵/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /원시 타입 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/primitive-types',
    )
    expect(screen.getByRole('link', { name: /배열과 튜플 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/arrays-tuples',
    )
    expect(screen.getByRole('link', { name: /any와 unknown 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/any-unknown',
    )
    expect(screen.getByRole('link', { name: /Props 타입 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/react-props',
    )
    expect(screen.getByRole('link', { name: /useState 타입 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/react-usestate',
    )
    expect(screen.getByRole('link', { name: /이벤트 핸들러 타입 퀘스트 열기/i })).toHaveAttribute(
      'href',
      '/quest/react-events',
    )
  })

  it('shows a lesson page with quiz feedback and persists completed quiz progress', async () => {
    const user = userEvent.setup()
    renderAt('/quest/primitive-types')

    expect(screen.getByRole('heading', { name: /원시 타입/i })).toBeInTheDocument()
    expect(screen.getByText(/string, number, boolean/i)).toBeInTheDocument()

    const quiz = screen.getByTestId('quiz-primitive-types-basic')
    await user.click(within(quiz).getByRole('button', { name: /const score: number = 100/i }))

    expect(within(quiz).getByText('정답')).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY)).toContain('primitive-types-basic')
  })

  it('renders a route-specific practice page and persists completed exercise progress', async () => {
    const user = userEvent.setup()
    renderAt('/quest/arrays-tuples/practice')

    expect(screen.getByRole('heading', { name: /배열과 튜플 실습/i })).toBeInTheDocument()
    expect(screen.getAllByText(/readonly string\[]/i).length).toBeGreaterThan(0)
    expect(screen.getByTestId('sandpack-preview')).toHaveAttribute('data-active-file', '/App.js')
    expect(screen.queryByText(/Hello world/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /정답 보기/i }))
    await user.click(screen.getByRole('button', { name: /테스트 실행/i }))
    expect(localStorage.getItem(STORAGE_KEY)).toContain('arrays-tuples-practice')
  })

  it('has curated non-placeholder exercises for every lesson', () => {
    for (const lesson of lessons) {
      const exercise = getExerciseForLesson(lesson.id)
      expect(exercise).toBeDefined()
      expect(exercise?.starterCode).not.toMatch(/Hello world/i)
      expect(exercise?.solutionCode).not.toMatch(/Hello world/i)
      expect(exercise?.starterCode).not.toBe(exercise?.solutionCode)
      expect(exercise?.hints.length).toBeGreaterThanOrEqual(2)
      expect(exercise?.checks.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('adds React + TypeScript quests for props, useState, and event handlers', () => {
    renderAt('/quest/react-props')

    expect(screen.getByRole('heading', { name: /Props 타입/i })).toBeInTheDocument()
    expect(screen.getAllByText(/컴포넌트 props/i).length).toBeGreaterThan(0)
    expect(lessons.map((lesson) => lesson.slug)).toEqual(
      expect.arrayContaining(['react-props', 'react-usestate', 'react-events']),
    )
    expect(exercises.map((exercise) => exercise.id)).toEqual(
      expect.arrayContaining([
        'react-props-practice',
        'react-usestate-practice',
        'react-events-practice',
      ]),
    )
  })

  it('auto-grades practice code, reveals the solution, resets code, and only completes after passing checks', async () => {
    const user = userEvent.setup()
    renderAt('/quest/react-events/practice')

    expect(screen.getByRole('heading', { name: /이벤트 핸들러 타입 실습/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /테스트 실행/i }))
    expect(screen.getByText(/아직 통과하지 못했어요/i)).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY) ?? '').not.toContain('react-events-practice')

    await user.click(screen.getByRole('button', { name: /정답 보기/i }))
    const editor = screen.getByLabelText(/실습 코드/i)
    expect((editor as HTMLTextAreaElement).value).toContain('React.MouseEvent<HTMLButtonElement>')

    await user.click(screen.getByRole('button', { name: /테스트 실행/i }))
    expect(screen.getByText(/모든 체크를 통과했어요/i)).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY)).toContain('react-events-practice')

    await user.click(screen.getByRole('button', { name: /초기화/i }))
    expect((editor as HTMLTextAreaElement).value).not.toContain('React.MouseEvent<HTMLButtonElement>')
  })

  it('shows a progress dashboard with percentage, completed badges, and continue link', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completedQuizIds: ['primitive-types-basic'],
        completedExerciseIds: ['primitive-types-practice'],
        lastOpenedLessonId: 'react-usestate',
      }),
    )

    renderAt('/dashboard')

    expect(screen.getByRole('heading', { name: /진행률 대시보드/i })).toBeInTheDocument()
    expect(screen.getByText(/2\/12 완료/i)).toBeInTheDocument()
    expect(screen.getAllByText(/17%/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /useState 타입 이어하기/i })).toHaveAttribute(
      'href',
      '/quest/react-usestate',
    )

    renderAt('/quests')
    const primitiveCard = screen.getByTestId('lesson-card-primitive-types')
    expect(within(primitiveCard).getByText(/퀘스트 완료/i)).toBeInTheDocument()
  })
})
