# 11장 원시-값과-객체의-비교

> JS 는 크게 `원시타입`과 `겍체타입(참조타입)` 으로 나뉜다.

## 11.1 원시값

> 원시값은 변경 불가능한 값이다.
> 이떄 변수가 아닌 메모리 주소의 값을 변경할 수 없나느 점에 유의해야한다.

```js
let str = 'a';

b = 'b';
```

이때 str 변수가 가리키는 메모리주소의 값이 변하는게 아닌 새로운 공간을 확보하여 값을 채운 뒤 변수 str 이 가리키는 메모리 주소를 변경한다.

### 11.1.2 문자열과 불변셩

> 문자열은 0개 이상의 문자로 이뤄진 집합이다.

#### 유사배열 객체

문자열은 유사배열 객체이다.
유사배열 객체란 아래 특징을 가진 객체이다.

- index 로 프로퍼티 값에 접근할 수 있다.
- length 같은 프로퍼티를 갖는다
- for 문으로 순회할 수 있다.

```js
let str = 'string';

// index 를 통해 접근할 수 있다.
console.log(str[0]); // s
// length 를 통해 길이를 알 수 있다.
console.log(str.length); // 6
// toUpperCase 같은 메서드를 제공한다.
console.log(str.toUpperCase()); // STRING
// 원시타입이기때문에 원본을 해치지 않는다.
console.log(str); // string
str[0] = 'S';
console.log(str); // string
```

### 11.1.3 값에 의한 전달

> 원시타입은 값에의한 전달이 되기 때문에 변수간 서로 간섭할 수 없다.

```js
let score = 80;
let copy = score;

console.log(score); // 80
console.log(copy); // 80
console.log(score === copy); // true

score = 100;
console.log(score === copy); // false
console.log(score); // 100
console.log(copy); // 80
```

## 11.2 객체

> 객체는 참조에 의한 전달이 되기때문에 변수간 서로 간섭할 수 있다.

### 얕은 복사

> 얕은 복사란 참조를 복사하여 변수간 영향을 줄 수 있다.

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const copy = obj;

console.log(obj.d); // undefined
copy.d = 4;
console.log(obj.d); // 4
```

### 깊은 복사

> 변수간 간섭없이 복사를 하고 싶다면 아래 방법들이 있다.

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  innerObj = {
    d: 4,
    e: 5
  }
};
// library 사용
const _ = require('lodash');
const copy1 = _.cloneDeep(obj);

// JSON converting
const copy2 = JSON.parse(JSON.stringify(obj));

// 스프레드 문법 사용
// 스프레드 문법을 사용할 경우 depth 1 만 깊은복사되는것에 주의하자.
// 즉 innerObj 는 변수간 간섭될 수 있는 프로퍼티이다.
const copy3 = { ...obj };
```
