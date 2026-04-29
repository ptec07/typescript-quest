import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react'
import type { SandpackProps } from '@codesandbox/sandpack-react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import {
  getExerciseForLesson,
  getLessonById,
  getLessonBySlug,
  gradeExercise,
  lessons,
  officialLinks,
  type Exercise,
  type QuizOption,
} from './content/lessons'
import {
  emptyProgress,
  parseProgressBackup,
  progressPercent,
  serializeProgressBackup,
} from './features/progress/progress'
import { useProgress } from './features/progress/useProgress'

const LazySandpack = lazy(() =>
  import('@codesandbox/sandpack-react').then((module) => ({
    default: module.Sandpack as ComponentType<SandpackProps>,
  })),
)

type ProgressProps = {
  completedQuizCount: number
  completedExerciseCount: number
}

function AppShell({ children, progress }: { children: React.ReactNode; progress: ProgressProps }) {
  const total = lessons.length * 2
  const completed = progress.completedQuizCount + progress.completedExerciseCount
  const percent = progressPercent(completed, total)

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          TypeScript Quest
        </Link>
        <nav aria-label="주요 메뉴">
          <Link to="/quests">퀘스트 맵</Link>
          <Link to="/dashboard">대시보드</Link>
          <a href={officialLinks.basicTypes} target="_blank" rel="noreferrer">
            공식 Basic Types
          </a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="progress-strip" aria-label="학습 진행률">
        <span>
          진행률 {completed}/{total} · {percent}%
        </span>
        <div className="meter" aria-hidden="true">
          <span style={{ width: `${percent}%` }} />
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <section className="hero-page">
      <p className="eyebrow">한국어 TypeScript 문서 기반 인터랙티브 학습</p>
      <h1>TypeScript Quest</h1>
      <p className="lead">
        타입스크립트 핸드북 Basic Types와 React + TypeScript 흐름을 따라 기본 타입부터 컴포넌트
        props, useState, 이벤트 핸들러까지 작은 퀴즈와 코드 실습으로 익히는 웹앱입니다.
      </p>
      <div className="cta-row">
        <Link className="primary-button" to="/quests">
          퀘스트 시작하기
        </Link>
        <Link to="/dashboard">진행률 보기</Link>
        <a href={officialLinks.basicTypes} target="_blank" rel="noreferrer">
          한국어 핸드북 Basic Types
        </a>
        <a href={officialLinks.koreanDocs} target="_blank" rel="noreferrer">
          TypeScript 한국어 문서
        </a>
      </div>
      <div className="source-card">
        <strong>참조 문서</strong>
        <p>
          공식 문서의 “The Basics”, 원시 타입, 배열, 튜플, any/unknown과 React TypeScript 주제를
          학습 카드로 재구성했습니다.
        </p>
      </div>
    </section>
  )
}

function CourseMapPage({
  completedQuizIds,
  completedExerciseIds,
}: {
  completedQuizIds: string[]
  completedExerciseIds: string[]
}) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Quest Map</p>
        <h1>퀘스트 맵</h1>
        <p>문서 주제별로 읽기 → 퀴즈 → 자동 채점 실습 순서로 진행하세요.</p>
      </div>
      <div className="lesson-grid">
        {lessons.map((lesson, index) => {
          const exercise = getExerciseForLesson(lesson.id)
          const quizDone = completedQuizIds.includes(lesson.quiz.id)
          const practiceDone = exercise ? completedExerciseIds.includes(exercise.id) : false
          return (
            <article className="lesson-card" data-testid={`lesson-card-${lesson.id}`} key={lesson.id}>
              <span className="quest-number">Q{index + 1}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.subtitle}</p>
              <div className="badge-row">
                {quizDone ? <span className="badge">퀴즈 완료</span> : null}
                {practiceDone ? <span className="badge">실습 완료</span> : null}
                {quizDone && practiceDone ? <span className="badge complete">퀘스트 완료</span> : null}
              </div>
              <Link to={`/quest/${lesson.slug}`}>{lesson.title} 퀘스트 열기</Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function DashboardPage({
  completedQuizIds,
  completedExerciseIds,
  lastOpenedLessonId,
  backupText,
  onImportProgress,
  onResetProgress,
}: {
  completedQuizIds: string[]
  completedExerciseIds: string[]
  lastOpenedLessonId?: string
  backupText: string
  onImportProgress: (rawBackup: string) => boolean
  onResetProgress: () => void
}) {
  const [importText, setImportText] = useState('')
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)
  const total = lessons.length * 2
  const completed = completedQuizIds.length + completedExerciseIds.length
  const percent = progressPercent(completed, total)
  const lastLesson = getLessonById(lastOpenedLessonId) ?? lessons[0]
  const backupDownloadHref = `data:application/json;charset=utf-8,${encodeURIComponent(backupText)}`

  async function copyBackup() {
    await navigator.clipboard?.writeText(backupText)
    setCopyStatus('백업 데이터를 복사했습니다.')
  }

  return (
    <section className="page-section dashboard-page">
      <div className="section-heading">
        <p className="eyebrow">Dashboard</p>
        <h1>진행률 대시보드</h1>
        <p>
          {completed}/{total} 완료 · {percent}%
        </p>
      </div>
      <div className="dashboard-grid">
        <article className="panel stat-card">
          <strong>{percent}%</strong>
          <span>전체 진행률</span>
        </article>
        <article className="panel stat-card">
          <strong>{completedQuizIds.length}</strong>
          <span>완료한 퀴즈</span>
        </article>
        <article className="panel stat-card">
          <strong>{completedExerciseIds.length}</strong>
          <span>완료한 실습</span>
        </article>
      </div>
      <article className="panel continue-card">
        <h2>이어하기</h2>
        <p>마지막으로 열었던 퀘스트부터 다시 시작하세요.</p>
        <Link className="primary-button" to={`/quest/${lastLesson.slug}`}>
          {lastLesson.title} 이어하기
        </Link>
      </article>
      <article className="panel sync-card">
        <h2>진행률 백업</h2>
        <p>계정 없이도 이 JSON을 저장해 두면 다른 브라우저에서 진행률을 복원할 수 있습니다.</p>
        <label className="code-label" htmlFor="progress-backup">
          진행률 백업 데이터
        </label>
        <textarea id="progress-backup" className="backup-editor" readOnly value={backupText} />
        <div className="backup-actions">
          <button type="button" onClick={copyBackup}>
            백업 복사
          </button>
          <a className="primary-button secondary-button" href={backupDownloadHref} download="typescript-quest-progress.json">
            JSON 다운로드
          </a>
          <button
            className="danger-button"
            type="button"
            onClick={() => {
              onResetProgress()
              setImportText('')
              setImportStatus('진행률을 초기화했습니다.')
            }}
          >
            진행률 초기화
          </button>
        </div>
        {copyStatus ? <p className="feedback correct">{copyStatus}</p> : null}
        <label className="code-label" htmlFor="progress-import">
          백업 데이터 붙여넣기
        </label>
        <textarea
          id="progress-import"
          className="backup-editor"
          value={importText}
          onChange={(event) => setImportText(event.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const imported = onImportProgress(importText)
            setImportStatus(imported ? '백업을 불러왔습니다.' : '백업 데이터를 읽을 수 없습니다.')
          }}
        >
          백업 불러오기
        </button>
        {importStatus ? <p className="feedback correct">{importStatus}</p> : null}
      </article>
      <div className="lesson-grid compact">
        {lessons.map((lesson) => {
          const exercise = getExerciseForLesson(lesson.id)
          const complete =
            completedQuizIds.includes(lesson.quiz.id) &&
            Boolean(exercise && completedExerciseIds.includes(exercise.id))
          return (
            <article className="lesson-card" key={lesson.id}>
              <h2>{lesson.title}</h2>
              <p>{complete ? '퀘스트 완료' : '진행 가능'}</p>
              <Link to={`/quest/${lesson.slug}`}>열기</Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function QuizCard({ quiz, onCorrect }: { quiz: { id: string; question: string; options: QuizOption[] }; onCorrect: () => void }) {
  const [selected, setSelected] = useState<QuizOption | null>(null)

  return (
    <section className="quiz-card" data-testid={`quiz-${quiz.id}`}>
      <h2>체크포인트 퀴즈</h2>
      <p>{quiz.question}</p>
      <div className="option-list">
        {quiz.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => {
              setSelected(option)
              if (option.correct) onCorrect()
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected ? (
        <div className={selected.correct ? 'feedback correct' : 'feedback'}>
          <strong>{selected.correct ? '정답' : '다시 시도'}</strong>
          <p>{selected.explanation}</p>
        </div>
      ) : null}
    </section>
  )
}

function LessonPage({ completeQuiz, openLesson }: { completeQuiz: (quizId: string) => void; openLesson: (lessonId: string) => void }) {
  const { slug } = useParams()
  const lesson = getLessonBySlug(slug)

  useEffect(() => {
    if (lesson) openLesson(lesson.id)
  }, [lesson, openLesson])

  if (!lesson) return <NotFoundPage />

  return (
    <section className="page-section lesson-page">
      <Link to="/quests">← 퀘스트 맵으로</Link>
      <div className="section-heading">
        <p className="eyebrow">TypeScript Quest</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
      </div>
      <div className="two-column">
        <article className="panel">
          <h2>학습 목표</h2>
          <ul>
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
          <h2>문서에서 확인할 키워드</h2>
          <ul>
            {lesson.docAnchors.map((anchor) => (
              <li key={anchor}>{anchor}</li>
            ))}
          </ul>
          <a href={officialLinks.basicTypes} target="_blank" rel="noreferrer">
            공식 문서에서 이어 읽기
          </a>
        </article>
        <QuizCard quiz={lesson.quiz} onCorrect={() => completeQuiz(lesson.quiz.id)} />
      </div>
      <Link className="primary-button" to={`/quest/${lesson.slug}/practice`}>
        {lesson.title} 실습 열기
      </Link>
    </section>
  )
}

function PracticeWorkspace({
  exercise,
  completeExercise,
}: {
  exercise: Exercise
  completeExercise: (exerciseId: string) => void
}) {
  const [code, setCode] = useState(exercise.starterCode)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const results = useMemo(() => gradeExercise(exercise, code), [exercise, code])
  const passed = results.every((result) => result.passed)

  function runChecks() {
    setHasRun(true)
    if (passed) completeExercise(exercise.id)
  }

  return (
    <div className="practice-layout">
      <article className="panel">
        <h2>{exercise.title}</h2>
        <p>{exercise.explanation}</p>
        <div className="practice-actions">
          <button type="button" onClick={() => setShowHints((value) => !value)}>
            힌트 보기
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(exercise.solutionCode)
              setShowSolution(true)
              setHasRun(false)
            }}
          >
            정답 보기
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(exercise.starterCode)
              setShowSolution(false)
              setHasRun(false)
            }}
          >
            초기화
          </button>
        </div>
        {showHints ? (
          <ul>
            {exercise.hints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        ) : null}
        {showSolution ? <p className="feedback correct">정답 코드를 편집기에 불러왔습니다.</p> : null}
        <button className="primary-button" type="button" onClick={runChecks}>
          테스트 실행
        </button>
        {hasRun ? (
          <div className={passed ? 'feedback correct' : 'feedback'}>
            <strong>{passed ? '모든 체크를 통과했어요' : '아직 통과하지 못했어요'}</strong>
            <ul>
              {results.map((result) => (
                <li key={result.label}>{result.passed ? '✓' : '·'} {result.label}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
      <div className="editor-panel">
        <label className="code-label" htmlFor="practice-code">
          실습 코드
        </label>
        <textarea
          id="practice-code"
          className="code-editor"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
        />
        <Suspense fallback={<div className="sandpack-loading">실습 미리보기를 불러오는 중입니다…</div>}>
          <LazySandpack
            template="react"
            files={{ '/App.js': code }}
            options={{ activeFile: '/App.js', visibleFiles: ['/App.js'], showTabs: true }}
          />
        </Suspense>
      </div>
    </div>
  )
}

function PracticePage({ completeExercise }: { completeExercise: (exerciseId: string) => void }) {
  const { slug } = useParams()
  const lesson = getLessonBySlug(slug)
  const exercise = lesson ? getExerciseForLesson(lesson.id) : undefined

  if (!lesson || !exercise) return <NotFoundPage />

  return (
    <section className="page-section practice-page">
      <Link to={`/quest/${lesson.slug}`}>← {lesson.title} 레슨으로</Link>
      <div className="section-heading">
        <p className="eyebrow">Practice</p>
        <h1>{lesson.title} 실습</h1>
        <p>{exercise.prompt}</p>
      </div>
      <PracticeWorkspace key={exercise.id} exercise={exercise} completeExercise={completeExercise} />
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="page-section">
      <h1>퀘스트를 찾을 수 없습니다</h1>
      <Link to="/quests">퀘스트 맵으로 돌아가기</Link>
    </section>
  )
}

function AppRoutes() {
  const { progress, completeQuiz, completeExercise, openLesson, replaceProgress } = useProgress()

  return (
    <AppShell
      progress={{
        completedQuizCount: progress.completedQuizIds.length,
        completedExerciseCount: progress.completedExerciseIds.length,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/quests"
          element={
            <CourseMapPage
              completedQuizIds={progress.completedQuizIds}
              completedExerciseIds={progress.completedExerciseIds}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              completedQuizIds={progress.completedQuizIds}
              completedExerciseIds={progress.completedExerciseIds}
              lastOpenedLessonId={progress.lastOpenedLessonId}
              backupText={serializeProgressBackup(progress)}
              onImportProgress={(rawBackup) => {
                const nextProgress = parseProgressBackup(rawBackup)
                if (!nextProgress) return false
                replaceProgress(nextProgress)
                return true
              }}
              onResetProgress={() => replaceProgress(emptyProgress())}
            />
          }
        />
        <Route path="/quest/:slug" element={<LessonPage completeQuiz={completeQuiz} openLesson={openLesson} />} />
        <Route path="/quest/:slug/practice" element={<PracticePage completeExercise={completeExercise} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
