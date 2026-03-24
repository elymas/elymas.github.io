# GitHub Pages Hosting Hub - 기술 문서

## 기본 언어

**TypeScript / JavaScript**

- 메인 허브 및 Astro/Next.js 기반 서브 프로젝트에 TypeScript 사용
- Static HTML 기반 프로젝트는 Vanilla JavaScript 사용
- `tsconfig.json`으로 엄격한 타입 검사 적용 권장

---

## 코어 프레임워크

### Astro (메인 허브)

**버전**: Astro 6.x (실제 사용 버전: ^6.0.8)

Astro는 메인 허브(`elymas.github.io`)의 핵심 프레임워크입니다.

**선택 이유**:
- 제로 자바스크립트 기본값으로 최고 수준의 성능
- 파일 기반 라우팅으로 간단한 페이지 구성
- 다양한 UI 프레임워크(React, Vue, Svelte 등) 통합 지원
- 정적 사이트 생성(SSG)에 최적화
- Markdown/MDX 네이티브 지원

**주요 설정 (`astro.config.mjs`)**:
- `output: 'static'` - 정적 출력 모드
- `vite.plugins: [@tailwindcss/vite()]` - Tailwind CSS v4 Vite 플러그인 방식 (NOT @astrojs/tailwind)
- `integrations: [sitemap()]` - @astrojs/sitemap 통합
- `site: 'https://elymas.github.io'` - 사이트 URL 설정
- 메인 허브는 `base` 옵션 불필요 (루트 도메인 배포)

---

## 프로젝트 유형별 지원 프레임워크

### 1. Astro - 허브, 블로그, 문서 사이트

**적합한 프로젝트**:
- 메인 허브 포트폴리오
- 개인 블로그 (마크다운 기반)
- 기술 문서 사이트
- 콘텐츠 중심의 정보 페이지

**basePath 설정**:
```
// astro.config.mjs (서브 프로젝트)
export default defineConfig({
  base: '/repo-name',
  output: 'static',
  integrations: [tailwind()],
})
```

**핵심 패키지**:
- `astro` - 핵심 프레임워크
- `@tailwindcss/vite` - Tailwind CSS v4 Vite 플러그인 (Astro 6 권장 방식)
- `@astrojs/mdx` - MDX 지원 (선택적)
- `@astrojs/sitemap` - 사이트맵 생성 (선택적)

---

### 2. Static HTML + Tailwind CSS - 랜딩 페이지, 단순 소개 페이지

**적합한 프로젝트**:
- 서비스/제품 랜딩 페이지
- 간단한 프로젝트 소개 페이지
- 교육용 원페이지 (초기 구현 대상)
- 이벤트 페이지

**basePath 고려사항**:
- 별도의 빌드 도구 basePath 설정 없음
- HTML 내 모든 경로는 상대 경로 또는 절대 경로(`/repo-name/...`) 사용
- 이미지 경로: `<img src="./images/photo.png">` (상대 경로 권장)

**핵심 패키지**:
- `tailwindcss` - CSS 유틸리티 프레임워크
- `@tailwindcss/cli` - Tailwind CSS CLI 빌드 도구
- `autoprefixer` - CSS 벤더 프리픽스 자동화

---

### 3. Next.js (Static Export) - 복잡한 웹 앱, 대시보드

**적합한 프로젝트**:
- 데이터 시각화 대시보드
- 인증이 필요한 클라이언트 사이드 앱
- 복잡한 상태 관리가 필요한 앱
- API Routes 없이 정적 배포가 가능한 풀스택 앱

**basePath 설정**:
```
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/repo-name',
  images: {
    unoptimized: true,  // GitHub Pages에서 이미지 최적화 비활성화 필수
  },
}
```

**중요 제약사항**:
- `output: 'export'` 필수 - GitHub Pages는 서버사이드 렌더링 불가
- `images.unoptimized: true` 필수 - Next.js 이미지 최적화 서버 없음
- API Routes 사용 불가 (서버리스 환경 불가)
- 동적 라우트 사용 시 `generateStaticParams` 구현 필수

**핵심 패키지**:
- `next` - React 풀스택 프레임워크
- `react`, `react-dom` - React 핵심 패키지
- `typescript` - TypeScript 지원

---

### 4. React + Vite - 인터랙티브 도구, 데이터 시각화

**적합한 프로젝트**:
- 인터랙티브 계산기나 도구
- 실시간 데이터 시각화 (차트, 그래프)
- 단일 페이지 애플리케이션(SPA)
- 게임이나 인터랙티브 데모

**basePath 설정**:
```
// vite.config.ts
export default defineConfig({
  base: '/repo-name/',  // 후행 슬래시 필수
  plugins: [react()],
})
```

**중요 제약사항**:
- `base` 값의 **후행 슬래시 필수** (`'/repo-name/'` - 없으면 자산 로딩 오류 발생)
- SPA 라우팅 시 `404.html` 처리 필요 (GitHub Pages의 SPA 라우팅 한계)

**핵심 패키지**:
- `vite` - 빌드 도구
- `@vitejs/plugin-react` - React 통합 플러그인
- `react`, `react-dom` - React 핵심 패키지

---

## 빌드 도구

### 패키지 매니저

**pnpm** (권장) 또는 **npm**

- pnpm 권장 이유: 디스크 공간 절약, 빠른 설치 속도, 엄격한 의존성 관리
- `pnpm-workspace.yaml`을 통한 모노레포 구성 가능 (선택적)
- GitHub Actions에서 pnpm 지원: `pnpm/action-setup@v4` 액션 사용

### GitHub Actions

모든 프로젝트의 CI/CD 파이프라인으로 GitHub Actions를 사용합니다.

**사용 이유**:
- GitHub Pages와 네이티브 통합
- 무료 공개 저장소 무제한 사용
- `actions/deploy-pages` 공식 액션으로 안정적인 배포
- 별도의 배포 서비스 불필요

**표준 워크플로우 구성**:
```yaml
# .github/workflows/deploy.yml 기본 구조
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/          # 또는 out/, build/ 등 프레임워크별 출력 폴더
      - uses: actions/deploy-pages@v4
```

---

## 주요 의존성

### 메인 허브 공통 의존성

| 패키지 | 버전 | 역할 |
|---|---|---|
| `astro` | ^6.0.8 | 메인 프레임워크 |
| `tailwindcss` | ^4.2.2 | CSS 유틸리티 (v4) |
| `@tailwindcss/vite` | (tailwindcss에 포함) | Astro용 Tailwind CSS v4 Vite 플러그인 |
| `@astrojs/sitemap` | ^3.7.1 | 사이트맵 생성 |
| `typescript` | ^6.0.2 | 타입 안전성 |

### Tailwind CSS v4 통합 방식

메인 허브는 **Tailwind CSS v4**를 사용합니다. v4는 `@astrojs/tailwind` 통합 대신 Vite 플러그인 방식을 사용합니다.

- **`@tailwindcss/vite`**: `astro.config.mjs`의 `vite.plugins` 배열에 직접 추가
- **CSS 파일**: `@import "tailwindcss";` 한 줄로 전체 유틸리티 임포트
- **설정 파일**: `tailwind.config.mjs` 불필요 (CSS 네이티브 변수 기반)

---

## 브랜드 디자인 시스템

### "float on" 브랜드 아이덴티티

메인 허브는 "float on" 브랜드 아이덴티티를 적용합니다.

**컬러 팔레트**:
- Primary (Charcoal Deep): #476a82 (500) ~ #2c3e50 (700) ~ #131c24 (900)
- Surface (Cream Float): #fafaf5 (50) ~ #f5f5dc (100, cream) ~ #2c3e50 (800, charcoal)
- Brand custom: `--color-cream: #f5f5dc`, `--color-charcoal: #2c3e50`

**타이포그래피**:
- 제목: Georgia 세리프 폰트 스택 (`Georgia, Cambria, Times New Roman, serif`), letter-spacing: -0.01em
- 본문: system-ui 산세리프 스택 (`system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif`)

**비주얼 요소**:
- 로고: Cloud SVG 아이콘 + "float on" 세리프 텍스트
- 히어로: Cloud 데코레이션, Cream/Charcoal 배경
- 배너: `public/banner.png` (OG/Twitter Card 메타 이미지)

### Tailwind CSS v4 커스텀 테마

`src/styles/global.css`에서 `@theme` 디렉티브로 브랜드 색상을 정의합니다:
- `@theme { --color-primary-*: ... }` - Charcoal Deep 팔레트
- `@theme { --color-surface-*: ... }` - Cream Float 팔레트
- `@theme { --color-cream: ...; --color-charcoal: ...; }` - 브랜드 전용 색상
- `@layer base { ... }` - 글로벌 폰트 스택 적용

---

## 개발 환경

### 시스템 요구사항

| 항목 | 버전 |
|---|---|
| Node.js | 22.x 이상 (Astro 6 요구사항) |
| pnpm | 9.x 이상 |
| Git | 2.x 이상 |

### 로컬 개발 실행

```bash
# 메인 허브 로컬 실행
pnpm dev    # http://localhost:4321 (Astro 기본 포트)

# 빌드 테스트
pnpm build
pnpm preview
```

### 환경 변수

GitHub Pages는 서버가 없으므로 환경 변수는 빌드 시점에만 사용 가능합니다.

- 빌드 시점 환경 변수: Astro의 경우 `import.meta.env.PUBLIC_*` 형식 사용
- 민감한 정보(API 키 등)는 클라이언트 번들에 포함하지 않도록 주의
- GitHub Actions의 `secrets`와 `vars`를 통해 빌드 시점 주입 가능

---

## 배포 설정

### GitHub Pages 설정

GitHub 저장소 설정에서 다음을 확인합니다.

1. **Settings > Pages > Source**: `GitHub Actions` 선택 (브랜치 배포 방식이 아닌 Actions 방식)
2. **메인 허브**: `github-pages` 저장소 (또는 `elymas.github.io` 저장소명)에서 설정
3. **서브 프로젝트**: 각 저장소에서 개별적으로 Pages 활성화

### 프레임워크별 빌드 출력 폴더

| 프레임워크 | 빌드 명령 | 출력 폴더 |
|---|---|---|
| Astro | `astro build` | `dist/` |
| Next.js (Static Export) | `next build` | `out/` |
| React + Vite | `vite build` | `dist/` |
| Static HTML + Tailwind | `tailwindcss -i ... -o ...` | 루트 또는 `dist/` |

---

## basePath 설정 요약

GitHub Pages 서브 경로 배포 시 각 프레임워크별 필수 설정입니다.

| 프레임워크 | 파일 | 설정 키 | 예시 값 | 후행 슬래시 |
|---|---|---|---|---|
| Astro | `astro.config.mjs` | `base` | `'/repo-name'` | 불필요 |
| Next.js | `next.config.js` | `basePath` | `'/repo-name'` | 불필요 |
| Vite | `vite.config.ts` | `base` | `'/repo-name/'` | **필수** |
| Static HTML | - | - | 상대 경로 사용 | - |

**공통 원칙**:
- 저장소명과 basePath 값은 반드시 동일해야 합니다.
- 메인 허브 저장소는 basePath 설정이 불필요합니다.
- Next.js는 `images.unoptimized: true` 및 `output: 'export'` 추가 필수입니다.
