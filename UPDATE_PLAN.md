# Portfolio Interactive Parallax Update Plan

개발 에이전트(Claude)는 아래 명세서의 파일 변경 내용을 정확히 수행하여 정적인 백그라운드를 "동적(Interactive)이고 창의적인" 3D 뎁스 모션으로 재설계합니다.

---

## 🎯 설계 변경 배경 (Context)
기존의 배경 이미지는 단순히 고정되어 정적인 우주 느낌만 줍니다. 우리는 "크리에이티브 포트폴리오"라는 컨셉에 맞추어 `framer-motion`의 적극적인 활용으로 유저 스크롤 시 각 컴포넌트가 각기 다른 속도로 반응하고(Parallax), 마우스의 이동 궤적이나 휠에 따라 회전(Rotate)하거나 움직이는 동적인 공간을 구축해야 합니다.

새로 추가된 에셋 (`public/` 디렉토리에 위치):
1. `creative_bg.png` : 어둡고 모던한 3D 디지털 워크스페이스 배경
2. `prism_brain.png` : 홀로그램 느낌의 떠다니는 기하학 프리즘 모형 (중앙 좌측 띄움용)
3. `art_shapes.png` : 네온 3D 구형/피라미드 파편 (하단 우측 띄움용)

---

## 🛠️ 태스크 리스트 (Implementation Steps)

### Step 1: `ParallaxBackground.tsx` 컴포넌트 동적 재설계
기존의 단순히 `background-image`로 넣어둔 정적 처리를 완전히 폐기하고, **3가지 층(Layer)**으로 나누어 스크롤 맵핑(`useTransform`)을 개별 부여하세요.

- [ ] `useScroll`을 불러와 현재 스크롤 `scrollYProgress` 값을 받아옵니다.
- [ ] **레이어 1 (Background)**:
  - 이미지: `/creative_bg.png`
  - Style: 가장 뒷단(`z-index: -1`), `position: fixed`, 뷰포트 크기로 꽉 채움(`object-fit: cover`).
  - Motion: 스크롤을 끝까지 내릴 때 Y축 위치가 `["0%", "15%"]`로 아주 천천히 반응하게 하여 거대한 배경의 깊이감을 생성(`y` 트랜스폼).
- [ ] **레이어 2 (Prism Brain - 전경 메인 입체물)**:
  - 이미지: `/prism_brain.png`
  - Style: 화면 중앙 왼쪽 편(`left: 10%`, `top: 15%`), 너비 `400px` 가량의 `absolute` 포지션, 블렌드 모드(`mix-blend-mode: screen` 등 적용 고려) 혹은 drop-shadow 적용.
  - Motion: 스크롤 진행에 따라 Y축이 아예 반대로(화면 위로) 빠르게 이탈하게 구성 (`["0%", "-150%"]`).
  - Motion 추가: 스크롤에 비례하여 스스로 지속 회전하도록 설정 (`rotate` 값을 `[0, -45]` 정도로 맵핑).
- [ ] **레이어 3 (Art Shapes - 전경 서브 입체물)**:
  - 이미지: `/art_shapes.png`
  - Style: 화면 우측 하단(`right: 5%`, `top: 50%`), 너비 `250px` 가량.
  - Motion: 얘는 매우 빠른 속도로 움직이도록 `y` 값을 `["0%", "-300%"]` 맵핑하고, 회전 (`rotate: [0, 90]`), 및 약간 확대(`scale: [1, 1.5]`)되는 강력한 패럴랙스를 만드세요.

### Step 2: `App.tsx` 연결 검증
- [ ] 위에서 수정한 `ParallaxBackground`가 Fixed 레이어로서 다른 뷰(`HeroSection`, `AboutSection`)에 방해되지 않고 가장 바닥에 깔려서 `scrollYProgress` 값을 넘겨받도록 확실히 프롭스(`props`)를 넘길 것.
- [ ] `overflow-x: hidden`이 적용되었는지 재검토하여 가로 스크롤바가 생기는 현상을 차단할 것.

---

## ✅ 최종 결과물 기대 요건 (QA)
코더(Claude) 구현 완료 후 터미널 창(`http://localhost:5173`)에서 마우스 스크롤을 굴렸을 때, 배경과 두 개의 오브젝트가 완전히 "다른 속도"와 "역방향"으로 돌면서 튀어 올라야 합니다. 정적인 사진처럼 보이는 것은 명백한 렌더 로직(Framer) 오작동으로 간주합니다.
