# 26장 ES6-함수의-추가-기능

## 26.1 함수의 구분

> `JS` 의 `ES6` 이전 함수는 모두 `callable` 이면서 `constructor` 이다.

| ES6 함수의 구분 | constructor | prototype | super | arguments |
| --------------- | ----------- | --------- | ----- | --------- |
| 일반함수        | O           | O         | X     | O         |
| 메서드          | X           | X         | O     | O         |
| 화살표함수      | X           | X         | X     | X         |

## 26.2 메서드

> `ES6` 에서 메서드에 대한 정의가 명확하게 구분됐으며 메서드 축약표현으로 정의된 함수만을 의미한다.

```js
const obj = {
  x: 1,

  // 메서드 O
  // constructor
  foo() {
    return this.x;
  },

  // 메서드 X
  // non-constructor
  bar: function () {
    this.x;
  },
};
```

## 26.3 화살표 함수

> `화살표함수`는 표현 및 내부 구현을 보다 간략화한 문법이고 콜백함수 내부에서 `this` 가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

### 26.3.2 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 `non-constructor` 다.
1. 중복된 매개변수 이름을 선언할 수 없다.
1. 화살표 함수는 함수 자체이 `this`, `arguments`, `super`, `new.target` 바인딩을 갖지 않는다.

### 26.3.3 this

> 화살표함수와 일반함수의 가장 큰 차이는 `this` 다.
> 일반함수는 내부적으로 `this` 를 생성하는 반면 화살표함수는 `this` 를 생성하지 않고 참조 시 상위 스코프의 `this` 를 참조한다.

### 26.3.4 super

> 화살표함수는 `super` 를 가지지 않고 참조시에 상위스코프의 `super` 를 참조한다.

### 26.3.5 arguments

> 화살표함수는 `arguments` 를 가지지 않고 참조시에 상위스코프의 `arguments` 를 참조한다.

## 26.4 Rest 파라미터

> `ES6` 에서 추가된 `Rest 파라미터`는 가변인자 함수 구현에 용이하다.

### 26.4.1 기본 문법

```js
function sum(...rest) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
```

### 26.4.2 Rest 파라미터와 arguments 객체

> `Rest parameter` 와 `arguments` 객체의 차이점은 `Rest parameter` 는 Array.prototype 가 상속되지만 `arguments` 객체는 자동으로 상속되지않는다.

### 26.5 매개변수 기본값

> 함수 매개변수에 기본값을 줄 수 있다.

```js
function sum(a = 0, b = 0) {
  return a + b;
}

// syntax error
// rest parameter 에는 기본값을 주지 못한다.
function sum(...rest = []) {
  return rest.reduce((acc, cur) => acc + cur, 0);
}
```
