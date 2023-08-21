# 04장 변수

## 4.1 변수랑 무엇인가? 왜 필요한가?

> 프로그래밍은 input 을 받아 처리하고 output 을 하는게 전부이다.
> 처리하는 과정에서 데이터를 관리하기 위한 핵심 개념이다.

**변수명은 첫아이 이름을 짓듯이 심사숙고하게 지어야한다.**

## 4.2 식별자

> 식별자는 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 말한다.
> 식별자는 값이 아닌 메모리주소를 기억하여 호출 시 메모리주소를 통해 값을 가져온다.
>
> - `변수`뿐만 아닌 `함수`, `클레스` 등 모두 식별자다.

## 4.3 변수 선언

> JavaScript 에서 변수선언은 `var`, `let`, `const` 키워드를 통해 선언할 수 있다

- var 키워드로 변수를 선언하면 global 객체에 들어간다.
- 아무런 키워드를 붙이지 않고 변수를 선언하면 var 로 인식하여 선언된다.

  ```js
  var a = 1;
  b = 2;
  let c = 3;
  const d = 4;

  global.a; // 1
  global.b; // 2
  global.c; // undefined
  global.d; // undefined
  ```

## 4.4 변수 선언의 실행 시점과 변수 호이스팅

> JS 실행 컨텍스트는 코드 평가 => 코드 실행순서이다.
> 코드 평가 단계에서 `var`, `let`, `function`, `function*`, `class` 키워드로 선언된 식별자가 호이스팅된다.

## 4.6 값의 재할당

JS 는 값의 재할당이 이뤄질 때 변수가 참조하고 있는 메모리위치의 값을 바꾸는 형태가 아닌 다른 공간을 사용하여 재할당한다.

```js
let a = 1; // 0X00000001
a = 2; // 0X00000002
```

## 4.7 식별자 네이밍 규칙

> JS 는 일반적으로 카멜케이스를 가장 많이 사용하여 변수를 선언한다.

JS 에서 사용하는 네이밍 컨벤션은 아래와 같다.

- camelCase

  - `변수`, `함수`, `메서드` 등에서 사용

  ```js
  let chapter = 4;

  function sum(a, b) {
    return a + b;
  }

  const util = {
    name: 'lsh',

    getName() {
      return this.name;
    },
  };
  ```

- UPPER_SNAKE_CASE

  - `상수`에서 사용

  ```js
  const NAME = 'lsh';

  const USER = {
    LSH: '이석호',
  };
  ```

- PascalCase

  - `class`, `enum`, `decorator` 에서 사용

  ```ts
  class User {
    constructor() {}
  }

  // enum 은 아직은 TypeScript 에서만 지원한다.
  enum Book {
    Name = '모던 자바스크립트 딥다이브',
  }

  // decorator 는 아직은 TypeScript 에서만 지원한다.
  // TS 공식문서에서는 카멜케이스를 권장한다.
  // Angular 그리고 Angular 의 영향을 받은 Nestjs 는 파스칼케이스를 사용한다.
  function Readonly(writable) {
    return function (target, decoratedPropertyName) {
      return {
        writable: !writable,
      };
    };
  }
  ```
