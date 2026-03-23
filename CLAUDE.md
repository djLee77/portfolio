# Portfolio Web App — Project Intelligence

## Project Overview

동적 애니메이션과 미려한 인터페이스를 갖춘 개인 포트폴리오 웹사이트입니다. Bubble.io나 Toss와 같은 직관적이고 역동적인 마이크로 애니메이션, 세련된 타이포그래피, 모던한 디자인 시스템(Glassmorphism 등)을 지향해야 합니다.

## AI Collaboration Workflow (Claude vs Gemini)

**Claude Code = 코드를 만드는 개발자 ("손", 실행) | Gemini = 방향을 잡는 시니어 아키텍트 ("머리", 설계)**

### 🔴 Claude Code (본인, 실행 역할)
- **Do**: 실제 파일 생성, 컴포넌트 코드 작성, 리팩토링, CSS 스타일 세밀 조정, 버그 수정 및 워크페이스 파일 관리.
- **Don't**: 아키텍처 큰 그림 제안, UX/UI 큰 방향성 임의 결정.

### 🔵 Gemini (설계 및 지시 역할)
- **Do**: UI/UX 설계 방향 제시, 주요 인터랙션 기획, 문제 발생 시 논리적 디버깅 및 체크리스트 작성.
- **Don't**: 코드 직접 작성 및 파일 손상.

### 🔥 협업 3원칙
1. **설계 → 구현 분리**: 언제나 Gemini(기획/설계) → Claude(구현/수정) 순서 준수.
2. **코드는 Claude만**: 프로젝트 구조 손상 방지. 제가 터미널을 다룹니다.
3. **문제 풀이는 Gemini**: 막힌 버그나 복잡한 애니메이션 충돌 시, 저는 로그만 제공하고 해결 전략은 Gemini에게 요청.

## ECC Integration

- `.claude/agents/`: 역할을 맡은 서브 에이전트
- `.claude/commands/`: 슬래시 커맨드 (예: `/plan`, `/tdd`, `/code-review`, `/refactor-clean`)
- `.agents/skills/`: 코딩/보안 패턴 및 워크플로우

## Coding Standards
- **Aesthetics**: 디자인 일관성과 미려함을 극도로 우선시합니다. (기본 색상 금지, 현대적 산세리프 폰트 위주)
- **UI Frameworks**: 바닐라 CSS 우선, Tailwind가 필요할 경우 최신 버전을 명시하여 사용합니다.
- TypeScript를 기본으로 하며, 컴포넌트는 함수형(React 등 선택 시)을 지향합니다.
- TDD 기반의 기능 추가를 고려합니다.
