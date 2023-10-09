# 34장 이터러블

## 이터레이션 프로토콜

- ES6에서 도입, 순회 가능한(iterable) 데이터 컬렉션(자료구조)을 만들기 위
  해 ECMAScript 사양에 정의하여 미리 약속한 규칙
- 이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

### 이터러블 프로토콜

> Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다

### 이터레이터 프로토콜

> 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
> 이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트객체를 반환한다

## 이터러블

> 이터러블 프로토콜을 준수한 객체

- Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체
  - 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블

### 빌트인 이터러블

1. Array
1. String
1. Map
1. Set
1. TypedArray
1. arguments
1. DOM 컬렉션

### 이터러블과 유사 배열 객체

> 유사 배열 객체 : 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체
> `유사 배열 객체는 이터러블이 아닌 일반 객체`이기 때문에 for ... of 문으로 순회 불가능

- 이터러블이 아닌 유사 배열 객체를 배열로 변경할 땐 Array.from 사용

## 이터레이터

- 이터레이터의 next 메서드 : 이터러블의 각 요소를 순회하기 위한 포인터의 역할

  - next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환

- ES6 에서 이터러블이 도입되면서 유사 배열 객체인 arguments, NodeList, HTMLCollection 객체에 Symbol.iterator 메서드를 구현하여 이터러블이 되었다.
  - 단 여전히 유사 배열 객체이다.

```js
const arr = [1, 2, 3];

const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false}
console.log(iterator.next()); // { value: 2, done: false}
console.log(iterator.next()); // { value: 3, done: false}
console.log(iterator.next()); // { value: undefined, done: true }
```

- next 메서드를 통한 for ... of 문 -> for 문 표현 예제

```js
const iterable = [1, 2, 3];

const iterator = iterable[Symbol.iterator]();

for (;;) {
  const res = iterator.next(); //이터레이터 리절트 객체를 반환한다.

  if (res.done) break;

  const item = res.value;

  console.log(item); // 1, 2, 3
}
```
