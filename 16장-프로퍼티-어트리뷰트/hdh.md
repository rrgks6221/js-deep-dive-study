# 16장 프로퍼티-어트리뷰트

### 1. 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드다. (엔진 구현의 요구사항 같은 느낌)

내부 슬롯과 내부 메서드는`[[<name>]]`으로 표기하며 내부 슬롯은 상태(값)를 나타내고 내부 메서드는 알고리즘(동작)을 설명한다.

ECMAScript 사양은 내부 메서드가 구현되는 방법을 설명하지 않지만 메서드의 Call Signiture를 설명한다.

엔진은 내부 구조가 명시된 것처럼 동작하지만 실제 구현은 내부 메서드랑 다를 수 있다.

일부는 편리하다면 내부 메서드 사양의 구조와 매우 유사할 수도 있다.

내부 메서드와 실제 구현이 다르다고 하더라도 규정을 준수하려면 내부 메서드와 일치하는 동작이나 결과를 생성해야 한다.

자연어를 사용하여 설명하는 것보다 더 정확하고 이해하기 쉽도록 의사 코드로 구현 알고리즘을 설명할 수 있는 도구라고 생각하면 된다.

동작만 같을 뿐 자바스크립트 엔진 내부의 로직이므로 원칙적으로 내부 슬롯과 내부 메서드에 직접 접근할 수 없지만 일부 내부 슬롯과 내부 메서드는 간접적으로 접근할 수 있는 수단을 제공한다.

모든 객체에 포함된 `[[Prototype]]` 내부 슬롯의 경우, **proto**를 통해 간접적으로 접근할 수 있다.

```jsx
// 객체 리터럴로 객체 생성
const obj = {};

obj.[[prototype]]  // SyntaxError: Unexpected token '['

obj.__proto__      // Object.prototype
```

### 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

**_프로퍼티 상태란?_**

프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부를 말한다.

**프로퍼티 어트리뷰트란?**

자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]이다. 내부 슬롯이기 때문에 직접 접근할 수는 없지만 Object.getOwnPropertyDescriptor메서드를 사용하여 간접적으로 확인할 수는 있다.

Object.getOwnPropertyDescriptor메서드를 호출할 때 첫 번째 매개변수에는 객체의 참조를 전달하고, 두 번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.

Object.getOwnPropertyDescriptor 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다. 없는 프로퍼티나 상속받은 프로퍼티를 사용하면 undefined가 반환된다.

### 3. 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

- 데이터 프로퍼티
  - 키와 값으로 구성된 일반적인 프로퍼티
  - 우리가 사용하는 키,값 쌍의 프로퍼티는 모두 데이터 프로퍼티
- 접근자 프로퍼티
  - 자제적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

### **데이터 프로퍼티**

> 키와 값으로 구성된 일반적인 프로퍼티다. 우리가 사용하는 키, 값 쌍의 프로퍼티는 모두 데이터 프로퍼티다.

**데이터 프로퍼티의 프로퍼티 어트리뷰트**

`[[Value]]`

- 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다.
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 `[[Value]]`에 값을 재할당한다.
- 존재하지 않는 프로퍼티 키의 값을 변경하면 프로퍼티를 동적 생성하여 `[[Value]]` 에 값을 저장

`[[Writable]]`

- 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.
- `[[Writable]]`의 값이 false인 경우 해당 프로퍼티의 `[[Value]]` 의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.

`[[Enumerable]]`

- 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.
- `[[Enumerable]]` 의 값이 false인 경우 해당 프로퍼티는 for … in 문이나 Object.keys 메서드 등으로 열거할 수 없다.

`[[Configurable]]`

- 프로퍼티의 재정의 기능 여부를 나타내며 불리언 값을 갖는다.
- `[[Configurable]]` 의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. 단 `[[Writable]]` 이 true인 경우 `[[Value]]` 의 변경과 `[[Writable]]`을 false로 변경하는 것은 허용된다.

프로퍼티가 생성될 때 `[[Value]]` 의 값은 프로퍼티 값으로 초기화되며 `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 의 값은 true로 초기화된다.

### **접근자 프로퍼티**

> 자제적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

**접근자 프로퍼티의 프로퍼티 어트리뷰트**

`[[Get]]`

- **접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출**되는 접근자 함수
- 접근자 프로퍼티 키로 데이터 프로퍼티 값에 접근하면 `getter` 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.

`[[Set]]`

- **접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출**되는 접근자 함수
- 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 `setter` 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다.

`[[Enumerable]]`

- 데이터 프로퍼티의 `[[Enumerable]]` 과 같다.

`[[Configurable]]`

- 데이터 프로퍼티의 `[[Configurable]]` 과 같다.

```js
const person = {
  // firstName과 lastName은 **데이터 프로퍼티**다.
  firstName: "Donghui",
  lastName: "Hong",

  // fullName은 접근자 함수로 구성된 **접근자 프로퍼티**다.
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

// getter 함수의 호출
console.log(person.fullName); // Donghui Hong

// setter 함수의 호출
person.fullName = "Heungmin Son";

console.log(person); // {firstName: 'Heungmin', lastName: 'Son'}

// getter 함수의 호출
console.log(person.fullName); // Heungmin Son
```

person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티다.

메서드 앞에 get, set이 붙으면 getter, setter 함수이고 함수 이름인 fullName이 접근자 프로퍼티다. 접근자 프로퍼티는 자체적인 값(프로퍼티 어트리뷰트 `[[Value]]`)을 가지지 않고 데이터 프로퍼티의 값을 읽거나 저장할 때 관여한다.

### 4. 프로퍼티 정의

> 프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말한다.

Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다. 인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립터 객체를 전달한다.

```jsx
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, "firstName", {
  value: "Donghui",
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, "lastName", {
  value: "Hong",
});

let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: 'Donghui', writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값
descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: 'Hong', writable: false, enumerable: false, configurable: false}

// [[Enumerable]]이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = "kim";

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log(descriptor);
// {value: "Hong", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, "fullName", {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set() {
    [this.firstName, this.lastName] = name.split(" ");
  },
  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: *f*, set: *f*, enumerable: true, configurable: true}

person.fullName = "Heungmin Son";
console.log(person); // {firstName: 'Heungmin', lastName: 'Son'}
```

Object.defineProperty 메서드로 프로퍼티를 정의할 때 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다. 생략하면 기본값이 적용된다. `[[Value]]`, `[[Get]]`, `[[Set]]` 은 undefined가 기본값이고 `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 은 false가 기본값이다.

Object.defineProperty 메서드는 한번에 하나의 프로퍼티만 정의할 수 있다.

Object.defineProperties 메서드를 사용하면 한번에 여러 개의 프로퍼티를 정의할 수 있다.
