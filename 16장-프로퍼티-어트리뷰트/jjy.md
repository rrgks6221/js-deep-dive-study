# 16장 프로퍼티-어트리뷰트

## 내부 슬롯과 내부 메서드

- 내부 슬롯 = 의사 프로퍼티
- 내부 메서드 = 의사 메서드

&nbsp;내부 슬롯과 내부 메서드는 외부로 공개된 객체의 프로퍼티가 아니기 때문에 직접적으로 호출할 수 있는 방법을 제공하지 않는다. 단 일부에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

&nbsp;예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는데 이는 원칙적으로는 직접 접근할 수 없지만, **proto**로 간접작으로 접근할 수 있다.

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

&nbsp;자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

- value: 프로퍼티의 값
- writable: 값의 갱신 가능 여부
- enumerable: 열거 가능 여부
- configurable: 정의 가능 여부

&nbsp;기본적으로 직접 접근할 수는 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.

```js
const person = {
  name: "Lee",
};

console.log(Object.getOwnPropertyDescriptor(person, "name"));
//{ value: 'Lee', writable: true, enumerable: true, configurable: true }
```

&nbsp;첫 번째 매개변수에는 객체의 참조를 전달하고, 두 번째는 프로퍼티 키를 문자열로 전달한다. 이때 Object.getOwnPropertyDescriptor 메서드는 프로퍼티 디스크립터 객체를 반환한다. 존재하지 않다면 undefined가 반환된다.

## 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티: 키와 값으로 구성된 일반적인 프로퍼티
- 접근자 프로퍼티: 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

### 데이터 프로퍼티

&nbsp;데이터 프로퍼티는 다음과 같은 프로퍼티 어트리뷰트를 갖는다.

- value
- writable
- enumerable
- configurable

&nbsp;프로퍼티가 생성될 때 value값은 프로퍼티 값으로 최기화되고, 나머지의 값은 true로 초기화된다.

### 접근자 프로퍼티

- get
- set
- enumerable
- configurable

&nbsp;접근자 함수는 getter/setter 함수라고도 부른다.

```js
const person = {
  firstName: "junyeong",
  lastName: "Jang",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

console.log(person);
//{ firstName: 'junyeong', lastName: 'Jang', fullName: [Getter/Setter] }

person.fullName = "yeong j";

console.log(person);
//{ firstName: 'yeong', lastName: 'j', fullName: [Getter/Setter] }

console.log(person.fullName);
//yeong j
```

## 프로퍼티 정의

&nbsp;프로퍼티 정의: 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.

```js
const person = {};

Object.defineProperty(person, "firstName", {
  value: "junyeong",
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, "lastName", {
  value: "Jang",
});
```

- value: 프로퍼티의 값
- writable: 값의 갱신 가능 여부
- enumerable: 열거 가능 여부
- configurable: 정의 가능 여부

&nbsp;디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.

&nbsp;writable이 false이면 값을 변경할 수 없게 되고, 값을 변경하려하면 에러는 발생하지 않고 무시된다.

&nbsp;enumerable가 false이면 for in문이나 Object.keys등으로 열거할 수 없게 된다.

&nbsp;configurable가 false이면 프로퍼티를 재정의 할 수 없어진다.

## 객체 변경 방지

| 구분           | 메서드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| -------------- | ------------------------ | ------------- | ------------- | ---------------- | ---------------- | -------------------------- |
| 객체 확장 금지 | Object.preventExtensions | X             | O             | O                | O                | O                          |
| 객체 밀봉      | Object.seal              | X             | X             | O                | O                | X                          |
| 객체 밀봉      | Object.freeze            | X             | X             | O                | X                | X                          |

### 불변 객체

Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다. 완전한 불변 객체를 만들기 위해서는 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야한다.

```js
function deepFreeze(target) {
  if (target && typeof target === "object" && !Object.isFrozen(target)) {
    Object.freeze(target);

    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }
  return target;
}
```
