# 34장 이터러블

## 이터레이션 프로토콜

- 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.
- ES6 이전의 순회 가능한 데이터 컬렉션은 나름의 구조를 가지고 다양한 방법으로 순회할 수 있었다.
- ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for…of, spread, distructuring 의 대상으로 사용할 수 있도록 일원화했다.

### 이터러블

- Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
- 이러한 규약을 이터러블 프로토콜이라 하며, 이 프로토콜을 준수한 객체를 이터러블이라 한다.
- 이터러블은 for…of 로 순회할 수 있으며 spread, distructuring의 대상으로 사용할 수 있다.

```js
// iterable 인지 확인
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === 'function';

isIterable([]); // true
isIterable(''); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
isIterable({}); // false

const arr = [1, 2, 3];

console.log(Symbol.iteartor in arr); // true
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않음.
// 따라서 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false
```

### 이터레이터

- Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
- 이터레이터는 next 메서드를 소유하며 next 메서드 호출 시 이터러블을 순회하며 value, done 프로퍼티를 갖는 iterator result 객체를 반환한다. 이러한 프로토콜을 이터레이터 프로토콜이라 하며, 이 프로토콜을 준수한 객체를 이터레이터라 한다.
- 이터레이터는 이터러벌의 요소를 탐색하기 위한 포인터 역할을 한다.

```js
const arr = [1, 2];

const iterator = arr[Symbol.iterator]();

console.log('next' in iterator); // true

// next 메서드 호출 시 이터러블을 순회하며 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## 빌트인 이터러블

- JS는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다.
  - Array, String, Map, Set, TypedArray, arguments, DOM 컬렉션

## for … of

- for…of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.
- for…in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입 프로퍼티 중에서
  프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거한다.

```js
// for...of 문의 내부 동작
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();

for (;;) {
  const res = iterator.next();
  if (res.done) break;

  const item = res.value;
  console.log(item); // 1 2 3
}
```

## 이터러블과 유사 배열 객체

- 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체

```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // 1 2 3
}
```

- ES6에서 이터러블이 도입되면서 유사 배열 객체인 arguments, NodeList, HTMLCollection 객체에 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
- 이터러블이 된 이후에도 유사 배열 객체의 성질을 가지고 있으므로 유사 배열 객체이면서 이터러블이다.

## 사용자 정의 이터러블

- Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터 반환해야함.
- next 메서드는 이터레이터 result 객체를 반환해야함.

```js
const fibonacci = function (max) {
  let [pre, cur] = [0, 1];

  // Stymbol.iterator 메서드를 구현한 이터러블 반환
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

for (const num of fibonacci(10)) {
  console.log(num); // 1 2 3 5 8
}
```

```js
// 이터러블이면서 이터레이터인 객체
{
  [Symbol.iterator]() { return this; }
  next() {
    return { value: any, done: boolean };
  }
}
```

```js
// 무한 이터러블을 생성하는 함수
// 데이터가 필요할 때까지 데이터 생성을 지연하다가 필요한 순간 데이터 생성함.
const fibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur };
    },
  };
};

for (const num of fibonacciFunc()) {
  if (num > 1000) break;
  console.log(num); // ...
}
```
