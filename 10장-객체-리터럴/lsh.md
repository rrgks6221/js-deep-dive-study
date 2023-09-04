# 10장 객체-리터럴

## 10.1 객체란

> JS 에서 객체란 원시타입을 제외한 모든 타입의 값이다.

## 10.3 프로퍼티

> 객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.

- 프로퍼티 키는 식별자 네이밍 규칙을 준수해야 한다.
  - 식별자 네이밍 규칙을 준수하지 않는다면 따옴표로 감싸야한다.
- 프로퍼티 키를 중복으로 선언하면 나중에 선언한 프로퍼티가 덮어쓴다.

  ```js
  const bar = {};

  bar.name = 'lsh';
  bar.name = '이석호';
  console.log(bar.name); // 이석호

  const foo = {
    name = 'lsh',
    name = '이석호',
  };
  console.log(foo.name); // 이석호
  ```

## 10.4 메서드

> 메서드란 객체의 프로퍼티 값이 함수일 경우 메서드라 한다.

## 10.5 프로퍼티 접근

> 프로퍼티 접근 방법은 `마침표 표기법`, `대괄호 표기법` 두가지가 있다.

### 마침표 표기법

- 마침표를 통해 프로퍼티에 접근한다.

  - 마침표를 통해 접근하면 식별자 네이밍 규칙을 준수해야한다.

  ```js
  const person = {
    name: 'lsh',
    'ko-name': '이석호',
  };

  console.log(person.name); // lsh
  console.log(person.'ko-name') // error
  ```

- 마침표 표기법으로 인한 프로퍼티 접근은 프로퍼티명을 암묵적으로 string type 으로 해석한다.

### 대괄호 표기법

- 대괄호를 통해 프로퍼티에 접근한다.
  - 문자열을 사용할경우 따옴표로 감싸야한다.
  - 따옴표로 감싸지 않으면 변수로 해석한다.

```js
const person = {
  name: 'lsh',
  'ko-name': '이석호',
};

console.log(person['name']);
console.log(person[name]); // error
```

## 10.8 프로퍼티 삭제

> JS 는 유연한 언어이기때문에 프로퍼티를 삭제할 수 있다
> 하지만 특수한 경우(보안적인 이슈 등)이 아니라면 프로퍼티를 삭제하는건 좋지않은 패턴이다.

```js
const person = {
  name: 'lsh',
  age: 27,
};

delete person.age; // age 프로퍼티 삭제
delete person.address; // person.address 는 undefined 이지만 에러는 나지 않는다.
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

> JS 는 좀 더 간결한 구문을 위해 ES6 에서 확장 기능을 제공했다.

### 10.9.1 프로퍼티 축약 표현

> 프로퍼티 키와 값으로 사용할 변수명이 같다면 아래처럼 축약해 표현할 수 있다.

```js
let x = 1;
let y = 2;

const obj = {
  x,
  y,
  z: 3,
};
```

- [airbnb coding style guide](https://github.com/tipjs/javascript-style-guide#3.7) 에서는 축약 표현을 위로 올리는걸 권장하고 있다.

### 10.9.2 계산된 프로퍼티 이름

> 문자열로 표현될 수 있는 값이나 표현식을 이용햇 프로퍼티 키를 생성할 수 있다.

```js
function getName(name) {
  return `name is ${name}`;
}

const person = {
  [getName('lsh')]: 'lsh',
};
person[getName('이석호')]: '이석호';
```

### 10.9.3 메서드 축약 표현

> 객체의 메서드를 표현할 때 축약하여 표현할 수 있다.

```js
const obj1 = {
  name: 'lsh',
  sayHi: function () {
    console.log(`Hi! ${this.name}`);
  },
};
const obj2 = {
  name: 'lsh',
  sayHi() {
    console.log(`Hi! ${this.name}`);
  },
};
```
