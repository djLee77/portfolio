# 🔄 3D Text Flip & Greeting Transition Plan

Claude Code, 사용자의 최신 피드백에 따라 `ThinkSection.tsx`에 **"3D 텍스트 뒤집기(Flip)"** 기믹을 추가해야 합니다.
모든 렌더링(stagger 팝업 -> 우측 15vw 시프트 -> 캐릭터 등장)이 진행되는 와중 가장 클라이맥스인 지점에 도달할 때, 최초의 4줄 철학 텍스트가 휙 뒤집히면서 본인 소개 인사말로 완전히 전환되는 소름 돋는 연출을 만드세요.

## 🛠️ 구현 지시사항

1. **내부 컴포넌트 상태 통제 (`useState`, `useEffect`)**:
   - `ThinkSection` 내부에 `const [isFlipped, setIsFlipped] = useState(false);`를 선언하세요.
   - `useEffect`로 컴포넌트 마운트 직후 타이머를 걸어, **정확히 1.5초 뒤**(텍스트 시프트와 캐릭터 등장이 절정에 달할 때)에 `setIsFlipped(true)`가 실행되도록 만드세요. `isFlipped` 상태에 따라 텍스트 구역의 화면을 교환할 것입니다.

2. **`AnimatePresence`를 활용한 3D 뒤집기(Flip) 타이밍**:
   - 텍스트들이 담겨 있던 기존 `<motion.div variants={containerVariants} ...>` 래퍼의 상위를 `<AnimatePresence mode="wait">`로 완전히 감싸줍니다.

   **[상태 A: `!isFlipped`일 때] (오리지널 4줄 텍스트)**:
   - `<motion.div key="intro" exit={{ rotateX: 90, opacity: 0, transition: { duration: 0.3 } }}>` 박스 안에 기존 4줄 텍스트 `variants` 애니메이션 구조를 그대로 두세요. (`isFlipped`가 true가 되면 퇴장하며 눕방하듯 사라집니다)

   **[상태 B: `isFlipped`일 때] (인사말 텍스트 등장)**:
   - `<motion.div key="greeting" initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ type: 'spring', damping: 14, stiffness: 60 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>`
   - 위 박스를 생성하고 안에 두 줄짜리 타이포그래피(기존 속성들 동일하게 계승)를 배치합니다.
     - 1번째 줄 텍스트: "안녕하세요," (`font-size: clamp(3.5rem, 9vw, 8rem)`, 폰트는 기존과 100% 동일하게)
     - 2번째 줄 텍스트: "주니어 개발자 이대준입니다." (`font-size: clamp(2rem, 5.5vw, 5rem)`, 폰트는 기존과 100% 동일하게)

3. **3D 원근감(Perspective) 주입**:
   - `AnimatePresence`를 감싸는 부모 `div`(width `fit-content`가 걸린 motion.div) 쪽에 CSS `perspective: 1200px;`를 주입하세요. 프레이머 모션의 `rotateX`가 완벽한 앞뒤 왜곡 3D 형태로 돌아가 물리적인 간판이 뒤집어지는 듯한 착각을 줍니다.

위의 조건에 맞춰 `ThinkSection.tsx`에 생명을 불어넣고 코드를 갈아 끼워 주세요!
