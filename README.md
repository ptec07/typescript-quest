# TypeScript Quest

TypeScript Quest는 TypeScript 공식 한국어 문서 흐름을 따라 학습하는 React + Vite + TypeScript 웹앱입니다. React Quest처럼 챕터별 퀘스트, 퀴즈, 실습, 진행률 대시보드를 제공합니다.

- 배포: https://typescript-quest.vercel.app
- 참고 문서: https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html
- 한국어 문서: https://typescript-kr.github.io/

## 주요 기능

- 한국어 TypeScript 학습 퀘스트 맵
- 기본 타입, 배열/튜플, any/unknown 챕터
- React + TypeScript 챕터
  - Props 타입
  - useState 타입
  - 이벤트 핸들러 타입
- 챕터별 체크포인트 퀴즈
- Sandpack 기반 실습 미리보기
- 정적 자동 채점, 힌트, 정답 보기, 초기화
- localStorage 기반 진행률 저장
- 진행률 대시보드와 이어하기 링크
- Vercel SPA 배포 설정

## 로컬 실행

```bash
npm install
npm run dev
```

기본 Vite 주소는 다음과 같습니다.

```text
http://localhost:5173
```

## 검증 명령

```bash
npm test -- --run
npm run build
npm run lint
```

현재 기준 검증 결과:

```text
Test Files  2 passed (2)
Tests       9 passed (9)
```

## 주요 경로

- `/` — 랜딩 페이지
- `/quests` — 퀘스트 맵
- `/dashboard` — 진행률 대시보드
- `/quest/:slug` — 레슨 페이지
- `/quest/:slug/practice` — 실습 페이지

## 프로젝트 구조

```text
src/
├── App.tsx
├── App.css
├── App.test.tsx
├── vercel-config.test.ts
├── content/
│   └── lessons.ts
├── features/
│   └── progress/
│       ├── progress.ts
│       └── useProgress.ts
└── test/
    └── setup.tsx
```

## 진행률 저장

브라우저 localStorage에 다음 키로 저장합니다.

```ts
typescript-quest-progress
```

## 배포

Vercel 배포용 `vercel.json`이 포함되어 있습니다. React Router deep link가 새로고침에서도 동작하도록 SPA rewrite가 설정되어 있습니다.

```bash
npm run build
npx vercel --prod
```
