# 20장 strict-mode

## 20.1 strict mode 란

> strict mode 란 js 의 문법적으로는 이상이 없지만 실수를 줄여줄 수 있는 모드이다.
> strict mode 도 있지만 좀 더 정확한 정적 검사를 위해서는 ESlint 같은 linter 를 좀 더 권장한다.

## 20.2 strict mode 적용

```js
'use strict';

function foo() {}
```

위 코드처럼 `use strict` 를 스코프 최상단에 적어주면 된다.

- use strict 의 적용 범위는 자신부터 하위 스코프까지이다.
- use strict 를 스코프 최상단에 적어주지 않으면 동작하지 않는다.

## 20.5 strict mode 가 발생시키는 에러

- 암묵적 전역변수
- 변수, 함수 매개변수 삭제
- 매개변수 이름의 중복
- with 문 사용
