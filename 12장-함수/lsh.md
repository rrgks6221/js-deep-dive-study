# 12장 함수

## 12.1 함수란

> 함수란 JS 뿐만 아닌 프로그래밍 언어에서 필수적인 핵심 개념이다.
> 특정 일을 하는 코드를 미리 선언한 뒤 호출하여 사용한다.

- 기본적으로 `function` 키워드를 통해 선언한다.
  ```js
  function add(x, y) {
    return x + y;
  }
  ```

## 12.2 함수를 사용하는 이유

> 함수를 사용하는 이유는 여러가지이지만 가장 큰 이유는 동일한 작업을 사전에 정의한 뒤 필요할 때 사용하기 위함이다.

## 12.3 함수 리터럴

> 함수로 함수 리터럴로 생성할 수 있다.

```js
const f = function add(x, y) {
  return x + y;
};
```

- 이때 함수의 식별자는 `add` 가 아닌 `f` 라는것에 주의하자.

## 12.4 함수 정의

> JS 에는 4가지 함수 정의 방식이 있다.

- 함수 선언문
  ```js
  function add(x, y) {
    return x + y;
  }
  ```
- 함수 표현식
  ```js
  const add = function (x, y) {
    return x + y;
  };
  ```
- Function 생성자 함수
  - 좋지않은 패턴이므로 사용하지 말자
  ```js
  const add = new Function('x', 'y', 'return x + y;');
  ```
- 화살표 함수(ES6)
  ```js
  const add = (x, y) => x + y;
  ```

### 12.4.1 함수 선언문

> 말 그대로 함수 사용하기 전 선언한다.

```js
// 일반적인 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 선언문은 이름을 생략할 수 없다.
function (x, y) {
  return x + y
}
```

함수 선언문의 함수명은 식별자로 사용할 수 없다.

```js
// add 라는 함수를 선언하지만 식별자로 가지지는 않고 f 라는 식별자를 가진다.
const f = function add(x, y) {
  return x + y;
};
console.log(f(1, 2)); // 3
console.log(add(1, 2)); // ReferenceError: add is not defined

// 이런 경우에 JS 엔진 내부적으로 함수명과 동일한 식별자에 할당해준다.
function add2(x, y) {
  return x + y;
}
```

### 12.4.2 함수 표현식

> 함수를 표현하여 변수에 할당한다.

```js
const add = function (x, y) {
  return x + y;
};
```

### 12.4.3 함수 생성 시점과 함수 호이스팅

> 함수는 일반 변수와 생성시점과 호이스팅 방식의 차이가 있다.

```js
// 함수 참조
console.log(add); // f add(x, y)
console.log(sub); // undefined

// 함수 호출
console.log(add(1, 2)); // 3
console.log(sub(1, 2)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

위의 예저를 통해 함수 표현식과 선언문은 차이가 있다는 걸 알 수 있다.

#### 함수 선언문

함수 선언문은 일반 변수와 달리 호이스팅도 되면서 초기화 및 할당까지 이루어진다.

- 선언 전 참조가 가능하다.
- 선언전 호출이 가능하다.

이러한 특징을 가지는 이유는 JS 엔진에서 런타임 이전에 평가단계에서 함수명과 동일한 식별자에 값까지 할당을 완료하기 때문이다.

#### 함수 표현식

함수 표현식은 함수를 표현한 뒤 변수에 할당하기 때문에 일반 변수와 같은 호이스팅을 가진다.

함수 선언문과 다른 이유는 함수를 표현한 뒤 값을 변수에 다시 넣는 과정을 하기 때문에 참조는 되지만 값이 할당되지는 않는다.

### 12.4.4 Function 생성자 함수

> 자바스크립트 빌트인 함수 Function 생성자 함수를 사용하여 정의할 수 있지만 일반적이지 않으므로 사용을 지양해야한다.

```js
const add = new Function('x', 'y', 'return x + y;');
```

JS 는 built in 함수로 eval 도 제공하는데 이도 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval) 에서는 보안적인 이슈로 사용을 지양하라는 말이 있다. 이때매 그런 경우에는 `Function` 키워드를 사용하여 연산을 해야한다.

### 12.4.5 화살표 함수

> ES6 에서 도입된 화살표 함수는 함수를 좀 더 간략한 방법으로 선언할 수 있다.

- 화살표 함수는 단순히 표현만 간략한 것이 아닌 내부 동작 또한 간략화되어 있다.
  - `arguments` 객체를 생성하지 않는다.
  - 기존 함수와 `this` 바인딩 방식이 다르다.

## 12.5 함수 호출

> 함수는 함수를 가리키는 식별자와 한 쌍의 소괄호인 함수 호출 연산자로 호출한다.

### 12.5.1 매개변수와 인수

```js
// x, y 를 매개변수(parameter) 라고 한다.
function add(x, y) {
  return x + y;
}

// 1, 2 를 인수(argument) 라고 한다.
add(1, 2);
```

- 매개변수는 일반 함수 호출 시 일반 변수와 마찬가지로 undefined 로 초기화 후 값이 할당된다.
- 매개변수는 함수 내부의 스코프를 가진다.

### 12.5.2 인수 확인

> JS 는 동적 타입 언어이므로 인수로 기대하지 않은 타입이 들어올 수 있고 인수와 매개변수의 개수가 다를 수 있기 때문에 방어코드를 넣어줘야 한다.

```js
// 숫자타입을 기대한 함수
function add(x, y) {
  return a + b;
}

// 기대한대로 3이 나온다.
console.log(add(1, 2)); // 3
// 문자열을 넣어도 오류는 안나지만 기대한 경과가 나오지 않을수도 있다.
console.log(add('a', 'b')); // 'ab'
// 매개변수에 인수를 주지 않는다면 undefined 로 해석한다.
console.log(add(1)); // NaN
```

좀 더 안전한 코드는 아래처럼 해야한다.

```js
// 타입 검사
function add1(x, y) {
  if (typeof x !== 'number') {
    throw new Error();
  }
  if (typeof y !== 'number') {
    throw new Error();
  }

  return x + y;
}

// 매개변수 기본값
function add2(x, y) {
  x = x || 0;
  y = y || 0;

  return x + y;
}

// 매개변수 기본값 ES6
function add3(x = 0, y = 0) {
  return x + y;
}
```

## 12.5.3 매개변수의 최대 개수

> ECMAScript 사양에 매개변수 최대개수는 제한하고 있지 않지만 최대개수는 존재하고 너무많은 최대개수는 좋지 않다.

- 너무 많은 매개변수는 1개 이상의 일을 할 가능성이 있다.
- 매개변수가 많다면 가독성이 떨어진다.
- 매개변수는 순서에 영향을 받기 떄문에 추가 시 맨 뒤에 추가해야한다.

이러한 이유 때문에 매개변수의 개수는 3개 이하가 이상적이라고 말한다.

많은 매개변수를 주고싶다면 객체를 사용하는것이 좋다.

```js
$.ajax({
  method: 'POST',
  url: '/user',
  data: { id: 1 },
});
```

- 호출 시 각 변수들의 의미를 알 수 있어서 가독성이 높아진다.
- 순서에 영향을 받지 않고 인수를 넘겨줄 수 있다.

### 12.5.4 반환문

> 함수를 통해 특정 값을 넘겨받고 싶다면 반환문을 사용해야한다.

- `return` 문을 사용하여 반환한다.
- `return` 문 아래의 코드는 실행하지 않는다.

## 12.6 참조에 의한 전달과 외부 상태의 변경

> 객체를 넘겨줄 경우 참조가 전달되기 때문에 외부 상태에 부수효과가 일어날 수 있다.

```js
function fn(innerObj) {
  innerObj.value += 100;
}

const outerObj = {
  value: 1,
};

console.log(outerObj.value); // 1
fn(outerObj);
// 원본 객체의 값이 훼손된다.
console.log(outerObj.value); // 101
```

## 12.7 다양한 함수의 형태

### 12.7.4 콜백함수

> 함수의 파라미터로 함수를 받아 실행하는 함수를 말한다.

```js
// (el) => el * 2 가 콜백함수
// map 이라는 메서드에서 해당 함수를 실행한다.
const arr1 = [1, 2, 3, 4].map((el) => el * 2);

// 함수를 미리 선언한 뒤 사용할수도 있다.
function multiply(el) {
  return el * 2;
}
const arr2 = [1, 2, 3, 4].map(multiply);
```

### 12.7.5 순수 함수와 비순수 함수

> 부수효과가 없는 함수를 순수함수, 부수효과가 있는 함수를 비순수함수라고 한다.

```js
let count = 0;

function increase() {
  return ++count;
}

// 함수 외부의 count 를 변경하기 때문에 추적이 어려울 수 있다.
increase(count);
```
