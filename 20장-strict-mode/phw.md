# 20장 strict-mode

- strict mode : JS 문법을 더 엄격히 적용해 명시적인 에러를 발생시킴
  - 전역 선두나 함수 몸체에 use strict; 추가
- ESLint 와 같은 린트 도구 : 코드 실행 전 정적 분석으로 잠재적 오류의 원인을 리포팅

- strict mode 에서 일반함수로써 함수 호출시 this 에 undefined 값 바인딩
