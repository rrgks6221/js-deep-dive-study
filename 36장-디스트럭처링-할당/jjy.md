# 36장 디스트럭처링-할당

- 이터러블 또는 객체를 destructuring하여 1개 이상의 변수에 개별적으로 할당하는 것을 의미함

## 배열 디스트럭처링 할당

ES5에서 디스트럭처링 할당하는 방법

```js
var arr = [1, 2, 3];

var one = arr[0];
var two = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3
```

- ES6에서 디스트럭처링 할당하는 방법
  (할당 대상은 이터러블, 할당 기준은 배열의 인덱스임)

```js
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

- 배열 디스트럭처링 할당을 위한 변수에 Rest요소를 사용할 수 있음

```js
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [ 2, 3 ]
```

## 객체 디스트럭처링 할당

- ES5에서는 객체의 프로퍼티를 디스트럭처링하여 변수에 할당하기 위해서 프로퍼티를 사용함

```js
var user = { firstName: 'Ungmo', lastName: 'Lee' };

var firstName = user.firstName;
var lastName = user.lastName;

console.log(firstName, lastName); // Ungmo Lee
```

- ES6에서의 객체 디스트럭처링 할당대상은 객체여야 하고, 할당기준은 프로퍼티 키임

```js
const user = { firstName: 'Ungmo', lastName: 'Lee' };

// 순서는 의미 없음
const { lastName, firstName } = user;

console.log(firstName, lastName); // Ungmo Lee
```

- 객체 디스트럭처링 할당을 위해서는 할당 연산자 왼쪽에 프로퍼티 값을 받을 변수를 선언해야 함
- 객체 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있음

```js
const { lastName, firstName } = { firstName: 'Ungmo', lastName: 'Lee' };
```

- 함수의 매개변수에도 사용가능

```js
function printTodo({ content, completed }) {
  ...
}
```

- 객체 디스트럭처링 할당을 위한 변수에 Rest프로퍼티를 사용할 수 있음

```js
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
```
