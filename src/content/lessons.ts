export type QuizOption = {
  label: string
  correct: boolean
  explanation: string
}

export type Quiz = {
  id: string
  question: string
  options: QuizOption[]
}

export type ExerciseCheck = {
  label: string
  includes: string[]
}

export type Exercise = {
  id: string
  lessonId: string
  title: string
  prompt: string
  hints: string[]
  checks: ExerciseCheck[]
  starterCode: string
  solutionCode: string
  explanation: string
}

export type Lesson = {
  id: string
  slug: string
  title: string
  subtitle: string
  summary: string
  objectives: string[]
  docAnchors: string[]
  quiz: Quiz
}

export const officialLinks = {
  basicTypes: 'https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html',
  koreanDocs: 'https://typescript-kr.github.io/',
  reactTypescript: 'https://react.dev/learn/typescript',
} as const

export const lessons: Lesson[] = [
  {
    id: 'primitive-types',
    slug: 'primitive-types',
    title: '원시 타입',
    subtitle: 'string, number, boolean으로 값의 의도를 명확히 표현하기',
    summary:
      'TypeScript의 기본 타입 안내를 바탕으로 문자열, 숫자, 불리언 타입 표기와 추론을 익히는 첫 번째 퀘스트입니다.',
    objectives: [
      'string, number, boolean 타입 어노테이션을 읽고 작성한다.',
      '타입 추론이 가능한 경우와 명시해야 하는 경우를 구분한다.',
      '잘못된 값 할당을 컴파일 단계에서 발견하는 감각을 만든다.',
    ],
    docAnchors: ['The primitives: string, number, and boolean', 'Type Annotations on Variables'],
    quiz: {
      id: 'primitive-types-basic',
      question: '점수를 숫자로 제한하는 타입 어노테이션은 무엇일까요?',
      options: [
        {
          label: 'const score: number = 100',
          correct: true,
          explanation: 'number는 정수와 실수를 모두 포함하는 JavaScript 숫자 값 타입입니다.',
        },
        {
          label: 'const score: string = 100',
          correct: false,
          explanation: 'string에는 숫자 값 100을 그대로 넣을 수 없습니다.',
        },
        {
          label: 'const score: boolean = 100',
          correct: false,
          explanation: 'boolean은 true 또는 false 값에 사용합니다.',
        },
      ],
    },
  },
  {
    id: 'arrays-tuples',
    slug: 'arrays-tuples',
    title: '배열과 튜플',
    subtitle: 'string[]와 [string, number]로 컬렉션의 모양 정하기',
    summary:
      'Basic Types와 한국어 핸드북의 배열/튜플 설명을 바탕으로 같은 타입의 목록과 고정 길이 쌍을 구분합니다.',
    objectives: [
      'Array<T>와 T[] 문법을 서로 바꿔 읽는다.',
      '튜플이 위치별 타입을 보장하는 이유를 설명한다.',
      'readonly 배열을 사용해 변경 불가능한 입력을 표현한다.',
    ],
    docAnchors: ['Arrays', 'Tuple Types', 'readonly'],
    quiz: {
      id: 'arrays-tuples-basic',
      question: '이름 목록을 변경하지 않는 함수 매개변수로 가장 적절한 타입은?',
      options: [
        {
          label: 'names: readonly string[]',
          correct: true,
          explanation: 'readonly string[]는 문자열 배열을 받되 함수 안에서 push 같은 변경을 막습니다.',
        },
        {
          label: 'names: [string, number]',
          correct: false,
          explanation: '튜플은 위치와 길이가 정해진 데이터에 적합합니다.',
        },
        {
          label: 'names: boolean[]',
          correct: false,
          explanation: 'boolean[]는 true/false 목록이므로 이름 목록과 맞지 않습니다.',
        },
      ],
    },
  },
  {
    id: 'any-unknown',
    slug: 'any-unknown',
    title: 'any와 unknown',
    subtitle: '안전하지 않은 탈출구와 안전한 좁히기 구분하기',
    summary:
      'any는 타입 검사를 끄는 강력한 탈출구이고 unknown은 확인 전 사용을 막는 안전한 경계 타입입니다.',
    objectives: [
      'any가 타입 안정성을 약화시키는 상황을 설명한다.',
      'unknown 값을 사용하기 전에 typeof로 좁힌다.',
      '외부 입력에는 any보다 unknown을 우선 고려한다.',
    ],
    docAnchors: ['any', 'unknown', 'noImplicitAny'],
    quiz: {
      id: 'any-unknown-basic',
      question: 'API 응답처럼 아직 모양을 모르는 값을 안전하게 받는 타입은?',
      options: [
        {
          label: 'unknown',
          correct: true,
          explanation: 'unknown은 사용 전에 타입을 확인하도록 강제해 any보다 안전합니다.',
        },
        {
          label: 'any',
          correct: false,
          explanation: 'any는 타입 검사를 우회하므로 학습 단계에서는 최소화하는 편이 좋습니다.',
        },
        {
          label: 'never',
          correct: false,
          explanation: 'never는 정상적으로 값이 생기지 않는 경우를 표현합니다.',
        },
      ],
    },
  },
  {
    id: 'react-props',
    slug: 'react-props',
    title: 'Props 타입',
    subtitle: '컴포넌트 props를 type으로 정의하고 안전하게 전달하기',
    summary:
      'React 컴포넌트 props에 TypeScript 타입을 붙여 부모-자식 컴포넌트 경계를 명확히 만드는 퀘스트입니다.',
    objectives: [
      '컴포넌트 props 타입을 type 또는 interface로 선언한다.',
      '구조 분해한 props에도 타입이 유지되는 흐름을 이해한다.',
      '필수 props와 선택 props를 구분한다.',
    ],
    docAnchors: ['React TypeScript', 'Typing Component Props', 'Optional Properties'],
    quiz: {
      id: 'react-props-basic',
      question: 'ProfileCard 컴포넌트 props 타입으로 가장 적절한 선언은?',
      options: [
        {
          label: 'type ProfileCardProps = { name: string; level: number }',
          correct: true,
          explanation: '컴포넌트가 받는 문자열 이름과 숫자 레벨을 props 타입으로 명확히 표현합니다.',
        },
        {
          label: 'type ProfileCardProps = string',
          correct: false,
          explanation: 'props는 보통 여러 필드를 담은 객체이므로 단일 string으로는 부족합니다.',
        },
        {
          label: 'type ProfileCardProps = any',
          correct: false,
          explanation: 'any는 props 경계에서 타입 검사를 약화시킵니다.',
        },
      ],
    },
  },
  {
    id: 'react-usestate',
    slug: 'react-usestate',
    title: 'useState 타입',
    subtitle: '상태 초깃값과 제네릭으로 React state 타입 잡기',
    summary:
      'useState의 타입 추론과 명시적 제네릭을 익혀 문자열/숫자/객체 상태를 안전하게 업데이트합니다.',
    objectives: [
      '초깃값으로 추론되는 state 타입을 읽는다.',
      '빈 배열이나 nullable 상태에는 useState<T>를 명시한다.',
      '상태 업데이트 함수가 이전 상태 타입을 보존하는 방식을 이해한다.',
    ],
    docAnchors: ['useState', 'TypeScript Generics', 'Typing React state'],
    quiz: {
      id: 'react-usestate-basic',
      question: '초깃값이 빈 배열인 할 일 목록 state에 타입을 주는 방법은?',
      options: [
        {
          label: "const [todos, setTodos] = useState<string[]>([])",
          correct: true,
          explanation: '빈 배열은 원소 타입을 추론하기 어려우므로 string[] 제네릭을 명시합니다.',
        },
        {
          label: 'const [todos, setTodos] = useState([] as any[])',
          correct: false,
          explanation: 'any[]는 이후 원소 타입 검사를 약화시킵니다.',
        },
        {
          label: "const [todos, setTodos] = useState('')",
          correct: false,
          explanation: '문자열 상태가 되어 배열 메서드 사용과 맞지 않습니다.',
        },
      ],
    },
  },
  {
    id: 'react-events',
    slug: 'react-events',
    title: '이벤트 핸들러 타입',
    subtitle: '클릭/입력 이벤트를 React 타입으로 안전하게 처리하기',
    summary:
      'React.MouseEvent와 ChangeEvent를 사용해 이벤트 객체의 target/currentTarget 타입을 안전하게 다룹니다.',
    objectives: [
      '버튼 클릭 핸들러에 React.MouseEvent<HTMLButtonElement>를 붙인다.',
      '이벤트 핸들러를 호출 결과가 아니라 함수 참조로 전달한다.',
      'currentTarget을 통해 요소별 타입 정보를 활용한다.',
    ],
    docAnchors: ['React events', 'MouseEvent', 'Event handler props'],
    quiz: {
      id: 'react-events-basic',
      question: '버튼 onClick 핸들러 매개변수 타입으로 적절한 것은?',
      options: [
        {
          label: 'React.MouseEvent<HTMLButtonElement>',
          correct: true,
          explanation: '버튼 클릭 이벤트에서 currentTarget을 버튼으로 좁혀 사용할 수 있습니다.',
        },
        {
          label: 'string',
          correct: false,
          explanation: '이벤트 객체는 문자열이 아닙니다.',
        },
        {
          label: 'number',
          correct: false,
          explanation: '클릭 횟수 같은 값과 이벤트 객체 타입은 다릅니다.',
        },
      ],
    },
  },

  {
    id: 'literal-unions',
    slug: 'literal-unions',
    title: '리터럴 유니언 타입',
    subtitle: '정해진 문자열 값만 허용해 상태와 옵션을 안전하게 제한하기',
    summary: '문자열 리터럴과 유니언 타입으로 화면 상태, 크기, 모드처럼 허용 가능한 값의 집합을 명확히 표현합니다.',
    objectives: [
      '문자열 리터럴 타입과 유니언 타입을 조합한다.',
      '임의 string보다 좁은 상태 타입을 설계한다.',
      '허용되지 않는 값이 컴파일 단계에서 막히는 이유를 설명한다.',
    ],
    docAnchors: ['Union Types', 'Literal Types', 'Combining Unions with Literal Types'],
    quiz: {
      id: 'literal-unions-basic',
      question: '버튼 크기를 small 또는 large로만 제한하는 타입은?',
      options: [
        {
          label: "type ButtonSize = 'small' | 'large'",
          correct: true,
          explanation: '문자열 리터럴 유니언은 허용 가능한 문자열 값의 집합을 직접 표현합니다.',
        },
        {
          label: 'type ButtonSize = string',
          correct: false,
          explanation: 'string은 모든 문자열을 허용하므로 small/large 제한이 사라집니다.',
        },
        {
          label: 'type ButtonSize = boolean',
          correct: false,
          explanation: 'boolean은 true/false만 표현하며 크기 이름에는 맞지 않습니다.',
        },
      ],
    },
  },
  {
    id: 'function-types',
    slug: 'function-types',
    title: '함수 타입',
    subtitle: '매개변수와 반환값 타입으로 함수 계약 만들기',
    summary: '함수 매개변수와 반환값에 타입을 붙여 호출자가 기대할 수 있는 입력과 출력을 명확히 합니다.',
    objectives: [
      '함수 매개변수 타입과 반환 타입을 작성한다.',
      '함수 타입 별칭으로 콜백의 계약을 표현한다.',
      'React 코드에서도 작은 포매터 함수를 타입 안전하게 재사용한다.',
    ],
    docAnchors: ['Functions', 'Parameter Type Annotations', 'Return Type Annotations'],
    quiz: {
      id: 'function-types-basic',
      question: '점수를 받아 문자열 라벨을 반환하는 함수 타입으로 알맞은 것은?',
      options: [
        {
          label: 'type ScoreFormatter = (score: number) => string',
          correct: true,
          explanation: 'number 매개변수를 받아 string을 반환하는 콜백 계약입니다.',
        },
        {
          label: 'type ScoreFormatter = string',
          correct: false,
          explanation: '함수 타입은 호출 시그니처를 표현해야 합니다.',
        },
        {
          label: 'type ScoreFormatter = (score: string) => number',
          correct: false,
          explanation: '문제의 입력/출력 방향과 반대입니다.',
        },
      ],
    },
  },

  {
    id: 'object-types',
    slug: 'object-types',
    title: '객체 타입',
    subtitle: '여러 필드를 가진 값을 구조적으로 설명하기',
    summary: '객체 타입으로 프로필, 설정, API 응답처럼 여러 속성을 가진 값을 안전하게 다루는 방법을 익힙니다.',
    objectives: [
      '객체 속성별 타입을 작성한다.',
      '선택적 속성 ? 표기를 읽고 사용한다.',
      '컴포넌트 props와 일반 객체 데이터에 같은 구조 타입을 적용한다.',
    ],
    docAnchors: ['Object Types', 'Optional Properties', 'Property Modifiers'],
    quiz: {
      id: 'object-types-basic',
      question: 'name은 string, level은 number인 플레이어 객체 타입으로 알맞은 것은?',
      options: [
        {
          label: 'type Player = { name: string; level: number }',
          correct: true,
          explanation: '객체 타입은 속성 이름과 각 속성의 타입을 함께 선언합니다.',
        },
        {
          label: 'type Player = string | number',
          correct: false,
          explanation: '유니언은 값의 후보 타입을 표현하지만 객체 속성 구조를 설명하지 않습니다.',
        },
        {
          label: 'type Player = [string, number]',
          correct: false,
          explanation: '튜플은 위치 기반 구조이며 name/level 같은 속성 이름을 갖는 객체 타입과 다릅니다.',
        },
      ],
    },
  },
  {
    id: 'interfaces-type-aliases',
    slug: 'interfaces-type-aliases',
    title: '인터페이스와 타입 별칭',
    subtitle: 'interface와 type으로 재사용 가능한 구조 이름 붙이기',
    summary: 'interface와 type alias의 공통점과 차이를 이해하고 컴포넌트 props 구조에 이름을 붙입니다.',
    objectives: [
      'interface로 객체 구조를 선언한다.',
      'type alias와 interface가 객체 타입에 모두 쓰일 수 있음을 이해한다.',
      '확장 가능한 props 구조를 설계한다.',
    ],
    docAnchors: ['Interfaces', 'Type Aliases', 'Extending Types'],
    quiz: {
      id: 'interfaces-type-aliases-basic',
      question: 'CardProps 객체 구조를 interface로 선언하는 예는?',
      options: [
        {
          label: 'interface CardProps { title: string; description: string }',
          correct: true,
          explanation: 'interface는 객체 구조에 이름을 붙이는 대표적인 방법입니다.',
        },
        {
          label: 'interface CardProps = string',
          correct: false,
          explanation: 'interface는 등호가 아니라 중괄호 본문으로 객체 구조를 선언합니다.',
        },
        {
          label: 'const CardProps = { title: string }',
          correct: false,
          explanation: 'const는 런타임 값 선언이며 타입 선언 문법이 아닙니다.',
        },
      ],
    },
  },
  {
    id: 'generics-basics',
    slug: 'generics-basics',
    title: '제네릭 기초',
    subtitle: '입력 타입을 보존하는 재사용 함수 만들기',
    summary: '제네릭 타입 매개변수로 배열, API 응답, 헬퍼 함수가 입력 타입 정보를 잃지 않도록 설계합니다.',
    objectives: [
      '<T> 타입 매개변수의 역할을 설명한다.',
      '입력과 출력의 타입 관계를 제네릭으로 보존한다.',
      'React 코드 안에서 작은 제네릭 헬퍼를 안전하게 사용한다.',
    ],
    docAnchors: ['Generics', 'Generic Functions', 'Working with Generic Type Variables'],
    quiz: {
      id: 'generics-basics-basic',
      question: '입력값의 타입을 그대로 반환 타입에 연결하는 함수 선언은?',
      options: [
        {
          label: 'function identity<T>(value: T): T',
          correct: true,
          explanation: 'T가 입력과 출력에 모두 쓰여 타입 관계가 유지됩니다.',
        },
        {
          label: 'function identity(value: any): any',
          correct: false,
          explanation: 'any는 타입 정보를 잃어버리므로 제네릭의 장점이 사라집니다.',
        },
        {
          label: 'function identity(value: string): number',
          correct: false,
          explanation: '입력 타입과 출력 타입을 보존하지 않습니다.',
        },
      ],
    },
  },
  {
    id: 'type-narrowing',
    slug: 'type-narrowing',
    title: '타입 좁히기',
    subtitle: 'typeof와 조건문으로 유니언 값을 안전하게 다루기',
    summary: '유니언 타입 값을 사용하기 전에 typeof, 조건문, early return으로 가능한 타입을 좁히는 방법을 익힙니다.',
    objectives: [
      'typeof 검사로 string과 number를 구분한다.',
      '좁혀진 블록 안에서 타입별 메서드를 안전하게 호출한다.',
      'unknown과 union 값 처리 흐름을 React UI에 연결한다.',
    ],
    docAnchors: ['Narrowing', 'typeof type guards', 'Control flow analysis'],
    quiz: {
      id: 'type-narrowing-basic',
      question: 'string | number 값을 문자열로 포맷하기 전에 필요한 것은?',
      options: [
        {
          label: 'typeof value === "string" 같은 타입 가드',
          correct: true,
          explanation: '타입 가드는 분기 안에서 value를 더 구체적인 타입으로 좁힙니다.',
        },
        {
          label: '무조건 value.toUpperCase() 호출',
          correct: false,
          explanation: 'number일 수 있으므로 문자열 메서드를 바로 호출하면 안전하지 않습니다.',
        },
        {
          label: 'as any로 바꾸기',
          correct: false,
          explanation: 'any 캐스팅은 타입 검사를 우회해 학습 목표와 반대입니다.',
        },
      ],
    },
  },
]

export const exercises: Exercise[] = [
  {
    id: 'primitive-types-practice',
    lessonId: 'primitive-types',
    title: '프로필 값에 원시 타입 붙이기',
    prompt: '이름, 레벨, 활성 여부 변수에 string, number, boolean 타입을 명시하세요.',
    hints: ['문자열은 string입니다.', 'JavaScript의 모든 숫자는 TypeScript에서 number로 표현합니다.'],
    checks: [
      { label: 'name 변수에 string 타입을 명시', includes: ['name: string'] },
      { label: 'level 변수에 number 타입을 명시', includes: ['level: number'] },
    ],
    starterCode: `const name = 'Mingyu'
const level = 3
const active = true

export default function App() {
  return <h1>{name} · Lv.{level} · {active ? '진행 중' : '휴식'}</h1>
}`,
    solutionCode: `const name: string = 'Mingyu'
const level: number = 3
const active: boolean = true

export default function App() {
  return <h1>{name} · Lv.{level} · {active ? '진행 중' : '휴식'}</h1>
}`,
    explanation: '원시 타입 어노테이션은 변수의 의도를 문서화하고 잘못된 값 할당을 빠르게 잡아줍니다.',
  },
  {
    id: 'arrays-tuples-practice',
    lessonId: 'arrays-tuples',
    title: 'readonly string[]와 튜플로 퀘스트 로그 만들기',
    prompt: '변경하지 않을 태그 목록은 readonly string[]로, 고정된 결과 쌍은 튜플로 표현하세요.',
    hints: ['읽기 전용 배열은 readonly string[]처럼 씁니다.', '튜플은 [string, number]처럼 위치별 타입을 정합니다.'],
    checks: [
      { label: 'readonly string[] 배열 사용', includes: ['readonly string[]'] },
      { label: '[string, number] 튜플 사용', includes: ['[string, number]'] },
    ],
    starterCode: `const tags = ['basic-types', 'array', 'tuple']
const result = ['배열과 튜플', tags.length]

export default function App() {
  return <h1>{result[0]} · 태그 {result[1]}개 · {tags.join(', ')}</h1>
}`,
    solutionCode: `function summarize(tags: readonly string[]): [string, number] {
  return ['배열과 튜플', tags.length]
}

const tags: readonly string[] = ['basic-types', 'array', 'tuple']
const result = summarize(tags)

export default function App() {
  return <h1>{result[0]} · 태그 {result[1]}개 · {tags.join(', ')}</h1>
}`,
    explanation: '배열은 같은 타입의 목록, 튜플은 길이와 위치별 타입이 중요한 값을 표현할 때 적합합니다.',
  },
  {
    id: 'any-unknown-practice',
    lessonId: 'any-unknown',
    title: 'unknown을 typeof로 좁히기',
    prompt: '외부 입력을 unknown으로 받고 typeof 검사 후에만 문자열 메서드를 사용하세요.',
    hints: ['unknown 값에는 바로 .toUpperCase()를 호출할 수 없습니다.', 'typeof value === "string" 조건 안에서 문자열로 좁혀집니다.'],
    checks: [
      { label: '매개변수를 unknown으로 받기', includes: ['value: unknown'] },
      { label: 'typeof로 string 좁히기', includes: ["typeof value === 'string'"] },
    ],
    starterCode: `function formatInput(value: any) {
  return value.toUpperCase()
}

export default function App() {
  return <h1>{formatInput('unknown quest')}</h1>
}`,
    solutionCode: `function formatInput(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  if (typeof value === 'number') {
    return value.toFixed(1)
  }
  return '지원하지 않는 입력'
}

export default function App() {
  return <h1>{formatInput('unknown quest')}</h1>
}`,
    explanation: 'unknown은 값을 쓰기 전에 타입을 좁히게 만들어 외부 입력 경계에서 안전합니다.',
  },
  {
    id: 'react-props-practice',
    lessonId: 'react-props',
    title: 'ProfileCard props 타입 정의하기',
    prompt: '컴포넌트 props에 name과 level 타입을 붙여 ProfileCard를 안전하게 렌더링하세요.',
    hints: ['type ProfileCardProps = { name: string; level: number } 형태를 떠올려 보세요.', '컴포넌트 매개변수에 ProfileCardProps를 붙이세요.'],
    checks: [
      { label: 'ProfileCardProps 타입 선언', includes: ['type ProfileCardProps'] },
      { label: 'name과 level 타입 포함', includes: ['name: string', 'level: number'] },
    ],
    starterCode: `function ProfileCard({ name, level }) {
  return <article><h1>{name}</h1><p>Lv.{level}</p></article>
}

export default function App() {
  return <ProfileCard name="Mingyu" level={7} />
}`,
    solutionCode: `type ProfileCardProps = {
  name: string
  level: number
}

function ProfileCard({ name, level }: ProfileCardProps) {
  return <article><h1>{name}</h1><p>Lv.{level}</p></article>
}

export default function App() {
  return <ProfileCard name="Mingyu" level={7} />
}`,
    explanation: '컴포넌트 props 타입을 별도 이름으로 선언하면 재사용성과 오류 메시지 가독성이 좋아집니다.',
  },
  {
    id: 'react-usestate-practice',
    lessonId: 'react-usestate',
    title: 'useState<string[]>로 태그 상태 만들기',
    prompt: '빈 배열 state에 string[] 제네릭을 명시하고 새 태그를 불변 업데이트로 추가하세요.',
    hints: ['빈 배열은 원소 타입을 알기 어렵습니다.', 'setTags((current) => [...current, "..."]) 형태를 사용하세요.'],
    checks: [
      { label: 'useState<string[]> 제네릭 사용', includes: ['useState<string[]>'] },
      { label: '불변 배열 업데이트 사용', includes: ['...current'] },
    ],
    starterCode: `import { useState } from 'react'

export default function App() {
  const [tags, setTags] = useState([])
  return <button onClick={() => setTags(['typed'])}>태그 {tags.length}개</button>
}`,
    solutionCode: `import { useState } from 'react'

export default function App() {
  const [tags, setTags] = useState<string[]>([])
  return (
    <button onClick={() => setTags((current) => [...current, 'typed'])}>
      태그 {tags.length}개
    </button>
  )
}`,
    explanation: '초깃값만으로 타입을 알 수 없는 state에는 useState<T> 제네릭을 명시하면 안전합니다.',
  },
  {
    id: 'react-events-practice',
    lessonId: 'react-events',
    title: '버튼 클릭 이벤트 타입 붙이기',
    prompt: 'onClick 핸들러 매개변수에 React.MouseEvent<HTMLButtonElement>를 붙이고 currentTarget을 사용하세요.',
    hints: ['React.MouseEvent<HTMLButtonElement>를 핸들러 매개변수에 붙입니다.', 'handler()가 아니라 onClick={handleClick}처럼 함수 참조를 넘깁니다.'],
    checks: [
      { label: 'React.MouseEvent<HTMLButtonElement> 사용', includes: ['React.MouseEvent<HTMLButtonElement>'] },
      { label: 'currentTarget 사용', includes: ['currentTarget'] },
    ],
    starterCode: `import React from 'react'

export default function App() {
  function handleClick(event) {
    event.target.disabled = true
  }

  return <button onClick={handleClick}>완료 처리</button>
}`,
    solutionCode: `import React from 'react'

export default function App() {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.disabled = true
  }

  return <button onClick={handleClick}>완료 처리</button>
}`,
    explanation: 'React 이벤트 타입을 붙이면 currentTarget의 요소 타입을 안전하게 사용할 수 있습니다.',
  },

  {
    id: 'literal-unions-practice',
    lessonId: 'literal-unions',
    title: '버튼 variant를 리터럴 유니언으로 제한하기',
    prompt: 'ButtonVariant 타입을 primary 또는 secondary로 제한하고 props에 적용하세요.',
    hints: ["'primary' | 'secondary' 형태의 문자열 리터럴 유니언을 사용하세요.", 'props 타입의 variant 필드에 ButtonVariant를 연결하세요.'],
    checks: [
      { label: 'ButtonVariant 리터럴 유니언 선언', includes: ['type ButtonVariant', "'primary' | 'secondary'"] },
      { label: 'variant props에 ButtonVariant 적용', includes: ['variant: ButtonVariant'] },
    ],
    starterCode: `type ButtonProps = {
  variant: string
  label: string
}

function QuestButton({ variant, label }: ButtonProps) {
  return <button className={variant}>{label}</button>
}

export default function App() {
  return <QuestButton variant="primary" label="시작" />
}`,
    solutionCode: `type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  variant: ButtonVariant
  label: string
}

function QuestButton({ variant, label }: ButtonProps) {
  return <button className={variant}>{label}</button>
}

export default function App() {
  return <QuestButton variant="primary" label="시작" />
}`,
    explanation: '리터럴 유니언을 사용하면 컴포넌트 API가 허용하는 문자열 옵션을 코드로 문서화할 수 있습니다.',
  },
  {
    id: 'function-types-practice',
    lessonId: 'function-types',
    title: '점수 포매터 함수 타입 만들기',
    prompt: 'ScoreFormatter 함수 타입을 만들고 score: number를 받아 string을 반환하게 하세요.',
    hints: ['함수 타입 별칭은 (score: number) => string 형태입니다.', 'formatScore 함수에 ScoreFormatter 타입을 붙이세요.'],
    checks: [
      { label: 'ScoreFormatter 함수 타입 선언', includes: ['type ScoreFormatter', '(score: number) => string'] },
      { label: 'formatScore에 ScoreFormatter 적용', includes: ['formatScore: ScoreFormatter'] },
    ],
    starterCode: `const formatScore = (score) => String(score) + '점'

export default function App() {
  return <h1>{formatScore(95)}</h1>
}`,
    solutionCode: `type ScoreFormatter = (score: number) => string

const formatScore: ScoreFormatter = (score) => String(score) + '점'

export default function App() {
  return <h1>{formatScore(95)}</h1>
}`,
    explanation: '함수 타입 별칭을 사용하면 여러 곳에서 같은 콜백 계약을 재사용할 수 있습니다.',
  },

  {
    id: 'object-types-practice',
    lessonId: 'object-types',
    title: 'Player 객체 타입 만들기',
    prompt: 'Player 타입을 선언하고 name, level, premium 속성을 안전하게 표현하세요.',
    hints: ['type Player = { ... } 형태로 객체 구조에 이름을 붙입니다.', '선택 속성이 필요하면 premium?: boolean처럼 ?를 사용하세요.'],
    checks: [
      { label: 'Player 객체 타입 선언', includes: ['type Player', 'name: string', 'level: number'] },
      { label: '선택적 premium 속성 사용', includes: ['premium?: boolean'] },
    ],
    starterCode: `const player = {
  name: 'Mingyu',
  level: 12,
}

export default function App() {
  return <h1>{player.name} · Lv.{player.level}</h1>
}`,
    solutionCode: `type Player = {
  name: string
  level: number
  premium?: boolean
}

const player: Player = {
  name: 'Mingyu',
  level: 12,
}

export default function App() {
  return <h1>{player.name} · Lv.{player.level}</h1>
}`,
    explanation: '객체 타입은 여러 속성의 이름과 타입을 함께 문서화하며 선택 속성은 ?로 표시합니다.',
  },
  {
    id: 'interfaces-type-aliases-practice',
    lessonId: 'interfaces-type-aliases',
    title: 'QuestCardProps interface 선언하기',
    prompt: 'QuestCardProps interface를 만들고 컴포넌트 props 타입으로 적용하세요.',
    hints: ['interface QuestCardProps { title: string; completed: boolean }처럼 선언하세요.', '컴포넌트 매개변수 구조분해 뒤에 : QuestCardProps를 붙이세요.'],
    checks: [
      { label: 'QuestCardProps interface 선언', includes: ['interface QuestCardProps', 'title: string', 'completed: boolean'] },
      { label: '컴포넌트 props에 interface 적용', includes: [': QuestCardProps'] },
    ],
    starterCode: `function QuestCard({ title, completed }) {
  return <article><h1>{title}</h1><p>{completed ? '완료' : '진행 중'}</p></article>
}

export default function App() {
  return <QuestCard title="객체 타입" completed={false} />
}`,
    solutionCode: `interface QuestCardProps {
  title: string
  completed: boolean
}

function QuestCard({ title, completed }: QuestCardProps) {
  return <article><h1>{title}</h1><p>{completed ? '완료' : '진행 중'}</p></article>
}

export default function App() {
  return <QuestCard title="객체 타입" completed={false} />
}`,
    explanation: 'interface는 객체 형태의 props 계약에 이름을 붙이고 컴포넌트 경계를 명확하게 만듭니다.',
  },
  {
    id: 'generics-basics-practice',
    lessonId: 'generics-basics',
    title: 'first<T> 제네릭 함수 만들기',
    prompt: '배열의 첫 원소를 반환하는 first 함수를 제네릭으로 바꿔 원소 타입을 보존하세요.',
    hints: ['function first<T>(items: T[]): T 형태를 사용합니다.', 'string[]을 넣으면 반환값도 string으로 추론되어야 합니다.'],
    checks: [
      { label: 'first<T> 제네릭 함수 선언', includes: ['function first<T>', 'items: T[]'] },
      { label: '반환 타입에 T 사용', includes: ['): T'] },
    ],
    starterCode: `function first(items) {
  return items[0]
}

const firstQuest = first(['객체 타입', '제네릭'])

export default function App() {
  return <h1>{firstQuest}</h1>
}`,
    solutionCode: `function first<T>(items: T[]): T {
  return items[0]
}

const firstQuest = first(['객체 타입', '제네릭'])

export default function App() {
  return <h1>{firstQuest}</h1>
}`,
    explanation: '제네릭 함수는 입력 배열의 원소 타입 T를 반환 타입에도 연결해 타입 정보를 보존합니다.',
  },
  {
    id: 'type-narrowing-practice',
    lessonId: 'type-narrowing',
    title: 'string | number 값을 타입별로 포맷하기',
    prompt: 'value가 string이면 대문자로, number이면 고정 소수점 문자열로 포맷하세요.',
    hints: ['typeof value === "string" 조건을 먼저 사용하세요.', 'number 분기에서는 value.toFixed(1)을 사용할 수 있습니다.'],
    checks: [
      { label: 'string | number 유니언 매개변수 사용', includes: ['value: string | number'] },
      { label: 'typeof로 string 좁히기', includes: ["typeof value === 'string'"] },
      { label: 'number 분기에서 toFixed 사용', includes: ['toFixed(1)'] },
    ],
    starterCode: `function formatValue(value) {
  return value.toUpperCase()
}

export default function App() {
  return <h1>{formatValue('quest')}</h1>
}`,
    solutionCode: `function formatValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(1)
}

export default function App() {
  return <h1>{formatValue('quest')}</h1>
}`,
    explanation: '타입 가드는 분기 안에서 유니언 값을 더 구체적인 타입으로 좁혀 안전한 메서드 호출을 가능하게 합니다.',
  },
]

export function getLessonBySlug(slug: string | undefined) {
  return lessons.find((lesson) => lesson.slug === slug)
}

export function getLessonById(id: string | undefined) {
  return lessons.find((lesson) => lesson.id === id)
}

export function getExerciseForLesson(lessonId: string) {
  return exercises.find((exercise) => exercise.lessonId === lessonId)
}

function sourceTextWithoutComments(code: string) {
  let result = ''
  let index = 0
  let quote: 'single' | 'double' | 'template' | null = null

  while (index < code.length) {
    const current = code[index]
    const next = code[index + 1]

    if (quote) {
      result += current
      if (current === '\\') {
        result += next ?? ''
        index += 2
        continue
      }
      if (
        (quote === 'single' && current === "'") ||
        (quote === 'double' && current === '"') ||
        (quote === 'template' && current === '`')
      ) {
        quote = null
      }
      index += 1
      continue
    }

    if (current === "'") quote = 'single'
    if (current === '"') quote = 'double'
    if (current === '`') quote = 'template'

    if (current === '/' && next === '/') {
      while (index < code.length && code[index] !== '\n') index += 1
      result += '\n'
      index += 1
      continue
    }

    if (current === '/' && next === '*') {
      index += 2
      while (index < code.length && !(code[index] === '*' && code[index + 1] === '/')) {
        result += code[index] === '\n' ? '\n' : ' '
        index += 1
      }
      index += 2
      continue
    }

    result += current
    index += 1
  }

  return result
}

export function gradeExercise(exercise: Exercise, code: string) {
  const checkableSource = sourceTextWithoutComments(code)

  return exercise.checks.map((check) => ({
    ...check,
    passed: check.includes.every((needle) => checkableSource.includes(needle)),
  }))
}
