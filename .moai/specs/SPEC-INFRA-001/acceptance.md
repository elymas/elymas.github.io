---
id: SPEC-INFRA-001
type: acceptance
version: "1.0.0"
created: "2026-03-24"
updated: "2026-03-24"
author: limbowl
tags: [infra, hub, astro, github-pages]
---

# SPEC-INFRA-001 수락 기준: Astro 메인 허브 사이트 구축

## 1. 수락 기준 시나리오 (Given-When-Then)

---

### AC-001: Astro 프로젝트 빌드 성공

**관련 요구사항**: REQ-SETUP-001, REQ-SETUP-002, REQ-SETUP-003

```gherkin
Scenario: Astro 프로젝트가 정상적으로 빌드된다
  Given Astro 5.x 프로젝트가 TypeScript와 Tailwind CSS와 함께 설정되어 있다
  And 모든 의존성이 pnpm으로 설치되어 있다
  When `pnpm build` 명령을 실행한다
  Then 빌드가 오류 없이 완료되어야 한다
  And `dist/` 디렉토리에 정적 HTML 파일이 생성되어야 한다
  And TypeScript 타입 검사 오류가 없어야 한다
```

```gherkin
Scenario: 개발 서버가 정상적으로 실행된다
  Given Astro 프로젝트가 초기화되어 있다
  When `pnpm dev` 명령을 실행한다
  Then 개발 서버가 `http://localhost:4321`에서 실행되어야 한다
  And 브라우저에서 메인 페이지가 렌더링되어야 한다
```

---

### AC-002: 허브 페이지에 프로젝트 카드가 표시된다

**관련 요구사항**: REQ-NAV-001, REQ-NAV-002

```gherkin
Scenario: 메인 페이지에서 모든 등록된 프로젝트가 카드로 표시된다
  Given 프로젝트 레지스트리에 3개의 서브 프로젝트가 등록되어 있다
  When 사용자가 메인 허브 페이지(`/`)에 접속한다
  Then 3개의 프로젝트 카드가 갤러리 형태로 표시되어야 한다
  And 각 카드에는 프로젝트명이 표시되어야 한다
  And 각 카드에는 설명 텍스트가 표시되어야 한다
  And 각 카드에는 기술 스택 태그가 표시되어야 한다
  And 각 카드에는 프로젝트 유형 배지가 표시되어야 한다
```

```gherkin
Scenario: 프로젝트 레지스트리가 비어있을 때 안내 메시지가 표시된다
  Given 프로젝트 레지스트리에 등록된 프로젝트가 없다
  When 사용자가 메인 허브 페이지에 접속한다
  Then "등록된 프로젝트가 없습니다" 또는 이에 상응하는 안내 메시지가 표시되어야 한다
```

---

### AC-003: 프로젝트 레지스트리 데이터가 올바르게 로드된다

**관련 요구사항**: REQ-DATA-001, REQ-DATA-002, REQ-DATA-003, REQ-DATA-004

```gherkin
Scenario: JSON 프로젝트 레지스트리 파일이 빌드 시 로드된다
  Given `src/data/projects.json` 파일에 유효한 프로젝트 데이터가 존재한다
  And 데이터가 Project TypeScript 인터페이스를 준수한다
  When Astro 빌드가 실행된다
  Then 프로젝트 데이터가 정상적으로 로드되어야 한다
  And 모든 필수 필드(name, description, url, type, techStack)가 존재해야 한다
  And 생성된 HTML에 프로젝트 정보가 포함되어야 한다
```

```gherkin
Scenario: 잘못된 형식의 레지스트리 데이터가 감지된다
  Given `src/data/projects.json`에 필수 필드가 누락된 프로젝트 데이터가 존재한다
  When Astro 빌드가 실행된다
  Then TypeScript 컴파일러가 타입 오류를 보고해야 한다
```

---

### AC-004: 반응형 레이아웃이 모바일/데스크톱에서 동작한다

**관련 요구사항**: REQ-LAYOUT-001, REQ-LAYOUT-002, REQ-LAYOUT-003, REQ-LAYOUT-004

```gherkin
Scenario: 모바일 뷰포트에서 단일 열 레이아웃으로 표시된다
  Given 사용자가 모바일 디바이스(뷰포트 너비 < 640px)를 사용한다
  When 메인 허브 페이지에 접속한다
  Then 프로젝트 카드가 단일 열(1-column)로 세로 배치되어야 한다
  And Header와 Footer가 전체 너비로 표시되어야 한다
  And 콘텐츠가 화면을 넘치지 않아야 한다 (가로 스크롤 없음)
```

```gherkin
Scenario: 데스크톱 뷰포트에서 다중 열 그리드로 표시된다
  Given 사용자가 데스크톱 디바이스(뷰포트 너비 > 1024px)를 사용한다
  When 메인 허브 페이지에 접속한다
  Then 프로젝트 카드가 다중 열 그리드(2-3열)로 배치되어야 한다
  And 카드 간 일관된 간격이 유지되어야 한다
```

```gherkin
Scenario: 태블릿 뷰포트에서 중간 레이아웃으로 표시된다
  Given 사용자가 태블릿 디바이스(뷰포트 너비 640px ~ 1024px)를 사용한다
  When 메인 허브 페이지에 접속한다
  Then 프로젝트 카드가 2열 그리드로 배치되어야 한다
```

---

### AC-005: GitHub Actions가 성공적으로 배포한다

**관련 요구사항**: REQ-CICD-001, REQ-CICD-002, REQ-CICD-003, REQ-CICD-004

```gherkin
Scenario: main 브랜치 push 시 자동 배포가 실행된다
  Given `.github/workflows/deploy.yml`이 올바르게 설정되어 있다
  And GitHub 저장소의 Pages 설정이 "GitHub Actions"로 되어 있다
  When `main` 브랜치에 코드가 push된다
  Then GitHub Actions 워크플로우가 자동으로 실행되어야 한다
  And Node.js 20과 pnpm을 사용하여 빌드해야 한다
  And `dist/` 디렉토리의 빌드 결과물이 GitHub Pages에 배포되어야 한다
  And `https://elymas.github.io`에서 사이트가 접근 가능해야 한다
```

```gherkin
Scenario: 빌드 실패 시 배포가 중단된다
  Given 빌드에 오류가 포함된 코드가 존재한다
  When `main` 브랜치에 해당 코드가 push된다
  Then `pnpm build` 단계에서 실패해야 한다
  And 배포 단계가 실행되지 않아야 한다
  And 워크플로우가 실패 상태로 보고되어야 한다
```

---

### AC-006: 다크/라이트 테마 토글이 동작한다

**관련 요구사항**: REQ-THEME-001, REQ-THEME-002, REQ-THEME-003, REQ-THEME-004, REQ-THEME-005

```gherkin
Scenario: 시스템 다크 모드 사용자에게 다크 테마가 적용된다
  Given 사용자의 운영체제가 다크 모드로 설정되어 있다
  And localStorage에 저장된 테마 선호가 없다
  When 사용자가 메인 허브 페이지에 처음 접속한다
  Then 다크 테마가 적용되어야 한다
  And 화면 깜빡임(FOUC) 없이 다크 테마가 즉시 렌더링되어야 한다
```

```gherkin
Scenario: 테마 토글 버튼으로 테마가 전환된다
  Given 현재 라이트 테마가 적용되어 있다
  When 사용자가 헤더의 테마 토글 버튼을 클릭한다
  Then 페이지 새로고침 없이 다크 테마로 즉시 전환되어야 한다
  And 테마 토글 아이콘이 변경되어야 한다 (Sun -> Moon 또는 반대)
```

```gherkin
Scenario: 테마 선호가 재방문 시 유지된다
  Given 사용자가 이전에 다크 테마를 선택하였다
  And localStorage에 테마 선호가 'dark'로 저장되어 있다
  When 사용자가 페이지를 새로고침하거나 재방문한다
  Then 다크 테마가 즉시 적용되어야 한다 (FOUC 없음)
  And 시스템 색상 설정과 무관하게 저장된 선호가 우선 적용되어야 한다
```

---

### AC-007: SEO 메타 태그가 올바르게 설정된다

**관련 요구사항**: REQ-SEO-001, REQ-SEO-002, REQ-SEO-003, REQ-SEO-004

```gherkin
Scenario: 메인 페이지에 필수 메타 태그가 포함된다
  Given Astro 빌드가 완료되었다
  When 빌드된 `dist/index.html` 파일을 검사한다
  Then `<title>` 태그가 존재해야 한다
  And `<meta name="description">` 태그가 존재해야 한다
  And `<meta name="viewport">` 태그가 존재해야 한다
  And `<meta charset="utf-8">` 태그가 존재해야 한다
  And `<link rel="canonical">` 태그가 `https://elymas.github.io`로 설정되어야 한다
```

```gherkin
Scenario: Open Graph 태그가 올바르게 설정된다
  Given Astro 빌드가 완료되었다
  When 빌드된 `dist/index.html` 파일을 검사한다
  Then `<meta property="og:title">` 태그가 존재해야 한다
  And `<meta property="og:description">` 태그가 존재해야 한다
  And `<meta property="og:image">` 태그가 존재해야 한다
  And `<meta property="og:url">` 태그가 `https://elymas.github.io`로 설정되어야 한다
```

```gherkin
Scenario: Sitemap이 자동 생성된다
  Given `@astrojs/sitemap` 통합이 설정되어 있다
  When Astro 빌드가 실행된다
  Then `dist/sitemap-index.xml` 또는 `dist/sitemap-0.xml` 파일이 생성되어야 한다
  And sitemap에 메인 페이지 URL이 포함되어야 한다
```

---

### AC-008: 서브 프로젝트 네비게이션이 동작한다

**관련 요구사항**: REQ-NAV-003

```gherkin
Scenario: 프로젝트 카드 클릭 시 서브 프로젝트로 이동한다
  Given 프로젝트 레지스트리에 URL이 `https://elymas.github.io/blog`인 프로젝트가 등록되어 있다
  And 해당 프로젝트 카드가 메인 페이지에 표시되어 있다
  When 사용자가 해당 프로젝트 카드를 클릭한다
  Then 브라우저가 `https://elymas.github.io/blog`으로 이동해야 한다
  And 새 탭 또는 현재 탭에서 이동해야 한다 (외부 링크는 새 탭 권장)
```

```gherkin
Scenario: 키보드로 프로젝트 카드에 접근할 수 있다
  Given 프로젝트 카드가 메인 페이지에 표시되어 있다
  When 사용자가 Tab 키로 프로젝트 카드에 포커스를 이동한다
  Then 프로젝트 카드에 시각적 포커스 인디케이터가 표시되어야 한다
  And Enter 키를 누르면 해당 서브 프로젝트 URL로 이동해야 한다
```

---

## 2. 엣지 케이스 시나리오

### EC-001: 프로젝트 썸네일이 없는 경우

```gherkin
Scenario: 썸네일이 없는 프로젝트에 기본 표시가 적용된다
  Given 프로젝트 레지스트리에 `thumbnail` 필드가 없는 프로젝트가 존재한다
  When 해당 프로젝트 카드가 렌더링된다
  Then 프로젝트 유형에 따른 기본 아이콘 또는 그라데이션 배경이 표시되어야 한다
  And 레이아웃이 깨지지 않아야 한다
```

### EC-002: 매우 긴 프로젝트명 또는 설명

```gherkin
Scenario: 긴 텍스트가 적절히 처리된다
  Given 프로젝트의 description이 200자를 초과한다
  When 프로젝트 카드가 렌더링된다
  Then 설명 텍스트가 2-3줄 이후 말줄임표(...)로 truncate되어야 한다
  And 카드 레이아웃이 다른 카드와 일관되게 유지되어야 한다
```

### EC-003: 다수의 기술 스택 태그

```gherkin
Scenario: 기술 스택 태그가 많은 프로젝트의 카드 표시
  Given 프로젝트의 techStack 배열에 8개 이상의 항목이 있다
  When 프로젝트 카드가 렌더링된다
  Then 표시 가능한 태그만 보여주고 나머지는 "+N" 형태로 축약되어야 한다
  Or 태그가 카드 내에서 줄바꿈되어 표시되어야 한다
  And 카드 레이아웃이 깨지지 않아야 한다
```

### EC-004: JavaScript 비활성화 환경

```gherkin
Scenario: JavaScript가 비활성화된 브라우저에서 기본 동작
  Given 사용자의 브라우저에서 JavaScript가 비활성화되어 있다
  When 메인 허브 페이지에 접속한다
  Then 프로젝트 카드 갤러리는 정상적으로 표시되어야 한다 (SSG 정적 HTML)
  And 프로젝트 링크 네비게이션이 동작해야 한다
  And 테마 토글 버튼은 동작하지 않을 수 있다 (Graceful Degradation)
```

### EC-005: 느린 네트워크 환경

```gherkin
Scenario: 느린 네트워크에서 페이지 로딩 경험
  Given 사용자가 3G 네트워크 환경을 사용한다
  When 메인 허브 페이지에 접속한다
  Then 핵심 HTML 콘텐츠가 먼저 렌더링되어야 한다
  And 이미지가 lazy loading으로 처리되어야 한다
  And 페이지가 5초 이내에 상호작용 가능해야 한다
```

---

## 3. 성능 기준 (Performance Criteria)

### 3.1 Lighthouse 점수 목표

| 항목 | 최소 점수 | 목표 점수 |
|------|-----------|-----------|
| Performance | 85 | 95+ |
| Accessibility | 85 | 95+ |
| Best Practices | 85 | 95+ |
| SEO | 90 | 100 |

### 3.2 Core Web Vitals 목표

| 지표 | 목표 | 설명 |
|------|------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 가장 큰 콘텐츠 요소 렌더링 시간 |
| FID (First Input Delay) | < 100ms | 첫 사용자 입력 응답 시간 |
| CLS (Cumulative Layout Shift) | < 0.1 | 누적 레이아웃 변경 점수 |
| INP (Interaction to Next Paint) | < 200ms | 인터랙션 응답 시간 |

### 3.3 빌드 성능 목표

| 항목 | 목표 |
|------|------|
| 빌드 시간 | < 30초 |
| 빌드 결과물 크기 | < 1MB (이미지 제외) |
| HTML 파일 크기 (gzip) | < 50KB |
| CSS 파일 크기 (gzip) | < 20KB |
| JavaScript 파일 크기 (gzip) | < 10KB (테마 토글 스크립트만) |

---

## 4. 검증 방법 (Verification Methods)

### 4.1 자동화 검증

| 검증 항목 | 도구 | 방법 |
|-----------|------|------|
| TypeScript 타입 검사 | `astro check` | `pnpm astro check` 실행 |
| 빌드 성공 | `astro build` | `pnpm build` 실행 및 exit code 확인 |
| HTML 유효성 | W3C Validator | 빌드된 HTML 파일 검증 |
| 접근성 | axe-core | Lighthouse 접근성 감사 |
| SEO | Lighthouse | Lighthouse SEO 감사 |
| 성능 | Lighthouse | Lighthouse 성능 감사 |

### 4.2 수동 검증

| 검증 항목 | 방법 |
|-----------|------|
| 반응형 레이아웃 | Chrome DevTools 디바이스 에뮬레이션으로 3단계 뷰포트 검증 |
| 테마 전환 | 수동으로 토글 버튼 클릭 및 새로고침 후 유지 확인 |
| 네비게이션 | 프로젝트 카드 클릭으로 URL 이동 확인 |
| 키보드 접근성 | Tab/Enter 키로 전체 페이지 네비게이션 테스트 |
| FOUC 확인 | 페이지 새로고침 시 테마 깜빡임 여부 확인 |

### 4.3 배포 검증

| 검증 항목 | 방법 |
|-----------|------|
| GitHub Actions 실행 | `main` push 후 Actions 탭에서 워크플로우 상태 확인 |
| 사이트 접속 | `https://elymas.github.io` 브라우저 접속 확인 |
| HTTPS 인증서 | 브라우저 주소창 자물쇠 아이콘 확인 |
| 404 페이지 | 존재하지 않는 경로 접속 시 적절한 응답 확인 |

---

## 5. Definition of Done

이 SPEC의 구현이 완료된 것으로 인정되려면 다음 조건을 **모두** 충족해야 한다:

- [ ] `pnpm build`가 오류 없이 완료된다
- [ ] `pnpm astro check`가 타입 오류 없이 통과한다
- [ ] 메인 페이지에 프로젝트 카드 갤러리가 표시된다
- [ ] 프로젝트 레지스트리(JSON/YAML)에서 데이터가 정상 로드된다
- [ ] 반응형 레이아웃이 Mobile/Tablet/Desktop에서 올바르게 동작한다
- [ ] 다크/라이트 테마 전환이 FOUC 없이 동작한다
- [ ] 테마 선호가 localStorage에 저장되고 재방문 시 복원된다
- [ ] GitHub Actions 워크플로우가 `main` push 시 자동 실행된다
- [ ] `https://elymas.github.io`에서 사이트가 접근 가능하다
- [ ] 필수 SEO 메타 태그(title, description, OG, canonical)가 존재한다
- [ ] sitemap.xml이 자동 생성된다
- [ ] 키보드 네비게이션이 동작한다
- [ ] Lighthouse Performance 점수 85 이상
- [ ] Lighthouse Accessibility 점수 85 이상
- [ ] Lighthouse SEO 점수 90 이상
