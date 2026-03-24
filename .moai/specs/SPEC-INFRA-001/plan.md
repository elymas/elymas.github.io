---
id: SPEC-INFRA-001
type: plan
version: "1.0.0"
created: "2026-03-24"
updated: "2026-03-24"
author: limbowl
tags: [infra, hub, astro, github-pages]
---

# SPEC-INFRA-001 구현 계획: Astro 메인 허브 사이트 구축

## 1. 구현 전략 개요

### 1.1 접근 방식

점진적 구현(Incremental Implementation) 전략을 채택한다. 기반 인프라를 먼저 구축한 후, UI 컴포넌트를 추가하고, 마지막으로 배포 자동화와 품질 개선을 적용한다.

### 1.2 핵심 원칙

- **정적 사이트 우선**: 서버사이드 로직 없이 순수 SSG로 구축
- **최소 JavaScript**: Astro의 Zero-JS 기본값을 활용하여 테마 토글 등 필수 인터랙션만 클라이언트 사이드 처리
- **데이터 분리**: 프로젝트 메타데이터를 코드와 분리하여 레지스트리 파일로 관리
- **타입 안전성**: TypeScript 인터페이스를 통한 컴파일 시점 데이터 검증

---

## 2. 마일스톤별 구현 계획

### Phase 1: 프로젝트 기반 설정 (Primary Goal)

**목표**: Astro 프로젝트 초기화 및 개발 환경 구성

**작업 목록**:

- [ ] Astro 5.x 프로젝트 초기화 (`pnpm create astro@latest`)
- [ ] TypeScript 설정 (`tsconfig.json` strict 모드)
- [ ] Tailwind CSS 통합 (`@astrojs/tailwind` 설치 및 설정)
- [ ] `astro.config.mjs` 기본 설정 (`output: 'static'`, site URL)
- [ ] Prettier 및 `prettier-plugin-astro` 설정
- [ ] `.gitignore` 설정 (`node_modules/`, `dist/`, `.astro/`)
- [ ] 기본 `package.json` 스크립트 정의 (`dev`, `build`, `preview`)

**관련 요구사항**: REQ-SETUP-001 ~ REQ-SETUP-004

**산출물**:
- 정상적으로 `pnpm dev`로 실행 가능한 Astro 프로젝트
- TypeScript 타입 검사 통과
- Tailwind CSS 유틸리티 클래스 사용 가능

---

### Phase 2: 레이아웃 및 기본 구조 (Primary Goal)

**목표**: 공유 레이아웃 컴포넌트 및 기본 페이지 구조 구축

**작업 목록**:

- [ ] `src/layouts/BaseLayout.astro` 생성
  - HTML 기본 구조 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
  - SEO 메타 태그 슬롯 (`title`, `description`, Open Graph)
  - Header 영역 (사이트 로고/타이틀, 테마 토글 버튼 자리)
  - Footer 영역 (저작권, GitHub 링크)
  - Main content `<slot />` 영역
- [ ] `src/styles/global.css` 생성
  - Tailwind CSS 지시어 (`@tailwind base`, `components`, `utilities`)
  - CSS 커스텀 속성 (다크/라이트 테마 색상 변수)
  - 기본 타이포그래피 및 레이아웃 스타일
- [ ] 시맨틱 HTML 구조 적용 (`<header>`, `<main>`, `<footer>`, `<nav>`)
- [ ] 반응형 breakpoint 설정 (Mobile < 640px, Tablet 640-1024px, Desktop > 1024px)

**관련 요구사항**: REQ-LAYOUT-001 ~ REQ-LAYOUT-004, REQ-SEO-001, REQ-SEO-002, REQ-A11Y-001

**산출물**:
- Header, Main, Footer가 있는 기본 레이아웃
- 반응형 동작 확인 (3단계 뷰포트)

---

### Phase 3: 프로젝트 데이터 시스템 (Primary Goal)

**목표**: 서브 프로젝트 메타데이터 레지스트리 구축

**작업 목록**:

- [ ] `src/types/project.ts` 생성
  - `ProjectType` enum 정의 (`blog`, `docs`, `landing`, `app`, `tutorial`, `portfolio`)
  - `Project` 인터페이스 정의 (`name`, `description`, `url`, `type`, `techStack`, `thumbnail?`, `featured?`, `status?`)
- [ ] `src/data/projects.json` (또는 `projects.yaml`) 생성
  - 샘플 서브 프로젝트 데이터 입력 (최소 3개)
  - 스키마 준수 데이터 검증
- [ ] `src/utils/projects.ts` 헬퍼 함수 생성
  - 프로젝트 데이터 로드 함수
  - 타입별 필터링 함수
  - 정렬 함수 (featured 우선, 이름순)

**관련 요구사항**: REQ-DATA-001 ~ REQ-DATA-004

**산출물**:
- 타입 안전한 프로젝트 데이터 시스템
- 빌드 시점에 데이터 로드 및 검증 가능

---

### Phase 4: 허브 네비게이션 UI (Secondary Goal)

**목표**: 메인 허브 페이지 및 프로젝트 카드 컴포넌트 구현

**작업 목록**:

- [ ] `src/components/ProjectCard.astro` 생성
  - 프로젝트 썸네일 (없으면 기본 아이콘/색상)
  - 프로젝트명 (제목)
  - 설명 텍스트 (2-3줄 truncate)
  - 기술 스택 태그 (badge 형태)
  - 프로젝트 유형 라벨
  - 외부 링크 아이콘 및 hover 효과
- [ ] `src/components/ProjectGrid.astro` 생성
  - CSS Grid 기반 반응형 그리드 (1열/2열/3열)
  - 프로젝트 카드 정렬 및 레이아웃
- [ ] `src/components/Header.astro` 생성
  - 사이트 타이틀/로고
  - 테마 토글 버튼 위치
  - 반응형 네비게이션
- [ ] `src/components/Footer.astro` 생성
  - 저작권 정보
  - GitHub 프로필 링크
  - 연도 자동 계산
- [ ] `src/pages/index.astro` 구현
  - Hero 섹션 (소개 텍스트)
  - 프로젝트 갤러리 섹션
  - 프로젝트 필터 UI (선택적)

**관련 요구사항**: REQ-NAV-001 ~ REQ-NAV-004, REQ-LAYOUT-003 ~ REQ-LAYOUT-004

**산출물**:
- 완성된 허브 메인 페이지
- 반응형 프로젝트 카드 갤러리

---

### Phase 5: 다크/라이트 테마 (Secondary Goal)

**목표**: 테마 전환 기능 구현

**작업 목록**:

- [ ] CSS 커스텀 속성 기반 테마 변수 정의
  - 라이트 테마 색상 세트
  - 다크 테마 색상 세트
  - Tailwind CSS `darkMode: 'class'` 설정
- [ ] `src/components/ThemeToggle.astro` (또는 클라이언트 사이드 스크립트) 생성
  - 토글 버튼 UI (Sun/Moon 아이콘)
  - `localStorage` 기반 테마 저장/복원
  - `prefers-color-scheme` 미디어 쿼리 감지
- [ ] FOUC 방지 인라인 스크립트
  - `<head>` 내 인라인 `<script>`로 초기 테마 적용
  - `document.documentElement.classList.add('dark')` 패턴

**관련 요구사항**: REQ-THEME-001 ~ REQ-THEME-005

**산출물**:
- 깜빡임 없는 테마 전환 기능
- localStorage 기반 테마 설정 유지

---

### Phase 6: SEO 및 메타 데이터 (Secondary Goal)

**목표**: SEO 최적화 및 메타 데이터 완성

**작업 목록**:

- [ ] `@astrojs/sitemap` 통합 및 설정
- [ ] BaseLayout에 SEO 메타 태그 완성
  - `<title>` 동적 생성
  - `<meta name="description">` 설정
  - Open Graph 태그 (`og:title`, `og:description`, `og:image`, `og:url`)
  - Canonical URL 설정
  - Twitter Card 태그 (선택적)
- [ ] `public/favicon.svg` 생성
- [ ] `public/og-image.png` 생성 (Open Graph 기본 이미지)
- [ ] `robots.txt` 생성

**관련 요구사항**: REQ-SEO-001 ~ REQ-SEO-004

**산출물**:
- Lighthouse SEO 점수 90+ 달성
- sitemap.xml 자동 생성

---

### Phase 7: GitHub Actions CI/CD (Final Goal)

**목표**: 자동화된 빌드 및 배포 파이프라인 구축

**작업 목록**:

- [ ] `.github/workflows/deploy.yml` 생성
  - Trigger: `main` 브랜치 push
  - 권한: `contents: read`, `pages: write`, `id-token: write`
  - 환경: `github-pages`
  - Steps:
    1. `actions/checkout@v4`
    2. `actions/setup-node@v4` (Node.js 20)
    3. `pnpm/action-setup@v4`
    4. `pnpm install`
    5. `pnpm build`
    6. `actions/upload-pages-artifact@v3` (`path: dist/`)
    7. `actions/deploy-pages@v4`
- [ ] GitHub 저장소 Pages 설정 확인 (Source: GitHub Actions)
- [ ] 배포 테스트 실행 및 검증

**관련 요구사항**: REQ-CICD-001 ~ REQ-CICD-004

**산출물**:
- `main` push 시 자동 배포 동작
- `https://elymas.github.io` 접속 가능

---

### Phase 8: 접근성 및 품질 개선 (Optional Goal)

**목표**: 접근성 준수 및 전반적 품질 개선

**작업 목록**:

- [ ] 키보드 네비게이션 테스트 및 보완
- [ ] 포커스 인디케이터 스타일 개선
- [ ] alt 속성 검증
- [ ] ARIA 라벨 추가 (필요 시)
- [ ] Lighthouse 감사 실행 및 최적화
  - Performance: 90+ 목표
  - Accessibility: 90+ 목표
  - Best Practices: 90+ 목표
  - SEO: 90+ 목표

**관련 요구사항**: REQ-A11Y-001 ~ REQ-A11Y-003

**산출물**:
- Lighthouse 전 항목 90+ 달성
- 키보드 완전 네비게이션 가능

---

## 3. 기술 스택 상세

### 3.1 핵심 기술

| 기술 | 버전 | 역할 | 비고 |
|------|------|------|------|
| Astro | ^5.x | SSG 프레임워크 | `output: 'static'` |
| TypeScript | ^5.x | 타입 안전성 | strict 모드 |
| Tailwind CSS | ^3.x 또는 ^4.x | 유틸리티 CSS | Astro 통합 |
| pnpm | ^8.x+ | 패키지 매니저 | 디스크 효율 |

### 3.2 Astro 통합 (Integrations)

| 통합 | 역할 |
|------|------|
| `@astrojs/tailwind` | Tailwind CSS 빌드 통합 |
| `@astrojs/sitemap` | sitemap.xml 자동 생성 |

### 3.3 개발 도구

| 도구 | 역할 |
|------|------|
| `@astrojs/check` | Astro 파일 타입 검사 |
| `prettier` | 코드 포맷팅 |
| `prettier-plugin-astro` | `.astro` 파일 포맷팅 지원 |

---

## 4. 파일 구조 계획

```
github-pages/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # 기본 레이아웃 (head, header, footer)
│   ├── pages/
│   │   └── index.astro                # 메인 허브 홈페이지
│   ├── components/
│   │   ├── Header.astro               # 헤더 컴포넌트
│   │   ├── Footer.astro               # 푸터 컴포넌트
│   │   ├── ProjectCard.astro          # 프로젝트 카드 컴포넌트
│   │   ├── ProjectGrid.astro          # 프로젝트 그리드 레이아웃
│   │   └── ThemeToggle.astro          # 다크/라이트 테마 토글
│   ├── data/
│   │   └── projects.json              # 서브 프로젝트 레지스트리 데이터
│   ├── types/
│   │   └── project.ts                 # Project 타입 정의
│   ├── utils/
│   │   └── projects.ts                # 프로젝트 데이터 헬퍼 함수
│   └── styles/
│       └── global.css                 # Tailwind 지시어 및 전역 스타일
├── public/
│   ├── favicon.svg                    # 파비콘
│   └── og-image.png                   # Open Graph 기본 이미지
├── astro.config.mjs                   # Astro 설정
├── tailwind.config.mjs                # Tailwind CSS 설정
├── tsconfig.json                      # TypeScript 설정
├── package.json                       # 프로젝트 의존성
├── pnpm-lock.yaml                     # pnpm 잠금 파일
├── .prettierrc                        # Prettier 설정
├── .gitignore                         # Git 무시 파일
└── .github/
    └── workflows/
        └── deploy.yml                 # GitHub Actions 배포 워크플로우
```

---

## 5. 위험 분석 및 대응 전략

### 5.1 기술적 위험

| 위험 | 대응 전략 |
|------|-----------|
| Astro 5.x 호환성 | Astro 공식 문서 및 Context7 MCP를 통해 최신 API 검증 |
| Tailwind v3/v4 설정 차이 | Astro 공식 Tailwind 통합 가이드 우선 준수, v3 안정 버전 선호 |
| 테마 FOUC | `<head>` 인라인 스크립트로 `is:inline` 활용 |

### 5.2 프로세스 위험

| 위험 | 대응 전략 |
|------|-----------|
| GitHub Actions 워크플로우 실패 | 로컬에서 `pnpm build` 사전 검증 |
| 서브 프로젝트 URL 변경 | projects.json 중앙 관리로 일괄 수정 |

---

## 6. 참고 패턴

### 6.1 Astro SSG 패턴

- **파일 기반 라우팅**: `src/pages/` 디렉토리 구조가 URL 경로와 1:1 매핑
- **Zero-JS 기본값**: Astro 컴포넌트는 기본적으로 서버에서만 렌더링, 클라이언트 JS 미포함
- **Island Architecture**: 인터랙티브 요소(테마 토글)만 `client:load` 디렉티브로 클라이언트 사이드 하이드레이션

### 6.2 테마 전환 패턴

- **Class-based Dark Mode**: Tailwind `darkMode: 'class'` + `document.documentElement.classList.toggle('dark')`
- **Inline Script**: FOUC 방지를 위해 `<head>` 내 인라인 스크립트에서 테마 초기화
- **localStorage**: `theme` 키로 사용자 선호 저장/복원

### 6.3 GitHub Pages 배포 패턴

- **Actions Direct Deploy**: `actions/deploy-pages@v4`로 직접 배포 (gh-pages 브랜치 불필요)
- **Artifact Upload**: 빌드 결과물을 아티팩트로 업로드 후 배포

---

## 7. 전문가 상담 권장 사항

이 SPEC은 다음 도메인의 전문가 상담을 권장합니다:

### 7.1 Frontend 전문가 (expert-frontend)
- **상담 사유**: UI 컴포넌트 설계, Astro 5.x 패턴, Tailwind CSS 구성, 반응형 레이아웃 전략
- **상담 범위**: Phase 2 (레이아웃), Phase 4 (허브 UI), Phase 5 (테마)

### 7.2 DevOps 전문가 (expert-devops)
- **상담 사유**: GitHub Actions 워크플로우 최적화, 배포 파이프라인 설정
- **상담 범위**: Phase 7 (CI/CD)

---

## 8. 추적성 (Traceability)

| Phase | 관련 요구사항 | 우선순위 |
|-------|--------------|----------|
| Phase 1 | REQ-SETUP-001 ~ 004 | Primary |
| Phase 2 | REQ-LAYOUT-001 ~ 004, REQ-SEO-001 ~ 002, REQ-A11Y-001 | Primary |
| Phase 3 | REQ-DATA-001 ~ 004 | Primary |
| Phase 4 | REQ-NAV-001 ~ 004, REQ-LAYOUT-003 ~ 004 | Secondary |
| Phase 5 | REQ-THEME-001 ~ 005 | Secondary |
| Phase 6 | REQ-SEO-001 ~ 004 | Secondary |
| Phase 7 | REQ-CICD-001 ~ 004 | Final |
| Phase 8 | REQ-A11Y-001 ~ 003 | Optional |
