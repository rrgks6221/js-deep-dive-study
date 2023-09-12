# 18장 함수와-일급-객체

## 18.1 일급 객체

> 아래와 같은 조건을 만족하는 객체를 `일급 객체`라 한다.
> 대표적으로 함수가 있다.

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에서 생성이 가능하다
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환갓으로 사용할 수 있다.

함수는 객체의 모든 위의 모든 조건에 만족하고 객체가 가지고 있는 프로퍼티 및 어트리뷰트를 가지고 있다.

## 18.2 함수 객체의 프로퍼티

> 함수로 객체이므로 `console.dir` 나 `Object.getOwnPropertyDescriptors` 같은 메서드로 확인해보면 프로퍼티들이 있는걸 볼 수 있다.

### 18.2.1 arguments 프로퍼티

> 함수를 호출하면 전달된 인수들은 `arguments` 라는 지역변수로 할당된다.

```js
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 2
console.log(multiply(1, 2, 3)); // 2
```

JS 는 매개변수와 인수의 개수가 일치하는지 학인하지 않기 때문에 위의 코드는 에러를 반환하지는 않는다.
하지만 `arguments` 변수에는 인수로 넘겨준 모든 값이 유사 배열로 할당된다.

이러한 특성을 가지고 `가변 인자 함수`를 구현할 수 있다.

```js
function sum() {
  let res = 0;

  for (let i = 0; i < arguments.length; i += 1) {
    res += arguments[i];
  }

  return res;
}
```

하지만 `ES6` 문법에 `Rest` 파라미터를 도입하여 좀 더 간결하게 작성할 수 있게 됐다.

```js
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}
```

### 18.2.2 caller 프로퍼티

> `caller` 프로퍼티는 ECMAScript 사양에 포함되지 않는 비표준 프로퍼티이므로 사용을 지양해야한다.

### 18.2.3 length 프로퍼티

> `length` 프로퍼티는 함수 정의시에 선언한 매개변수의 개수를 가리킨다.

### 18.2.4 name 프로퍼티

> `name` 프로퍼티는 ES6 이전에는 함수명을 가리켰지만 ES6 이후에는 함수의 식별자를 가리킨다.
