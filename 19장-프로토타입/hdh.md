# 19장 프로토타입

### 1. 객체지향 프로그래밍

- 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.
- 실세계의 실체를 프로그래밍에 접목하려는 시도에서 시작
- 실체는 특징이나 성질을 나타내는 **속성**을 갖는다. ex.) 사람의 나이, 성별, 이름 등
- 여러 속성 중 프로그래밍에 필요한 속성만 간추려 표현하는 것을 **추상화**라 한다.
- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 한다.
- 상태를 나타내는 데이터를 **프로퍼티**, 상태를 조작할 수 있는 동작을 **메서드**라 부른다.

### 2. 상속과 프로토타입

- 객체지향 프로그래밍의 핵심 개념
- 상속은 어떤 객체의 프로퍼티나 메서드를 다른 객체가 상속 받아 그대로 사용할 수 있는 것
- 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.
- 불필요한 중복을 제거, 코드 재사용

```js
// 프로토타입 미사용
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

// 메서드가 중복 생성되어 같은 동작을 하지만 참조값이 불일치
console.log(circle1.getArea === circle2.getArea); // false

// 프로토타입(상속) 사용
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true;
```

### 3. 프로토타입 객체

- 객체 간 상속을 구현하기 위해 사용
- 어떤 객체의 상위 객체 역할을 하는 객체로 다른 객체에 공유 프로퍼티를 제공
- 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 사용 가능
- 예를 들어 MDN에 메서드를 검색하다 보면 Array.prototype.filter()와 같이 나오는데 이처럼 모든 배열 인스턴스는 filter 메서드를 갖는다.(상속)

#### 3.1 \_\_proto\_\_ 접근자 프로퍼티

- 모든 객체는 \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 \[[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.
- 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다.

#### 3.2 함수 객체의 prototype 프로퍼티

- prototype 프로퍼티는 함수 객체만이 소유하고 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
- 즉 non-constructor인 화살표 함수나 ES6의 메서드 축약 표현으로 정의한 함수는 prototype 프로퍼티가 없다.(생성자 함수 용도로 사용하지 않는 일반 함수도 prototype을 생성하지만 의미가 없다는 소리)

### 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

```js
const obj = {};

// 객체 리터럴로 생성한 obj의 생성자 함수는 Object 생성자 함수이다.
console.log(obj.constructor === Object); // true
```

객체 리터럴로 생성해도 내부적으로 Object 생성자 함수로 생성되는 것인지 ECMAScript 사양을 살펴봄

일단 Object 생성자 함수에 인수를 전달하지 않고 호출하면 내부적으로 추상 연산 OrdinaryObjectCreate를 호출하여 Object.prototype을 프로토타입으로 갖는 빈 객체를 생성

객체 리터럴도 평가될 때 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하도록 되어있다.

같은 연산을 호출하지만 리터럴로 생성한 객체는 생성자 함수로 생성한 객체는 아니라고 함(프로퍼티 추가, new.target등에서 조금 다름)

### 5. 프로토타입 생성 시점

생성자 함수로서 호출 가능한 함수(constructor)는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 생성됨

non-constructor는 프로토타입 생성 안됨

### 6. 객체 생성 방식과 프로토타입의 결정

### 7. 프로토타입 체인

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Hong");
console.log(me.hasOwnProperty("name")); //true

// me 객체는 name 속성만을 가지나
// Person.prototype이 sayHello라는 공용 메서드를 갖고
// Object.prototype이 hasOwnProperty라는 메서드를 갖는다.
```

### 8. 오버라이딩과 프로퍼티 섀도잉

위의 예시에서 me 인스턴스에 같은 이름의 sayHello 메서드를 추가

```js
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

me.sayHello(); // Hey! My name is Hong

// 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 오버라이딩하면
// 프로토타입 체인 상 상위에 있는 메서드는 가려지는데 이를 프로퍼티 섀도잉이라 한다.
```

### 9. 프로토타입의 교체

### 10. instanceof 연산자

- 객체가 생성자 함수의 인스턴스인지 판별
- 이항 연산자로서 좌변에 객체, 우변에 생성자 함수를 피연산자로 받는다.(우변이 함수가 아니면 TypeError)
- 쉽게 말해 좌변의 객체의 프로토타입 상에 우변에 생성자 함수 prototype이 존재하면 true 아니면 false

```js
function Person(name) {
  this.name = name;
}

const me = new Person("Hong");

// me의 프로토타입 체인 상에 Person.prototype이 존재
console.log(me instanceof Person); //true
// me의 프로토타입 체인 상에 Object.prototype이 존재
console.log(me instanceof Object); // true
```

### 11. 직접 상속

### 12.정적 프로퍼티/메서드

- 정적 프로퍼티/메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 프로퍼티/메서드
- hasOwnProperty처럼 인스턴스가 사용할 수 있으면 프로토타입 메서드
- Object.keys처럼 생성자 함수로 직접 호출이 가능하면 정적 메서드

```js
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

// 생성자 함수로 호출 가능
Person.staticMethod(); // staticMethod

// 인스턴스로는 호출 불가능
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

### 13. 프로퍼티 존재 확인

- 내에 특정 프로퍼티가 존재하는지 여부 확인
- 상속받은 모든 프로토타입의 프로퍼티도 확인하므로 주의해야 함

```js
const person = {
  name: "Hong",
  address: "Seoul",
};

console.log("name" in person); // true
console.log("address" in person); // true
console.log("age" in person); // false
console.log("toString" in person); // true ?????
//Object.prototype.toString을 상속받았기 때문에 true
```

### 14. 프로퍼티 열거

- 객체의 모든 프로퍼티를 순회하며 열거하려면 for…in 문을 사용한다.
- for…in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.

```js
const person = {
  name: "Hong",
  address: "Seoul",
};

console.log("toString" in person); // true

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// name: Hong
// address: Seoul

// toString이 안나온 이유는 Object.prototype.toString의
// 프로퍼티 어트리뷰트 [[Enumerable]] 값이 false이기 때문이다.
```

for…in 문은 정확하게 표현하면 **객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 \[[Enumerable]]값이 true인 프로퍼티를 순회하며 열거**한다.
