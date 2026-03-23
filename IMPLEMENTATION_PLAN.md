# Portfolio Frontend Implementation Plan

이 문서는 개발 에이전트(Claude Code 등)가 읽고 순차적으로 코드를 구현하기 위한 명세서입니다. 
TDD 기반, DRY 원칙, 컴포넌트 단위의 렌더링 최적화를 준수하며 아래 단계를 실행하세요.

---

## 🎯 설계 맥락 (Context)
*   **Tech Stack**: Vite + React(TypeScript), `framer-motion`, `lucide-react`, `tailwindcss` (or Vanilla CSS)
*   **Theme**: Deep Space & Glassmorphism
*   **UI Assets**: `public/bg.png` (우주 성운), `public/glass_shape.png` (유리 모형)
*   **Global CSS (`src/index.css`)**: 이미 Dark mode, 폰트(Outfit/Space Grotesk), `.glass-panel` 속성이 적용되어 있음. 해당 클래스를 적극 활용할 것.

---

## 🏗️ Phase 1: 아키텍처 및 폴더 구조 세팅
**Goal**: 메인 뷰 컴포넌트들을 담을 디렉토리를 생성하고 빈 껍데기를 세팅합니다.

### 태스크 리스트
- [ ] `src/components/` 디렉토리 확립.
- [ ] 아래 5개의 기본 함수형 컴포넌트(`.tsx`) 생성 (현재는 `div` 리턴만 하는 임시본).
  - `src/components/ParallaxBackground.tsx`
  - `src/components/HeroSection.tsx`
  - `src/components/AboutSection.tsx`
  - `src/components/ProjectGallery.tsx`
  - `src/components/ContactSection.tsx`
- [ ] `src/App.tsx`를 수정하여 위 컴포넌트 5개를 병렬로 렌더링하고 `height: 500vh` 수준의 스크롤 컨테이너를 구성.

---

## 🚀 Phase 2: 인트로 화면 및 배경 패럴랙스 연동 
**Goal**: 유저의 스크롤 `scrollYProgress`에 반응하여 배경 이미지와 메인 타이포그래피 모션을 적용.

### `ParallaxBackground.tsx`
- [ ] `framer-motion`의 `useTransform`을 사용하여 최하단 레이어(`z-index: -1`)에 `public/bg.png` 전체화면 배치.
- [ ] `public/glass_shape.png`를 상단 우측에 배치하고 스크롤 시 위로 빠르게 상승(`y` 값 마이너스로 트랜스폼)하며 회전(`rotate`) 효과 부여.

### `HeroSection.tsx`
- [ ] "CREATIVE DEVELOPER"를 `h1` 태그로 거대하게 표기. (Space Grotesk 폰트)
- [ ] 아래로 가는 화살표(Lucide `ArrowDown`)를 넣고 무한 바운스(`repeat: Infinity`) 애니메이션 추가.
- [ ] 스크롤 시 `opacity`가 0으로 사라지면서, 블러 처리 처리(`filter: blur()`).

---

## ✨ Phase 3: 슬라이드 인 프로필 섹션 (About)
**Goal**: 화면 뷰포트에 도달했을 때 미끄러져 등장하는 프로필.

### `AboutSection.tsx`
- [ ] 뷰포트 시작 높이(`20% ~ 45% vh` 부근)에 도달하면 `opacity` 변화 및 `x`축 이동 애니메이션(`initial={{ x: 100 }}` -> `animate={{ x: 0 }}`)
- [ ] `.glass-panel` 클래스를 적용한 카드 안에 본인의 개발 철학과 Tech Stack(React, AI 등) 네온빛 태그 렌더링.

---

## 💫 Phase 4: 가로 스크롤 프로젝트 갤러리 (Sticky Horizontal Scrolling)
**Goal**: 화면이 세로로 스크롤되는 도중 특정 컴포넌트에서 전체가 화면에 멈추고(`position: sticky`) 가로로 슬라이딩.

### `ProjectGallery.tsx`
- [ ] **가장 까다로운 구현 포인트**: 부모 컨테이너 높이를 넉넉히(예: `300vh`) 잡고, 내부 래퍼를 `position: sticky; top: 0;`으로 고정.
- [ ] 컨테이너 `ref` 기준 `scrollYProgress` 값을 `useTransform`으로 `[0, 1]`에서 오른쪽-왼쪽 이동 거리 `["0%", "-66%"]` (카드 갯수 비례)로 맵핑.
- [ ] 갤러리 카드 3장 더미 데이터 렌더링 (Title: Project Alpha, Beta, Gamma 등). 각각에 `.glass-panel` 효과 부여.

---

## 🌠 Phase 5: 컨택트 섹션 마무리 트랜지션
**Goal**: 스크롤이 끝나는 `80% ~ 100% vh` 구간의 이스터에그 및 소셜 액션.

### `ContactSection.tsx`
- [ ] 화면 밑바닥에 도착할 때 등장. (단순 fade-in / upward motion)
- [ ] `lucide-react` 아이콘(Mail, Github, Linkedin 등 더미 대체) 배치 및 마우스 호버(`whileHover`) 시 확대 + 네온 글로우 섀도우 효과 부여.

### 테스트/검증 리스트
- [ ] `npm run dev` 시 타입스크립트 에러나 브라우저 콘솔 에러가 없는가?
- [ ] 가로 스크롤이 버벅임 없이 자연스럽게 끝까지 넘어가는가?
- [ ] 최상단 우주 배경 에셋이 깨지거나 가로 너비(100vw)를 벗어나 스크롤바가 생기지 않는가? (`overflow-x: hidden` 확인)
