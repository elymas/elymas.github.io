# GitHub Pages Hosting Hub - 프로젝트 구조 문서

## 아키텍처 패턴

**패턴명**: 다중 저장소 정적 사이트 허브 (Multi-Repository Static Site Hub)

이 아키텍처는 하나의 메인 허브 저장소와 다수의 독립적인 서브 프로젝트 저장소로 구성됩니다. 메인 허브는 `elymas.github.io` 도메인을 담당하고, 서브 프로젝트는 `elymas.github.io/{저장소명}` 경로에 배포됩니다.

```
elymas.github.io              (메인 허브 - 이 저장소)
elymas.github.io/blog         (서브 프로젝트: blog 저장소)
elymas.github.io/docs         (서브 프로젝트: docs 저장소)
elymas.github.io/learn-react  (서브 프로젝트: learn-react 저장소)
```

---

## 메인 허브 저장소 구조

저장소명: `github-pages` (GitHub 사용자명: elymas이므로 `elymas.github.io` 저장소로 동작)

```
github-pages/                          # 메인 허브 저장소 루트 (elymas.github.io)
│
├── src/                               # Astro 소스 코드 (11개 파일)
│   ├── components/                    # 재사용 가능한 Astro 컴포넌트 (5개)
│   │   ├── Header.astro               # 사이트 헤더 (로고, 네비게이션)
│   │   ├── Footer.astro               # 사이트 푸터
│   │   ├── ProjectCard.astro          # 서브 프로젝트 카드 컴포넌트
│   │   ├── ProjectGrid.astro          # 프로젝트 카드 그리드 레이아웃
│   │   └── ThemeToggle.astro          # 다크/라이트 테마 전환 버튼
│   ├── layouts/                       # 공유 레이아웃 컴포넌트 (1개)
│   │   └── BaseLayout.astro           # 기본 HTML 레이아웃 (head, header, footer 포함)
│   ├── pages/                         # Astro 페이지 (파일 기반 라우팅) (1개)
│   │   └── index.astro                # 메인 허브 홈페이지 (서브 프로젝트 목록 표시)
│   ├── data/                          # 정적 데이터 파일 (1개)
│   │   └── projects.json              # 서브 프로젝트 메타데이터 레지스트리
│   ├── types/                         # TypeScript 타입 정의 (1개)
│   │   └── project.ts                 # Project 인터페이스 타입 정의
│   ├── utils/                         # 유틸리티 함수 (1개)
│   │   └── projects.ts                # 프로젝트 데이터 로드 및 필터링 유틸리티
│   └── styles/                        # 전역 스타일 (1개)
│       └── global.css                 # Tailwind CSS v4 import 및 전역 스타일
│
├── public/                            # 빌드 과정 없이 그대로 복사되는 정적 파일
│   ├── banner.png                     # float on 브랜드 배너 이미지 (OG/Twitter Card)
│   └── favicon.svg                    # float on 클라우드 아이콘 파비콘
│
├── astro.config.mjs                   # Astro 설정 파일 (@tailwindcss/vite, @astrojs/sitemap)
├── package.json                       # 프로젝트 의존성 및 스크립트
├── tsconfig.json                      # TypeScript 설정
│
├── .github/                           # GitHub 관련 설정
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions 배포 워크플로우 (Node.js 22)
│
└── .moai/                             # MoAI 프로젝트 설정
    ├── config/                        # MoAI 설정 파일
    ├── project/                       # 프로젝트 문서 (이 파일이 위치하는 곳)
    │   ├── product.md                 # 제품 문서
    │   ├── structure.md               # 구조 문서 (현재 파일)
    │   └── tech.md                    # 기술 문서
    └── specs/                         # SPEC 파일
```

---

## 주요 파일 설명

### `astro.config.mjs`

메인 허브의 Astro 설정 파일입니다. 메인 허브는 루트 도메인(`elymas.github.io`)에 배포되므로 `base` 설정이 필요하지 않습니다.

주요 설정 항목:
- `site: 'https://elymas.github.io'` - 사이트 URL (sitemap 생성에 필요)
- `output: 'static'` - 정적 사이트 생성 모드
- `vite.plugins: [tailwindcss()]` - Tailwind CSS v4 Vite 플러그인 방식
- `integrations: [sitemap()]` - @astrojs/sitemap 통합
- 서브 프로젝트와 달리 `base` 옵션 불필요

### `src/pages/index.astro`

메인 허브의 홈페이지입니다. 모든 서브 프로젝트를 카드 형식으로 나열하고 각 프로젝트로의 링크를 제공합니다.

### `.github/workflows/deploy.yml`

`main` 브랜치에 푸시 시 자동으로 Astro 빌드 후 GitHub Pages에 배포하는 워크플로우입니다.

주요 단계:
1. 코드 체크아웃
2. Node.js 22 환경 설정 (Astro 6 요구사항)
3. pnpm 의존성 설치
4. `astro check && astro build` 실행
5. `dist/` 폴더를 GitHub Pages에 배포

---

## 서브 프로젝트 저장소 표준 구조

서브 프로젝트는 각각 독립된 저장소로 관리됩니다. 아래는 프레임워크별 표준 구조입니다.

### Astro 기반 서브 프로젝트

```
{repo-name}/                           # 서브 프로젝트 저장소 루트
│
├── src/
│   ├── layouts/
│   ├── pages/
│   └── components/
│
├── public/
├── astro.config.mjs                   # base: '/{repo-name}' 설정 필수
├── package.json
│
└── .github/
    └── workflows/
        └── deploy.yml                 # basePath 적용된 배포 워크플로우
```

`astro.config.mjs`의 핵심 설정:
```
base: '/{repo-name}'
output: 'static'
```

### Static HTML + Tailwind 기반 서브 프로젝트

```
{repo-name}/
│
├── index.html                         # 메인 HTML 파일
├── styles/
│   └── main.css                       # Tailwind CSS 출력 파일
├── scripts/
│   └── main.js                        # 선택적 JavaScript
│
├── package.json                       # Tailwind CLI 및 빌드 스크립트
└── .github/
    └── workflows/
        └── deploy.yml
```

Tailwind 빌드 시 별도의 basePath 설정은 필요 없으나, HTML 내 상대 경로 사용에 주의합니다.

### Next.js (Static Export) 기반 서브 프로젝트

```
{repo-name}/
│
├── app/                               # Next.js App Router 구조
│   ├── layout.tsx
│   └── page.tsx
├── public/
│
├── next.config.js                     # basePath 및 output 설정 필수
├── package.json
│
└── .github/
    └── workflows/
        └── deploy.yml
```

`next.config.js`의 핵심 설정:
```
basePath: '/{repo-name}'
output: 'export'
```

### React + Vite 기반 서브 프로젝트

```
{repo-name}/
│
├── src/
│   ├── App.tsx
│   └── main.tsx
├── public/
│
├── vite.config.ts                     # base 설정 필수 (후행 슬래시 포함)
├── package.json
│
└── .github/
    └── workflows/
        └── deploy.yml
```

`vite.config.ts`의 핵심 설정:
```
base: '/{repo-name}/'    // 후행 슬래시 필수
```

---

## GitHub Actions 배포 워크플로우 구조

모든 프로젝트(메인 허브 및 서브 프로젝트)는 동일한 패턴의 GitHub Actions 워크플로우를 사용합니다.

```
.github/workflows/deploy.yml

트리거: main 브랜치 push 이벤트
권한: contents: read, pages: write, id-token: write
환경: github-pages

단계:
  1. actions/checkout@v4
  2. actions/setup-node@v4 (Node.js 20, pnpm 캐시)
  3. pnpm install
  4. pnpm build (프레임워크별 빌드 명령)
  5. actions/upload-pages-artifact (빌드 결과물 업로드)
  6. actions/deploy-pages (GitHub Pages 배포)
```

---

## 저장소 간 관계

```
GitHub 계정: elymas
│
├── github-pages (특수 저장소)
│   └── 배포 URL: elymas.github.io
│
├── blog (일반 저장소)
│   └── 배포 URL: elymas.github.io/blog
│
├── learn-react (일반 저장소)
│   └── 배포 URL: elymas.github.io/learn-react
│
└── my-service (일반 저장소)
    └── 배포 URL: elymas.github.io/my-service
```

각 저장소는 완전히 독립적으로 빌드되고 배포됩니다. 메인 허브의 배포가 서브 프로젝트에 영향을 주지 않으며, 반대도 마찬가지입니다.

---

## basePath 설정 원칙

GitHub Pages에서 `elymas.github.io/{repo-name}` 경로에 배포할 때 반드시 지켜야 할 규칙입니다.

1. **저장소명과 basePath는 반드시 일치해야 합니다.**
   - 저장소명: `learn-react`
   - basePath: `/learn-react`

2. **메인 허브(`github-pages` 저장소)는 basePath 설정이 불필요합니다.**
   - `elymas.github.io` (루트 도메인)에 직접 배포되기 때문입니다.

3. **Vite 기반 프로젝트는 후행 슬래시가 필수입니다.**
   - 올바른 예: `base: '/learn-react/'`
   - 잘못된 예: `base: '/learn-react'`

4. **이미지, 폰트 등 정적 자산 경로도 basePath를 고려해야 합니다.**
   - 프레임워크의 내장 이미지 컴포넌트 사용 권장 (상대 경로 자동 처리)
