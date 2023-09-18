# 20장 strict-mode

### 1. strict mode란?

- 자바스크립트 언어의 문법을 좀 더 엄격히 적용한 모드
- 오류를 발생시킬 가능성이 높거나 문제를 일으킬 수 있는 코드에 대해 명시적 에러를 발생시킨다.
- ESLint 등의 린트 도구가 strict mode와 유사한 효과를 내므로 strict mode보다 린트 도구 사용을 권한다.

### 2. strict mode의 적용

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `'use strict';`를 추가한다.

- 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.
- 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수(내부 함수)에 strict mode가 적용된다.

```js
// 'use strict';
// 전역의 선두

function foo() {
  // 'use strict';
  // 함수 몸체의 선두
  x = 10;
  ("use strict");
}

foo();
```

### 3. 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다.
- strict mode인 스크립트와 non-strict mode인 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다.
- 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문에 전역에서 사용하지 말자.
- 전역에 사용하려면 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

### 4. 함수 단위로 strict mode를 적용하는 것도 피하자

사용을 피해야 하는 이유

1. 어떤 함수는 strict mode를 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않음
2. 모든 함수에 일일이 strict mode를 적용하는 것은 번거로움
3. 함수가 참조할 외부 컨텍스트에 strict mode를 적용하지 않으면 문제가 발생할 수 있음

### 5. strict mode가 발생시키는 에러

strict mode를 적용했을 때 에러가 발생하는 사례

#### 5.1 암묵적 전역

- 선언하지 않은 변수를 사용하면 ReferenceError가 발생한다.

#### 5.2 변수, 함수, 매개변수의 삭제

- delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

#### 5.3 매개변수 이름의 중복

- 중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

#### 5.4 with 문의 사용

- with 문을 사용하면 SyntaxError가 발생한다.
- with 문을 사용하면 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지므로 사용하지 않는 것이 좋다.

### 6. strict mode 적용에 의한 변화

#### 6.1 일반 함수의 this

- strict mode에서 함수를 일반 함수로 호출하면 this에 undefined가 바인딩된다.
- 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.

#### 6.2 arguments 객체

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```js
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
