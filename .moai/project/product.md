# GitHub Pages Hosting Hub - 제품 문서

## 프로젝트 개요

**프로젝트명**: GitHub Pages Hosting Hub
**GitHub 사용자명**: elymas
**메인 허브 URL**: https://elymas.github.io
**배포 상태**: Live at https://elymas.github.io

GitHub Pages Hosting Hub는 단일 GitHub 계정에서 여러 개의 독립적인 웹사이트를 체계적으로 관리하고 배포하기 위한 다중 저장소 정적 사이트 허브 시스템입니다. Astro 기반의 메인 허브가 모든 서브 프로젝트를 연결하는 게이트웨이 역할을 수행하며, 각 서브 프로젝트는 독립된 저장소로 관리됩니다.

---

## 대상 사용자

- 개인 포트폴리오와 여러 프로젝트를 동시에 관리하려는 개발자
- 블로그, 문서 사이트, 랜딩 페이지 등 다양한 형태의 콘텐츠를 GitHub Pages로 호스팅하려는 사용자
- 무료 정적 호스팅 인프라를 최대한 활용하고자 하는 개인 및 소규모 팀
- 프레임워크 선택의 유연성을 원하는 프론트엔드 개발자

---

## 핵심 기능

### 1. 허브 네비게이션 (Hub Navigation)

메인 허브(`elymas.github.io`)는 모든 서브 프로젝트로 연결되는 중앙 포털 역할을 합니다.

- 포트폴리오 스타일의 프로젝트 갤러리 제공
- 각 서브 프로젝트로의 명확한 진입점 제공
- 빠른 로딩과 깔끔한 UI로 방문자 경험 최적화
- Astro의 정적 사이트 생성(SSG)으로 최고 수준의 성능 구현

### 2. 다중 프레임워크 지원 (Multi-Framework Support)

프로젝트 유형에 따라 최적의 프레임워크를 선택할 수 있습니다.

| 프레임워크 | 적합한 사용 사례 |
|---|---|
| Astro | 메인 허브, 블로그, 문서 사이트 |
| Static HTML + Tailwind CSS | 랜딩 페이지, 간단한 소개 페이지 |
| Next.js (Static Export) | 복잡한 웹 앱, 대시보드 |
| React + Vite | 인터랙티브 도구, 데이터 시각화 |

### 3. 템플릿 시스템 (Template System)

반복적인 설정 작업을 최소화하는 프로젝트 템플릿을 제공합니다.

- 교육용 원페이지 템플릿 (초기 구현 대상)
- 개인 블로그 템플릿
- 문서 사이트 템플릿
- 서비스 랜딩 페이지 템플릿
- 포트폴리오 사이트 템플릿

### 4. basePath 자동 설정 (basePath Auto-Configuration)

GitHub Pages의 서브 경로 배포 구조에 맞게 각 프레임워크의 basePath를 자동으로 설정합니다.

- **Astro**: `astro.config.mjs`에 `base: '/repo-name'` 자동 적용
- **Next.js**: `next.config.js`에 `basePath: '/repo-name'` + `output: 'export'` 자동 적용
- **Vite**: `vite.config.js`에 `base: '/repo-name/'` (후행 슬래시 포함) 자동 적용
- 저장소 이름과 basePath의 일관성 보장

### 5. GitHub Actions CI/CD 자동화

코드 푸시 시 자동으로 빌드하고 배포하는 워크플로우를 제공합니다.

- 메인 허브와 서브 프로젝트 각각 독립적인 배포 파이프라인
- `gh-pages` 브랜치 방식 대신 GitHub Actions 직접 배포 방식 사용
- Node.js 22 기반의 빌드 환경 (Astro 6 요구사항)
- 빌드 실패 시 자동 알림 및 롤백 지원

---

## 사용 사례

### 1. 개인 블로그

Astro 기반의 서브 프로젝트로 마크다운 기반 블로그를 운영합니다.
- URL 예시: `https://elymas.github.io/blog`
- Astro의 컨텐츠 컬렉션 기능 활용
- RSS 피드 자동 생성

### 2. 문서 사이트

라이브러리나 프로젝트의 공식 문서를 GitHub Pages에 무료로 호스팅합니다.
- URL 예시: `https://elymas.github.io/my-library-docs`
- Astro 또는 Nextra 기반 문서 프레임워크 활용
- 검색 기능 및 버전 관리 지원

### 3. 서비스 랜딩 페이지

제품이나 서비스를 소개하는 마케팅 페이지를 빠르게 배포합니다.
- URL 예시: `https://elymas.github.io/my-service`
- Static HTML + Tailwind CSS로 빠른 로딩 구현
- 최소한의 의존성으로 유지보수 부담 최소화

### 4. 교육용 원페이지

기술 개념, 학습 자료, 튜토리얼 등을 단일 페이지에 담은 교육 콘텐츠를 배포합니다.
- URL 예시: `https://elymas.github.io/learn-react`
- 스크롤 기반의 단계적 학습 경험 제공
- 코드 예제, 다이어그램, 인터랙티브 요소 포함

### 5. 포트폴리오

개발자 포트폴리오를 메인 허브로 구성하고, 각 프로젝트를 서브 경로로 연결합니다.
- 메인 URL: `https://elymas.github.io`
- 모든 작업물을 하나의 도메인 아래 체계적으로 관리
- 방문자가 자연스럽게 프로젝트를 탐색할 수 있는 구조

---

## 가치 제안

### 무료 인프라 최대 활용

GitHub Pages의 무료 호스팅을 활용하여 별도의 서버 비용 없이 다수의 웹사이트를 운영할 수 있습니다.

### 프레임워크 자유도

각 프로젝트의 특성에 맞는 최적의 프레임워크를 선택할 수 있어, 과도한 기술 스택 강요 없이 목적에 맞는 구현이 가능합니다.

### 체계적인 관리

여러 독립 저장소를 하나의 허브에서 통합 관리함으로써, 프로젝트가 늘어나도 일관된 구조를 유지합니다.

### 자동화된 배포

GitHub Actions를 통한 CI/CD 자동화로 코드 변경 시 별도의 배포 작업 없이 즉시 반영됩니다.

### 확장 가능한 아키텍처

새로운 서브 프로젝트를 추가할 때 기존 구조에 영향을 주지 않고 독립적으로 확장할 수 있습니다.

---

## 초기 구현 범위

첫 번째 구현 목표는 **교육용 원페이지 템플릿**입니다.

- 단일 HTML 페이지 또는 Astro 기반 구성
- basePath 설정이 적용된 GitHub Actions 배포 워크플로우 포함
- 이후 템플릿들의 기준이 되는 표준 구조 확립
