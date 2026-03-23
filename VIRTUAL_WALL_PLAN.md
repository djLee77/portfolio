# 🧱 Virtual Wall Peek-a-boo Plan (ThinkSection)

Claude Code, 사용자의 최신 뷰포트 피드백에 따라 `ThinkSection.tsx`의 까꿍(Peek-a-boo) 연출을 고품격 프론트엔드 마스킹 기법으로 전면 개조해야 합니다. 
현재처럼 화면 맨 왼쪽 끝에서 스르륵 들어오는 밋밋한 연출은 금지입니다.

**🔥 핵심 목표**: 글자 덩어리 영역에 딱 맞춘 '가상의 벽(마스킹 창구)'을 만들어, 캐릭터 이미지가 완전히 빈 공간에서 오는 게 아니라 **"글자의 뒷면(투명한 벽 뒤)"에서 몸을 비틀며 왼쪽으로 고개를 빼꼼 꺼내는** 입체 마스킹 연출을 조립하세요.

## 🛠️ 세부 구현 지시사항 (반드시 이 구조를 지킬 것)

1. **텍스트 딜레이 시프트 보존**:
   - "1.2초 후 글자 전체 덩어리가 우측(`x: '15vw'`)으로 비켜주는 팝업 모션" 랩핑은 그대로 유지합니다.

2. **텍스트 그룹 `fit-content` 타이트 랩핑 (벽의 기준점 만들기)**:
   - 시프트 되는 부모 `motion.div`에 `style={{ position: 'relative', width: 'fit-content' }}`를 반드시 추가하세요. 이로써 이 `div`의 가장 왼쪽 경계선이 정확히 글자 시작점(가상 벽 기준선)에 타이트하게 밀착됩니다.

3. **가상의 벽 창문(Virtual Masking Window) 뚫기**:
   - 위에서 만든 `width: 'fit-content'` 랩퍼 내부(즉, 실제 텍스트 배열이 들어있는 `motion.div`와 같은 형제 레벨)에 **마스킹용 빈 `div` 창문**을 하나 만드세요.
   - **이 마스크 창문의 CSS (핵심)**:
     ```css
     position: 'absolute';
     top: '-20vh'; bottom: '-20vh'; /* 세로 공간 넉넉히 */
     right: '98%'; /* ★텍스트 왼쪽 경계선에 거의 빈틈없이 밀착되는 창구★ */
     width: '55vw'; /* ★캐릭터가 등장할 수 있는 왼쪽 가시 구역 넓이★ */
     overflow: 'hidden'; /* ★★★가장 핵심: 이 창문 넓이 바깥쪽(오른쪽=텍스트 뒤)은 싹 둑 잘려나가 안보임!!★★★ */
     zIndex: 10;
     pointerEvents: 'none';
     ```

4. **캐릭터 마스킹 등장 모션 (`motion.img`)**:
   - 방금 만든 마스크 창문 `div` 안쪽에 `<motion.img src="/character.png">`를 배치하세요.
   - **initial 상태**: `initial={{ x: '90%', rotate: 18, opacity: 0 }}`
     - `x: '90%'`인 이유는 창문의 90% 우측(즉, 텍스트 뒤쪽)으로 밀려나 있어 `overflow: hidden` 창구 구역 바깥이므로 유저 눈에는 물리적으로 이미지가 잘려 보이지 않습니다. 완벽하게 텍스트 벽 뒤에 숨는 효과입니다!
   - **animate 상태**: `animate={{ x: '-5%', rotate: -15, opacity: 1 }}`
     - 시간: `transition={{ delay: 1.3, type: 'spring', damping: 13, stiffness: 65 }}`
     - 1.3초에 맞춰 왼쪽(창문 안쪽 가시구역)으로 스윽 하고 구겨진 몸을 펴며 튀어나옵니다. 이 순간 시각적으로는 **글자 뒤에서 캐릭터가 고개와 몸통을 빼꼼 꺼내는** 소름 돋는 연출이 시현됩니다.
   - **이미지 세부 CSS**:
     ```css
     position: 'absolute';
     bottom: '18vh'; /* 마스크 창문이 -20vh부터이므로 하단 땅바닥에 보정 안착 */
     right: '0';     /* ★마스크의 오른쪽(글자 왼쪽 선)에 딱 달라붙어 기준점 형성★ */
     height: '75vh'; 
     width: 'auto';
     objectFit: 'contain'; 
     objectPosition: 'bottom right'; 
     transformOrigin: 'bottom right';
     filter: 'drop-shadow(-15px 15px 25px rgba(0,0,0,0.18))';
     ```

자, 프론트엔드 장인 Claude Code, 이 고급 설계 구조대로 `ThinkSection.tsx`를 한 줄의 오류 없이 리팩토링하세요!
