# 🔠 Letter-by-Letter Flip & Layout Jump Fix Plan

Claude Code, 사용자 피드백에 따라 레이아웃 점프 버그를 해결하고 텍스트의 3D Flip 애니메이션을 "글자 단위(Letter-by-Letter)"의 고차원 모션으로 재구축합니다.

## 🛠️ 1. 폭 변동에 따른 캐릭터 Jitter 버그 픽스
- **원인**: 부모 컴포넌트(`motion.div`)에 `width: 'fit-content'`가 걸려 있어 텍스트 덩어리가 바뀔 때마다 전체 폭이 줄어들/늘어나서, 좌측 경계선 기준(`right: 100%`)으로 잡은 마스킹 윈도우가 심하게 점프합니다.
- **수정**: `width: 'fit-content'`를 완전히 제거하고 `width: '100%'`로 덮어씌워 틀을 고정하세요! (오른쪽으로 넘어가도 부모 section에 overflow: hidden이 있으니 안심하세요) 고정된 너비 덕분에 내부 텍스트가 몇 줄로 바뀌든 캐릭터가 튀어나오는 마스크 창문의 시작선이 더 이상 떨리지 않게 됩니다.

## 🛠️ 2. 한 글자씩(Letter) 순차적으로 변환되는 Stagger Flip 애니메이션
- 텍스트가 바뀔 때, 문장 전체가 뻣뻣하게 도는 대신 "한 글자씩 차례대로(staggerChildren)" X축 방향으로 눕히며 돌아가게 만드세요.

### A. Framer Variant 재작성
```tsx
const flipContainer = {
  hidden: {},
  // 글자가 앞에서부터 하나씩 0.04초 간격으로 도미노처럼 뒤집히며 나타남
  visible: { transition: { staggerChildren: 0.04 } }, 
  // 글자가 앞에서부터 하나씩 0.02초 간격으로 스르륵 누우며 사라짐
  exit: { transition: { staggerChildren: 0.02 } },
};

const flipLetter = {
  hidden: { opacity: 0, rotateX: -90, y: 15 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: 'spring', damping: 12, stiffness: 80 } },
  exit: { opacity: 0, rotateX: 90, transition: { duration: 0.2 } }, // 앞차기로 눕기
};
```

### B. 문자열 분해 유틸리티 추가
컴포넌트 바깥에 문자열을 한 글자씩 `<motion.span>`으로 맵핑하는 가벼운 헬퍼 함수를 추가하세요.
```tsx
const renderLetters = (text: string) => {
  return text.split('').map((char, index) => (
    <motion.span
      key={index}
      variants={flipLetter}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
    >
      {char}
    </motion.span>
  ));
};
```

### C. AnimatePresence 적용
기존의 `<motion.p>` 내부에 텍스트 문자열을 그냥 박지 말고, 방금 만든 `renderLetters(text)`로 감싸 호출하세요. 상태 A(기존 텍스트)와 상태 B(새 인사말 텍스트) 모두 `<motion.div variants={flipContainer} initial="hidden" animate="visible" exit="exit">` 로 포장하여 글자 단위 도미노 플립의 감동을 선사하세요.

위 설계를 바탕으로 `ThinkSection.tsx` 코드를 완벽하게 리팩토링하세요!
