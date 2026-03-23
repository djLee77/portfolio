# 🔧 Peek-a-boo Image Size & Offset Fix Plan

Claude Code, `ThinkSection.tsx`의 가상 벽(Virtual Masking Window) 기법의 뼈대는 훌륭하나, 이미지의 스케일과 이동 반경 수치가 너무 커서 시각적인 마법이 깨지는 상태(잘린 박스 테두리 노출, 얼굴 화면 이탈)입니다. 

`ThinkSection.tsx` 파일 내부에 있는 `<motion.img src="/character.png">` 부분의 설정값들을 아래와 같이 정밀하게 재수정하세요.

## 1. 이미지 크기 대폭 축소 (화면 이탈 방지)
- `style` 객체 내부의 속성을 수정하세요.
- **AS-IS**: `height: '75vh'`
- **TO-BE**: `height: '45vh'`

## 2. 튀어나오는 거리 및 각도 축소 (오른쪽 잘린 선 숨기기)
- 몸 전체가 나오는 것이 아니라, 오른쪽 몸통 절반은 여전히 텍스트(벽) 뒤에 숨겨두어 크롭된 직선형 테두리를 가려야만 합니다.
- **AS-IS**: `animate={{ x: '-5%', rotate: -15, opacity: 1 }}`
- **TO-BE**: `animate={{ x: '35%', rotate: -5, opacity: 1 }}`
  *(x를 35%로 두어 여전히 이미지의 우측 일부분이 오른쪽 마스크 구역을 빠져나가지 못하게 묶어둡니다)*

## 3. 하단부 땅속으로 묻기 (하단 잘린 선 숨기기)
- 이미지 밑동의 잘린 선이 허공에 뜨지 않도록 마스크 창문의 하단 심연으로 더 밀어 넣습니다.
- **AS-IS**: `bottom: '18vh'`
- **TO-BE**: `bottom: '10vh'`
  *(마스크 최하단이 화면 밖 -20vh이므로, bottom 10vh면 실제 화면 끝보다 더 내려가서 크롭선이 완벽히 가려집니다)*
