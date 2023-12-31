# 15장 let,-const-키워드와-블록-레벨-스코프

### 1. var 키워드로 선언한 변수의 문제점

#### 1.1 **변수 중복 선언 허용**

- var 키워드로 선언한 변수는 중복 선언이 가능하다.
- var 키워드로 변수 중복 선언 시 초기화문이 없으면 무시된다.
- 초기화 문이 있으면 var 키워드가 없는 것처럼, 즉 값을 재할당한 것처럼 동작한다.

#### 1.2 함수 레벨 스코프

- var 키워드로 선언한 변수는 함수의 코드 블록만을 지역 스코프로 인정한다.
- 함수가 아닌 곳에서 선언하면 모두 전역 변수가 된다. (ex. for, if 문 등의 코드 블록)
- 이는 전역 변수 남발의 가능성을 높여 의도치 않은 전역 변수 중복 선언을 발생시킨다.

#### 1.3 변수 호이스팅

- 변수 호이스팅이란 코드 실행 전에 변수 선언문을 최상단으로 끌어올린 것처럼 동작하는 자바스크립트의 특징을 말한다.
- ES6의 let이나 const 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 없다.
- let이나 const 키워드로 선언한 변수는 선언(정확히는 할당 시점) 전에 참조하면 참조 에러가 발생한다.
- 하지만 var 키워드는 선언과 동시에 undefined로 초기화되기 때문에 할당문 이전에 참조하더라도 에러를 발생시키지 않는다. 이는 프로그램의 흐름에 맞지 않을뿐더러 가독성을 떨어뜨리고 오류 발생의 확률을 높인다.

### 2. let 키워드

#### 2.1 변수 중복 선언 금지

- var 키워드는 이름이 동일한 변수를 중복 선언해도 에러가 발생하지 않는다.
- var 키워드로 동일한 이름의 변수를 선언만 한다면 무시되지만 값까지 할당했다면 먼저 선언된 변수에 새로운 값이 재할당되어 의도와 다르게 동작할 수 있다.
- **하지만 let 키워드로 이름이 동일한 변수를 중복 선언하면 이미 이전에 선언된 변수임을 알리는 문법 에러가 발생한다.**

#### 2.2 블록 레벨 스코프

- 함수의 코드 블록만을 지역 스코프로 인정하는 var 키워드로 선언한 변수와는 달리 **let 키워드로 선언한 변수는** if 문, for 문, while 문, try/catch 문 등 모든 코드 블록을 지역 스코프로 인정하는 **블록 레벨 스코프를 따른다.**
- 이는 함수 이외의 코드 블록에서 전역에 변수가 할당되는 것을 막아주는 역할을 하여 무분별한 전역 변수 사용과 의도치 않은 동작을 억제할 수 있다.

#### 2.3 변수 호이스팅

- var 키워드로 선언한 변수와 달리 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
- var 키워드로 선언한 변수는 런타임 이전에 값이 undefined로 초기화된다. 즉, “선언 단계”와 “초기화 단계”가 한번에 진행된다.
- 때문에 선언문 이전에 변수를 참조해도 값이 undefined일 뿐 에러를 발생시키지 않는다.
- **let 키워드로 선언한 변수는 “선언 단계”와 “초기화 단계”가 분리되어 진행된다.**
- 런타임 이전에 “선언 단계”는 실행되지만 “초기화 단계”는 변수 선언문에 도달했을 때 실행된다. "초기화 단계” 이전에 참조하려고 하면 참조 에러가 발생한다.
  ```js
  {
    // 코드 블록 지역 스코프의 시작 지점
    console.log(foo);

    // 스코프 시작 지점과 변수 선언문 사이의 이 공간을 TDZ라 한다.

    // 초기화 단계 시작 지점
    let foo; // 변수 선언문에서 초기화 단계가 실행된다.
    console.log(foo); // undefined

    foo = 1; // 할당문에서 할당 단계가 실행된다.
    console.log(foo); // 1
  }
  ```
  let 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문) 이전까지는 변수를 참조할 수 없다. 이 구간을 시간적 사각지대(Temporal Dead Zone, TDZ)라고 한다.

#### 2.4 전역 객체와 let

- 전역 함수, var 키워드로 선언한 변수, 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체의 프로퍼티가 된다.
- 하지만 let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
- let 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 **선언적 환경 레코드**) 내에 존재하게 된다.

### 3. const 키워드

#### 3.1 선언과 초기화

- const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.
  ```js
  const foo = 1;  // 선언과 동시에 초기화

  const bar;      // SyntaxError: Missing initializer in const declaration.
                  // 문법 에러: const 선언문에서 초기값을 빼먹었네용?
  ```
- const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

#### 3.2 재할당 금지

- var, let 키워드로 선언한 변수와 다르게 const 키워드로 선언한 변수는 재할당이 금지된다.

#### 3.3 상수

- const 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다.
- 불변(immutable)인 원시 값은 재할당 없이 변수의 값을 변경할 수 없기 때문이다.
- const 키워드는 변수의 상대 개념인 상수를 표현하는데 사용하기도 한다.
- const 키워드를 상수 표현에 사용하면 상태 유지와 가독성, 유지보수성 등에 좋다.
- 식별자를 통해 값의 의미를 쉽게 파악할 수 있으며 나중에 값이 변경되더라도 상수만 변경하면 되기 때문에 유지보수성이 대폭 향상된다.
- 일반적으로 const 키워드를 이용한 상수 표현의 변수명은 대문자로 선언해 상수임을 명확하게 한다. 여러 단어로 이루어진 경우 스네이크 케이스로 표현하는 것이 일반적이다.

#### 3.4 const 키워드와 객체

- const 키워드로 선언한 변수에 원시 값을 할당한 경우 값을 변경할 수 없다. 하지만 객체를 할당한 경우 값을 변경할 수 있다. 원시 값은 불변의 값으로 재할당 이외에는 값을 변경(교체)할 방법이 없지만 객체는 변경 가능한 값으로 재할당 없이도 변경이 가능하다.
- const 키워드는 재할당을 금지할 뿐 완전 불변을 의미하는 것이 아니다. 식별자가 가리키는 객체의 참조 값을 변경하는 것이 아니기 때문에 객체의 프로퍼티 동적 생성, 프로퍼티 삭제, 프로퍼티 값 변경을 통해 객체를 변경하는 것은 가능하다.

### 4. var vs. let vs. const

변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다. const 키워드를 사용하면 의도치 않은 재할당을 방지하기 때문에 좀 더 안전하다.

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.(재할당이 가능하므로 넓으면 의도치 않은 값 변경 확률이 높아짐)
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하기 때문에 var, let 키워드보다 안전하다.

변수 선언 시점에 재할당이 필요할지 잘 모르는 경우가 많다. 그리고 객체는 의외로 재할당하는 경우가 드물다. 따라서 변수를 선언할 때는 일단 const 키워드를 사용하고 재할당이 반드시 필요한 경우 그때 let 키워드로 변경해도 늦지 않다.
