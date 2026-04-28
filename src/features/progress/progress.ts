export const STORAGE_KEY = 'typescript-quest-progress'

export type Progress = {
  completedQuizIds: string[]
  completedExerciseIds: string[]
  lastOpenedLessonId?: string
}

export function emptyProgress(): Progress {
  return {
    completedQuizIds: [],
    completedExerciseIds: [],
  }
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

export function readProgress(): Progress {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return emptyProgress()

  try {
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      completedQuizIds: stringArray(parsed.completedQuizIds),
      completedExerciseIds: stringArray(parsed.completedExerciseIds),
      lastOpenedLessonId:
        typeof parsed.lastOpenedLessonId === 'string' ? parsed.lastOpenedLessonId : undefined,
    }
  } catch {
    return emptyProgress()
  }
}

export function writeProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

export function markQuizComplete(progress: Progress, quizId: string): Progress {
  return {
    ...progress,
    completedQuizIds: unique([...progress.completedQuizIds, quizId]),
  }
}

export function markExerciseComplete(progress: Progress, exerciseId: string): Progress {
  return {
    ...progress,
    completedExerciseIds: unique([...progress.completedExerciseIds, exerciseId]),
  }
}

export function markLastOpenedLesson(progress: Progress, lessonId: string): Progress {
  return {
    ...progress,
    lastOpenedLessonId: lessonId,
  }
}

export function progressPercent(completed: number, total: number) {
  if (total <= 0) return 0
  return Math.round((completed / total) * 100)
}
