# Toss & Bubble Inspired Portfolio Plan

개발 에이전트(Claude Code)는 이 명세서를 읽고, 포트폴리오의 기존 에셋 의존성을 완전히 제거하세요. `public/` 디렉토리의 거대한 이미지 사용을 멈추고, 오직 **순수 CSS, Framer Motion, 그리고 거대한 타이포그래피**만으로 구동되는 **Toss/Apple 스타일의 명품 웹뷰**를 렌더링하세요.

---

## 🎨 1. Core Aesthetic (본질적 세련미)
*   **Color Palette**: 화면은 철저하게 `#f8f7f4`(Toss 고유의 웜그레이/오프화이트)와 `#1e293b`(슬레이트 블랙)를 바탕으로, 스크롤의 특정 구간에서만 배경색이 `#111`(다크 모드)로 `background-color` 자체가 트랜지션 되게 만드세요.
*   **Typography First**: 이미지 자리를 차지하던 모든 공간은 `fontSize: 8rem` 이상의 거대하고 두꺼운(`fontWeight: 800`) 텍스트가 대신합니다.
*   **No Image Rule**: 외부 이미지는 배제하며, 오직 텍스트, 반투명한 `div` 도형, 가독성 높은 아이콘(`lucide-react`)만 사용합니다.

---

## 📐 2. 컴포넌트별 "순수 코드" 모션 (Pure Code Interactions)

### 💡 Sector 1: `ThinkSection.tsx` (텍스트 마스킹 & 스크롤 Reveal)
*   **레퍼런스 포인트**: Toss 채용 페이지의 명언(Text Reveal) 효과.
*   **인터랙션 명세**:
    - 스크롤 시 화면 높이가 충분히 확보된 상태(`height: 300vh`)에서 텍스트 영역이 화면 중앙에 고정(`position: sticky`)됩니다.
    - 유저의 좌우명이나 철학이 담긴 문장 3~4줄이 거대하게 써 있습니다.
    - 초기엔 텍스트 투명도가 모두 `opacity: 0.1`로 흐리게 세팅되어 있다가, 유저가 스크롤을 내릴 때마다 **한 줄씩, 혹은 단어별로 딱- 딱- opacity가 `1`로 불을 켜듯 점등(Reveal)**되게 하세요. (`useTransform`을 여러 구간으로 분할하여 적용)

### 🛠️ Sector 2: `BuildSection.tsx` (카드 스태킹 UI - Card Stacking)
*   **레퍼런스 포인트**: Bubble.io 및 최신 애플 페이지의 쌓이는 스크롤 카드.
*   **인터랙션 명세**:
    - 프로젝트들을 보여줄 가로 `고정폭`, 세로 `유연한` 화이트 카드 컴포넌트(`border-radius: 30px`, 부드러운 `box-shadow`) 3개를 준비합니다.
    - 화면 전체를 스크롤 할 때, 카드 1이 뷰포트 최상단에 닿으면 멈춥니다(`sticky`).
    - 스크롤을 더 내리면 카드 2가 올라와 카드 1 위를 덮으며(살짝 겹치듯 겹쳐지며) 카드 1이 뒤로 수축하는 느낌(`scale: 0.95`, `opacity: 0.6` 축소)을 줍니다.
    - 카드 3 역시 동일하게 올라와 카드 2를 덮습니다. 오직 코드와 스크롤 맵핑만으로 매우 깔끔한 3단 카드 스태킹을 구현하세요.

### 🤝 Sector 3: `ConnectSection.tsx` (반전 다크모드 & 무한 마키 텍스트)
*   **레퍼런스 포인트**: 스크롤 하단의 극적인 테마 전환과 마키(Marquee).
*   **인터랙션 명세**:
    - 이 컴포넌트에 유저가 당도하는 스크롤 퍼센트에 도달하면, 전체 `body` 또는 해당 컨테이너 배경색이 순식간에 매트한 **블랙 모드**로 색상 밴딩 전환을 일으킵니다. (텍스트는 화이트로 반전)
    - 화면을 끝없이 흘러가는 거대한 무한 스크롤 텍스트 배너(Infinite Marquee: "LET'S BUILD TOGETHER • LET'S BUILD TOGETHER •")를 `framer-motion`의 `translateX: ['0%', '-100%'], repeat: Infinity`로 돌립니다.
    - 우측 하단에는 깔끔한 미니멀 이메일 폼(`input` 박스 1개 + 동그란 버튼)만 배치하여 재치(Witty)와 감각(Aesthetic)을 살립니다.

---

## ✅ 개발자(Claude) 필수 준수사항
1. 외부 사진 의존성을 모두 삭제하세요.
2. 텍스트의 크기(`rem`, `vw`), 여백(`padding`, `gap`), 그리고 깔끔한 토스(Toss)식 모서리 라운딩(`border-radius`) 깎음에 사활을 거세요. 디자인의 성공 여부는 디테일한 여백과 폰트 웨이트(두께) 조절에 있습니다.
