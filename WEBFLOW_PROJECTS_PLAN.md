# 💻 Webflow-style Sticky Projects Plan (BuildSection)

Claude Code, 사용자의 최신 피드백에 따라 `BuildSection.tsx` (프로젝트 소개 영역)를 낡은 물리적 스태킹 방식에서 벗어나, Webflow Freelancer 페이지 양식과 같은 최고급 **'Sticky Sidebar + Dynamic Content Swap'** 아키텍처로 탈바꿈시켜야 합니다.

## 📐 핵심 레이아웃 구조 (좌우 5:5 텐션)
- **전체 컨테이너**: 화면을 좌/우 5:5 비율로 쪼개는 뼈대를 설정합니다.
- **좌측 (스크롤 구역)**: 3개의 프로젝트 설명글이 각각 `100vh` 높이를 가지며 위아래로 쌓여 있습니다. (총 300vh 스크롤 길이 발생)
- **우측 (초고정 구역)**: `position: sticky; top: 0; height: 100vh;`로 영구 고정된 채 유저를 따라다니며, 정중앙에 "거대하고 럭셔리한 뷰어 카드"를 하나 띄워 둡니다.

## 🛠️ 세부 구현 지시사항

### 1. 스크롤 진척도 기반 활성 인덱스 산출 (`activeIndex`)
- `BuildSection`의 최상단 래퍼에 `useScroll` (framer-motion)을 걸어 `scrollYProgress`를 뽑아냅니다.
- `useMotionValueEvent`를 통해 스크롤이 내려감에 따라 현재 어떤 프로젝트를 읽고 있는지 판별하세요.
  ```ts
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });
  ```

### 2. 좌측 스크롤 반응형 텍스트 
- 각 `100vh` 높이 컨테이너 중앙에 "프로젝트명(Title)", "사용 기술(Tech)", "설명(Description)"을 크게 배치합니다.
- 현재 `activeIndex`와 자신의 `index`가 일치할 때만 텍스트의 불투명도(opacity)가 1이 되고, 아닐 때는 0.2 정도로 흐려지게 만들어 읽는 위치에 동적으로 시선이 고정되게 하세요.

### 3. 우측 다이내믹 뷰어 카드 (가장 중요)
- 우측 Sticky 컨테이너 정중앙 부근에 럭셔리한 단일 `<motion.div>`(뷰어)를 배치하세요. (`width: 80%`, `height: 60vh`, `border-radius: 20px` 수준) 
- 이 카드 내부를 `<AnimatePresence mode="wait">`로 감싸고, `activeIndex`를 key로 가지는 자식 컴포넌트를 랜더링합니다.
- **치환 애니메이션**:
  - `initial={{ opacity: 0, y: 30 }}` (아래에서부터 올라옴)
  - `animate={{ opacity: 1, y: 0 }}`
  - `exit={{ opacity: 0, y: -30 }}` (위로 기어코 올라가며 사라짐)
  - 스프링 애니메이션 텐션(`type: 'spring', damping: 15`)을 적극 활용해서 카드의 알맹이가 착, 착! 하고 기계적으로 교체되는 위트 있는 모션을 추가하세요. (Mockup 이미지 공간 또는 시각적 블록 활용)

기존 프로젝트 배열 3개(Cloud IDEA, 리뷰 봇, Web3) 데이터를 그대로 사용하여 위 설계대로 `BuildSection.tsx`를 완벽히 뜯어고쳐 완성하세요!
