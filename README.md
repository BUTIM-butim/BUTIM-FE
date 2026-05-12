# BUTIM-FE

## 프로젝트 소개

버팀 프론트엔드 레포지토리입니다.

버팀은 산재 신청 승인까지의 예상 기간과 소득 공백 시점을 확인하고, 사용자 상황에 맞는 대응 전략을 추천하는 서비스입니다.

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- npm

## 실행 방법

프로젝트를 처음 실행하는 경우 아래 명령어로 의존성을 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npm run dev
```

개발 서버 실행 후 아래 주소에서 화면을 확인할 수 있습니다.

```txt
http://localhost:5173/
```

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 입력합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
```

환경변수 예시는 `.env.example` 파일을 참고합니다.

```env
VITE_API_BASE_URL=
```

> `.env` 파일은 GitHub에 올리지 않고, `.env.example` 파일만 GitHub에 올립니다.

## 현재 라우팅 경로

초기 세팅 단계에서는 메인 페이지 라우팅만 연결되어 있습니다.

```txt
/    MainPage
```

추후 기능 개발 단계에서 로그인, 회원가입, 예상 기간, 맞춤 전략 관련 라우팅을 추가할 예정입니다.

## 폴더 구조

```txt
src
├─ apis
├─ assets
│  ├─ images
│  └─ icons
├─ components
│  ├─ common
│  ├─ layout
│  ├─ auth
│  ├─ prediction
│  └─ strategy
├─ constants
├─ hooks
├─ mocks
├─ pages
├─ routes
├─ styles
├─ types
└─ utils
```

## 폴더 역할

```txt
apis       백엔드 API 요청 함수 관리
assets     이미지, 아이콘 파일 관리
components 공통 UI 및 기능별 컴포넌트 관리
constants  라우트 경로, 선택지, 고정 문구 관리
hooks      커스텀 훅 관리
mocks      백엔드 연결 전 임시 데이터 관리
pages      라우팅되는 페이지 컴포넌트 관리
routes     라우터 설정 관리
styles     전역 스타일 관리
types      TypeScript 타입 관리
utils      공통 유틸 함수 관리
```

## 브랜치 전략

- `main`: 최종 안정 버전
- `develop`: 개발 통합 브랜치
- `feature/*`: 기능 개발 브랜치
- `fix/*`: 오류 수정 브랜치
- `chore/*`: 설정 및 기타 작업 브랜치

## 브랜치 이름 예시

```txt
chore/init-setting
feature/auth-ui
feature/auth-api
feature/prediction-form
feature/strategy-result
fix/login-validation
```

## 커밋 컨벤션

```txt
feat: 새로운 기능 추가
fix: 버그 수정
improve: 기존 기능 개선
refactor: 코드 구조 개선
chore: 설정, 의존성, 빌드 등 기타 작업
docs: 문서 수정
style: 코드 포맷팅 수정
design: UI 디자인, CSS, 레이아웃 수정
remove: 파일 또는 코드 삭제
rename: 파일명, 폴더명, 변수명 변경
```

## Issue / PR 라벨 규칙

### 작업 유형 라벨

| 라벨 | 설명 |
| --- | --- |
| `FEAT` | 새로운 기능 추가 |
| `FIX` | 버그 및 오류 수정 |
| `IMPROVE` | 기존 기능 개선, 성능 개선, UX 개선 |
| `REFACTOR` | 기능 변화 없이 코드 구조 개선 |
| `CHORE` | 설정, 의존성, 빌드, gitignore 등 기타 작업 |
| `DOCS` | README, 템플릿 등 문서 수정 |
| `STYLE` | 코드 포맷팅, 들여쓰기 등 로직 변화 없는 수정 |
| `DESIGN` | UI 디자인, CSS, 레이아웃 수정 |
| `REMOVE` | 파일, 코드, 기능 삭제 |
| `RENAME` | 파일명, 폴더명, 변수명 등 이름 변경 |

### 프론트 도메인 라벨

| 라벨 | 설명 |
| --- | --- |
| `domain:auth` | 로그인/회원가입 관련 작업 |
| `domain:layout` | Navbar, Sidebar, Layout 관련 작업 |
| `domain:common` | 공통 컴포넌트 관련 작업 |
| `domain:prediction` | 예상 기간 입력/결과 관련 작업 |
| `domain:strategy` | 맞춤 전략/현금흐름 관련 작업 |
| `domain:user` | 마이페이지, 사용자 정보 관련 작업 |

### 공통 영역 라벨

| 라벨 | 설명 |
| --- | --- |
| `setting` | 프로젝트 초기 설정, 패키지, 환경변수 관련 작업 |
| `global` | 전역 구조, 라우팅, 공통 설정 관련 작업 |
| `api` | 백엔드 API 연동 관련 작업 |

### 라벨 사용 예시

| 작업 | 사용 라벨 |
| --- | --- |
| 프론트엔드 초기 프로젝트 세팅 | `CHORE`, `setting`, `global` |
| 로그인 페이지 UI 구현 | `FEAT`, `domain:auth`, `DESIGN` |
| 로그인 API 연동 | `FEAT`, `domain:auth`, `api` |
| 공통 Button 컴포넌트 구현 | `FEAT`, `domain:common`, `DESIGN` |
| 라우팅 구조 수정 | `CHORE`, `global` |

### 라벨 추가 규칙

기본적으로 위 라벨을 우선 사용합니다.
작업 내용에 맞는 라벨이 없는 경우에는 필요한 라벨을 추가할 수 있습니다.  
다만 새 라벨을 만들 때는 기존 라벨명과 중복되지 않도록 하고, 라벨 이름과 설명이 어떤 작업에 사용하는 것인지 명확하게 드러나도록 작성합니다.

## 작업 규칙

1. 작업 전 Issue를 먼저 생성합니다.
2. 작업 브랜치는 `develop`에서 생성합니다.
3. 작업 완료 후 `develop`으로 PR을 생성합니다.
4. PR에는 연결된 Issue 번호를 작성합니다.
5. PR merge 후 로컬 `develop` 브랜치를 최신화합니다.
