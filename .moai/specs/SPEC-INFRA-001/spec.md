---
id: SPEC-INFRA-001
version: "1.1.0"
status: implemented
created: "2026-03-24"
updated: "2026-03-24"
author: limbowl
priority: P1
issue_number: 0
tags: [infra, hub, astro, github-pages]
lifecycle: spec-anchored
---

# SPEC-INFRA-001: Astro 메인 허브 사이트 구축

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2026-03-24 | limbowl | 초기 SPEC 작성 |
| 1.1.0 | 2026-03-24 | limbowl | 구현 완료, 실제 버전 반영 (Astro 6, Tailwind 4, TS 6) |

---

## 1. 개요 (Overview)

### 1.1 목적

GitHub Pages Hosting Hub의 메인 허브 사이트(`elymas.github.io`)를 Astro SSG 프레임워크로 구축한다. 이 허브 사이트는 모든 서브 프로젝트 웹사이트를 연결하는 중앙 게이트웨이/포털 역할을 수행한다.

### 1.2 배경

- 다중 저장소 정적 사이트 허브 아키텍처의 진입점(Entry Point)이 필요하다
- 서브 프로젝트(blog, docs, learn-react 등)를 방문자가 쉽게 탐색할 수 있는 포트폴리오 스타일 갤러리를 제공해야 한다
- GitHub Pages의 무료 호스팅 인프라를 활용한 자동화된 배포 파이프라인이 필요하다

### 1.3 범위

**포함 범위:**
- Astro 프로젝트 초기 설정 (TypeScript, Tailwind CSS)
- 허브 네비게이션 페이지 (프로젝트 카드 갤러리)
- 프로젝트 데이터 시스템 (JSON/YAML 기반 레지스트리)
- 반응형 레이아웃 (Header, Footer, Mobile/Tablet/Desktop)
- GitHub Actions CI/CD 배포 워크플로우
- SEO 기본 설정 (Meta tags, Open Graph, Sitemap)
- 다크/라이트 테마 토글

**제외 범위:**
- 서브 프로젝트 저장소 생성 및 배포 (별도 SPEC)
- 서버 사이드 기능 (순수 SSG)
- 인증/인가 기능
- 데이터베이스 연동

---

## 2. 환경 (Environment)

### 2.1 시스템 환경

| 항목 | 사양 |
|------|------|
| 런타임 | Node.js 22.x+ (Astro 6 요구사항) |
| 패키지 매니저 | pnpm 9.x+ |
| 프레임워크 | Astro 6.x (^6.0.8) |
| 언어 | TypeScript 6.x (^6.0.2) |
| CSS 프레임워크 | Tailwind CSS v4 (^4.2.2, @tailwindcss/vite 방식) |
| 배포 플랫폼 | GitHub Pages |
| CI/CD | GitHub Actions |

### 2.2 배포 환경

| 항목 | 값 |
|------|-----|
| 배포 URL | `https://elymas.github.io` |
| 저장소 | `github-pages` (elymas.github.io) |
| 빌드 출력 | `dist/` |
| basePath | 불필요 (루트 도메인 배포) |

### 2.3 브라우저 지원

| 브라우저 | 최소 버전 |
|----------|-----------|
| Chrome | 최신 2개 버전 |
| Firefox | 최신 2개 버전 |
| Safari | 최신 2개 버전 |
| Edge | 최신 2개 버전 |
| Mobile Safari (iOS) | 최신 2개 버전 |
| Chrome (Android) | 최신 2개 버전 |

---

## 3. 가정 (Assumptions)

- **A1**: GitHub 계정 `elymas`의 `github-pages` 저장소가 이미 존재하며 GitHub Pages가 활성화되어 있다
- **A2**: pnpm이 로컬 개발 환경에 설치되어 있다
- **A3**: 서브 프로젝트는 별도 저장소에서 독립적으로 배포되며, 메인 허브는 링크만 제공한다
- **A4**: 메인 허브의 빌드 및 배포는 서브 프로젝트에 영향을 주지 않는다
- **A5**: 서브 프로젝트 목록은 빌드 시점에 정적으로 결정된다 (런타임 API 호출 없음)
- **A6**: 초기에는 영문 기반 UI로 구축하되, 다국어 지원은 향후 확장으로 고려한다

---

## 4. 요구사항 (Requirements)

### 4.1 프로젝트 설정 (Project Setup)

#### REQ-SETUP-001: Astro 프레임워크 기반 구축
- **유형**: Ubiquitous
- **설명**: 허브 사이트는 **항상** Astro 6.x SSG 프레임워크를 사용하여 정적 사이트로 빌드해야 한다.
- **EARS**: The hub site **shall** use Astro 6.x with `output: 'static'` configuration.
- **구현 상태**: 완료 (astro ^6.0.8)

#### REQ-SETUP-002: TypeScript 지원
- **유형**: Ubiquitous
- **설명**: 모든 소스 코드는 **항상** TypeScript로 작성되어야 한다.
- **EARS**: The hub site **shall** use TypeScript for all source code with strict type checking enabled.

#### REQ-SETUP-003: Tailwind CSS 통합
- **유형**: Ubiquitous
- **설명**: 스타일링은 **항상** Tailwind CSS를 통해 처리해야 한다.
- **EARS**: The hub site **shall** integrate Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin for all styling.
- **구현 상태**: 완료 (tailwindcss ^4.2.2, @tailwindcss/vite 방식 - NOT @astrojs/tailwind)

#### REQ-SETUP-004: pnpm 패키지 매니저
- **유형**: Ubiquitous
- **설명**: 패키지 관리는 **항상** pnpm을 사용해야 한다.
- **EARS**: The hub site **shall** use pnpm as the package manager for dependency management.

---

### 4.2 허브 네비게이션 (Hub Navigation)

#### REQ-NAV-001: 프로젝트 카드 갤러리
- **유형**: Ubiquitous
- **설명**: 메인 페이지는 **항상** 모든 서브 프로젝트를 카드 형식의 갤러리로 표시해야 한다.
- **EARS**: The hub index page **shall** display all registered sub-projects as a card gallery.

#### REQ-NAV-002: 프로젝트 카드 정보 표시
- **유형**: Ubiquitous
- **설명**: 각 프로젝트 카드는 **항상** 프로젝트명, 설명, 기술 스택, 유형(badge)을 표시해야 한다.
- **EARS**: Each project card **shall** display the project name, description, technology stack tags, and project type badge.

#### REQ-NAV-003: 서브 프로젝트 네비게이션
- **유형**: Event-Driven
- **설명**: 사용자가 프로젝트 카드를 클릭하면 해당 서브 프로젝트 URL로 이동해야 한다.
- **EARS**: **When** a user clicks a project card, the hub **shall** navigate to the corresponding sub-project URL (`elymas.github.io/{repo-name}`).

#### REQ-NAV-004: 프로젝트 필터링
- **유형**: Optional
- **설명**: 가능하면 프로젝트 유형(블로그, 문서, 랜딩 등)별 필터링 기능을 제공한다.
- **EARS**: **Where** filtering is implemented, the hub **shall** allow users to filter projects by type.

---

### 4.3 프로젝트 데이터 시스템 (Project Registry)

#### REQ-DATA-001: 프로젝트 레지스트리 파일
- **유형**: Ubiquitous
- **설명**: 서브 프로젝트 메타데이터는 **항상** 구조화된 데이터 파일(JSON 또는 YAML)로 관리해야 한다.
- **EARS**: The hub **shall** manage sub-project metadata through a structured data file (JSON or YAML) in the `src/data/` directory.

#### REQ-DATA-002: 프로젝트 메타데이터 스키마
- **유형**: Ubiquitous
- **설명**: 각 프로젝트 항목은 **항상** 다음 필드를 포함해야 한다: `name`, `description`, `url`, `type`, `techStack`, `thumbnail` (optional), `featured` (optional).
- **EARS**: Each project entry in the registry **shall** contain at minimum: `name` (string), `description` (string), `url` (string), `type` (enum), and `techStack` (string array).

#### REQ-DATA-003: TypeScript 타입 안전성
- **유형**: Ubiquitous
- **설명**: 프로젝트 레지스트리 데이터는 **항상** TypeScript 인터페이스로 타입이 정의되어야 한다.
- **EARS**: The project registry data **shall** be typed with TypeScript interfaces ensuring compile-time type safety.

#### REQ-DATA-004: 레지스트리 데이터 로드
- **유형**: Event-Driven
- **설명**: Astro 빌드 시 프로젝트 레지스트리 데이터를 로드하여 페이지를 생성해야 한다.
- **EARS**: **When** Astro builds the site, the hub **shall** load the project registry data and generate project cards from it.

---

### 4.4 반응형 레이아웃 (Responsive Layout)

#### REQ-LAYOUT-001: 기본 레이아웃 구조
- **유형**: Ubiquitous
- **설명**: 모든 페이지는 **항상** Header, Main Content, Footer로 구성된 기본 레이아웃을 사용해야 한다.
- **EARS**: All pages **shall** use a base layout component (`BaseLayout.astro`) containing header, main content area, and footer.

#### REQ-LAYOUT-002: 반응형 디자인
- **유형**: Ubiquitous
- **설명**: 레이아웃은 **항상** Mobile (< 640px), Tablet (640px~1024px), Desktop (> 1024px) 화면 크기에 적응해야 한다.
- **EARS**: The layout **shall** be responsive across mobile (< 640px), tablet (640px-1024px), and desktop (> 1024px) viewports.

#### REQ-LAYOUT-003: 모바일 카드 레이아웃
- **유형**: State-Driven
- **설명**: 모바일 뷰포트에서는 프로젝트 카드를 단일 열로 표시해야 한다.
- **EARS**: **While** the viewport width is less than 640px, the hub **shall** display project cards in a single-column layout.

#### REQ-LAYOUT-004: 데스크톱 그리드 레이아웃
- **유형**: State-Driven
- **설명**: 데스크톱 뷰포트에서는 프로젝트 카드를 다중 열 그리드로 표시해야 한다.
- **EARS**: **While** the viewport width exceeds 1024px, the hub **shall** display project cards in a multi-column grid layout (2-3 columns).

---

### 4.5 GitHub Actions CI/CD

#### REQ-CICD-001: 자동 배포 워크플로우
- **유형**: Event-Driven
- **설명**: `main` 브랜치에 push 이벤트 발생 시 자동으로 빌드하고 배포해야 한다.
- **EARS**: **When** code is pushed to the `main` branch, the GitHub Actions workflow **shall** automatically build and deploy the site to GitHub Pages.

#### REQ-CICD-002: 빌드 환경 설정
- **유형**: Ubiquitous
- **설명**: 빌드 환경은 **항상** Node.js 22, pnpm, `actions/deploy-pages@v4`를 사용해야 한다.
- **EARS**: The CI/CD workflow **shall** use Node.js 22, pnpm, and `actions/deploy-pages@v4` for deployment.
- **구현 상태**: 완료 (Node.js 22 사용 중)

#### REQ-CICD-003: 빌드 실패 처리
- **유형**: Unwanted Behavior
- **설명**: 빌드 실패 시 배포가 진행되어서는 안 된다.
- **EARS**: **If** the build step fails, **then** the workflow **shall** halt deployment and report the failure status.

#### REQ-CICD-004: 배포 권한 설정
- **유형**: Ubiquitous
- **설명**: 워크플로우는 **항상** `contents: read`, `pages: write`, `id-token: write` 권한을 설정해야 한다.
- **EARS**: The deployment workflow **shall** configure permissions with `contents: read`, `pages: write`, and `id-token: write`.

---

### 4.6 SEO 기본 설정 (SEO Basics)

#### REQ-SEO-001: 메타 태그
- **유형**: Ubiquitous
- **설명**: 모든 페이지는 **항상** `title`, `description`, `viewport`, `charset` 메타 태그를 포함해야 한다.
- **EARS**: Every page **shall** include `title`, `description`, `viewport`, and `charset` meta tags in the `<head>`.

#### REQ-SEO-002: Open Graph 태그
- **유형**: Ubiquitous
- **설명**: 모든 페이지는 **항상** Open Graph 메타 태그(`og:title`, `og:description`, `og:image`, `og:url`)를 포함해야 한다.
- **EARS**: Every page **shall** include Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`).

#### REQ-SEO-003: Sitemap 생성
- **유형**: Event-Driven
- **설명**: 빌드 시 `@astrojs/sitemap` 통합을 통해 sitemap.xml을 자동 생성해야 한다.
- **EARS**: **When** the site is built, Astro **shall** generate a `sitemap.xml` using `@astrojs/sitemap` integration.

#### REQ-SEO-004: Canonical URL
- **유형**: Ubiquitous
- **설명**: 모든 페이지는 **항상** canonical URL을 포함해야 한다.
- **EARS**: Every page **shall** include a canonical URL meta tag pointing to `https://elymas.github.io{path}`.

---

### 4.7 다크/라이트 테마 (Theme)

#### REQ-THEME-001: 테마 토글 버튼
- **유형**: Ubiquitous
- **설명**: 헤더에는 **항상** 다크/라이트 테마 전환 버튼이 표시되어야 한다.
- **EARS**: The header **shall** display a theme toggle button for switching between dark and light modes.

#### REQ-THEME-002: 시스템 환경설정 감지
- **유형**: Event-Driven
- **설명**: 초기 로드 시 사용자의 시스템 환경설정(prefers-color-scheme)을 감지하여 테마를 적용해야 한다.
- **EARS**: **When** the page loads for the first time, the hub **shall** detect the user's system color scheme preference via `prefers-color-scheme` and apply the matching theme.

#### REQ-THEME-003: 테마 전환 동작
- **유형**: Event-Driven
- **설명**: 사용자가 테마 토글 버튼을 클릭하면 현재 테마의 반대 테마로 즉시 전환해야 한다.
- **EARS**: **When** the user clicks the theme toggle button, the hub **shall** switch to the opposite theme immediately without page reload.

#### REQ-THEME-004: 테마 설정 유지
- **유형**: Event-Driven
- **설명**: 테마 전환 시 사용자의 선택을 localStorage에 저장하여 재방문 시 유지해야 한다.
- **EARS**: **When** the theme is toggled, the hub **shall** persist the user's preference in `localStorage` and restore it on subsequent visits.

#### REQ-THEME-005: 테마 깜빡임 방지
- **유형**: Unwanted Behavior
- **설명**: 페이지 로드 시 테마 전환에 의한 화면 깜빡임(FOUC)이 발생해서는 안 된다.
- **EARS**: **If** the page loads with a stored theme preference, **then** the hub **shall** apply the theme before first paint to prevent Flash of Unstyled Content (FOUC).

---

### 4.8 접근성 (Accessibility)

#### REQ-A11Y-001: 시맨틱 HTML
- **유형**: Ubiquitous
- **설명**: 모든 페이지는 **항상** 시맨틱 HTML 요소(`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`)를 사용해야 한다.
- **EARS**: All pages **shall** use semantic HTML elements for proper document structure.

#### REQ-A11Y-002: 키보드 네비게이션
- **유형**: Ubiquitous
- **설명**: 모든 인터랙티브 요소는 **항상** 키보드로 접근 가능해야 한다.
- **EARS**: All interactive elements **shall** be accessible via keyboard navigation with visible focus indicators.

#### REQ-A11Y-003: 이미지 대체 텍스트
- **유형**: Ubiquitous
- **설명**: 모든 이미지는 **항상** 의미 있는 `alt` 속성을 포함해야 한다.
- **EARS**: All images **shall** include meaningful `alt` attributes for screen reader accessibility.

---

## 5. 기술적 제약 사항 (Technical Constraints)

| ID | 제약 사항 | 이유 |
|----|-----------|------|
| TC-001 | 순수 정적 사이트 생성(SSG)만 허용 | GitHub Pages는 서버사이드 기능 미지원 |
| TC-002 | 메인 허브에 basePath 설정 불필요 | 루트 도메인(`elymas.github.io`) 직접 배포 |
| TC-003 | JavaScript 최소화 | Astro의 Zero-JS 기본값 활용, 필수 인터랙션(테마 토글)만 클라이언트 JS 사용 |
| TC-004 | 환경 변수는 빌드 시점에만 사용 가능 | 정적 사이트 제한 |
| TC-005 | 서브 프로젝트 데이터는 빌드 시 정적 결정 | 런타임 API 호출 불가 |
| TC-006 | GitHub Actions 기반 배포만 사용 | `gh-pages` 브랜치 방식 대신 Actions 직접 배포 |

---

## 6. 의존성 (Dependencies)

### 6.1 핵심 패키지

| 패키지 | 버전 | 역할 |
|--------|------|------|
| `astro` | ^5.x | 메인 프레임워크 (SSG) |
| `@astrojs/tailwind` | latest | Tailwind CSS Astro 통합 |
| `@astrojs/sitemap` | latest | Sitemap 자동 생성 |
| `tailwindcss` | ^3.x 또는 ^4.x | CSS 유틸리티 프레임워크 |
| `typescript` | ^5.x | 타입 안전성 |

### 6.2 개발 의존성

| 패키지 | 버전 | 역할 |
|--------|------|------|
| `@astrojs/check` | latest | Astro 타입 검사 |
| `prettier` | latest | 코드 포매터 |
| `prettier-plugin-astro` | latest | Astro 파일 포매터 플러그인 |

### 6.3 외부 의존성

| 의존성 | 유형 | 설명 |
|--------|------|------|
| GitHub Pages | 인프라 | 정적 사이트 호스팅 |
| GitHub Actions | CI/CD | 자동화된 빌드 및 배포 |
| `actions/deploy-pages@v4` | GitHub Action | Pages 배포 액션 |
| `pnpm/action-setup@v4` | GitHub Action | pnpm 설치 액션 |

---

## 7. 위험 분석 (Risk Analysis)

| ID | 위험 | 가능성 | 영향도 | 대응 방안 |
|----|------|--------|--------|-----------|
| R-001 | Astro 5.x 주요 변경으로 호환성 문제 | 낮음 | 중간 | Astro 공식 마이그레이션 가이드 참조, 버전 고정 |
| R-002 | Tailwind CSS v3/v4 통합 설정 차이 | 중간 | 낮음 | Astro 공식 Tailwind 통합 문서 우선 참조 |
| R-003 | GitHub Pages 빌드 크기 제한 (1GB) | 낮음 | 낮음 | 이미지 최적화, 불필요한 파일 제외 |
| R-004 | 테마 전환 시 FOUC 발생 | 중간 | 중간 | `<head>` 인라인 스크립트로 초기 테마 적용 |
| R-005 | 서브 프로젝트 URL 변경 시 허브 링크 깨짐 | 중간 | 중간 | 프로젝트 레지스트리 중앙 관리로 일괄 수정 가능 |
| R-006 | GitHub Actions 워크플로우 실패 | 낮음 | 높음 | 워크플로우 상태 알림 설정, 롤백 절차 문서화 |

---

## 8. 추적성 (Traceability)

| SPEC ID | 관련 문서 | 연결 |
|---------|-----------|------|
| SPEC-INFRA-001 | product.md | 허브 네비게이션, GitHub Actions CI/CD, 교육용 원페이지 템플릿 |
| SPEC-INFRA-001 | structure.md | 메인 허브 저장소 구조, GitHub Actions 배포 워크플로우 |
| SPEC-INFRA-001 | tech.md | Astro 5.x, Tailwind CSS, TypeScript, pnpm, GitHub Actions |
