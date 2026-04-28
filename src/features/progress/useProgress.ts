import { useCallback, useState } from 'react'
import {
  type Progress,
  markExerciseComplete,
  markLastOpenedLesson,
  markQuizComplete,
  readProgress,
  writeProgress,
} from './progress'

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => readProgress())

  const update = useCallback((updater: (current: Progress) => Progress) => {
    setProgress((current) => {
      const next = updater(current)
      writeProgress(next)
      return next
    })
  }, [])

  const completeQuiz = useCallback(
    (quizId: string) => update((current) => markQuizComplete(current, quizId)),
    [update],
  )
  const completeExercise = useCallback(
    (exerciseId: string) => update((current) => markExerciseComplete(current, exerciseId)),
    [update],
  )
  const openLesson = useCallback(
    (lessonId: string) => update((current) => markLastOpenedLesson(current, lessonId)),
    [update],
  )

  const replaceProgress = useCallback((next: Progress) => {
    writeProgress(next)
    setProgress(next)
  }, [])

  return {
    progress,
    completeQuiz,
    completeExercise,
    openLesson,
    replaceProgress,
  }
}
