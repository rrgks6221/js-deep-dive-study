# 25장 클래스

## 25.1 클래스는 프로토타입의 문법적 설탕인가?

> class 는 ES6 에서 나온 문법으로 기존의 생성자함수와 prototype 기반 객체지향 프로그래밍이 아닌 다른 객체지향 언어와 유사한 객체 생성 매커니즘을 제공한다.

### 클래스와 생성자함수의 차이점

1. 클래스는 new 연산자 없이 호출하면 에러가 발생한다.
1. 클래스는 상속을 지원하는 `extends`, `super` 키워드를 제공한다.
1. 클래스는 호이스팅이 발생하지 않는거처럼 동작한다.
   - 호이스팅은 발생하지만 선언식 이전에 호출이 불가능하다.
   - `ReferenceError: Cannot access 'ClassName' before initialization`
1. 클래스내의 모든 코드는 암묵적으로 `strict mode` 가 적용된다.
1. 클래스의 `constructor`, `prototype method`, `static method` 의 프로퍼티 어트리뷰트 \[\[Enumerable]]의 값은 false 이다.

## 25.2 클래스 정의

> 클래스는 `class` 키워드를 사용하여 정의하고 일반적으로 `PascalCase` 로 정의한다.

```js
// 클래스 선언문
class Person {};

// 익명 클래스 표현식
class Person = class {};

// 기명 클래스 표현식
// 이때 식별자는 Person 이다.
// MyClass 로 접근할 경우 참조 에러가 발생한다.
class Person = class MyClass {};
```

클래스도 1급 객체이며 함수고 다음과 같은 특징을 갖는다.

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
1. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
1. 함수의 매개변수에게 전달할 수 있다.
1. 함수의 반환값으로 사용할 수 있다.

클래스는 0개 이상의 메서드를 정의할 수 있고 메서드의 종류는 `constructor(생성자)`, `prototype method`, `static method` 3개가 있다.

```js
class Person {
  // constructor method
  constructor(name) {
    this.name = name;
  }

  // prototype method
  sayHi() {
    console.log(`my name is ${this.name}`);
  }

  // static method
  static sayHello() {
    console.log('hello');
  }
}
```

## 25.3 클래스 호이스팅

> 클래스도 호이스팅이 되지만 `const` 키워드처럼 TDZ 에 빠지기떄문에 선언전에 참조하면 참조에러가 발생하게 된다.

## 25.4 인스턴스 생성

> 클래스의 가장 큰 존재이유는 인스턴스를 생성하기 위함이다.

- 클래스를 `new` 연산자없이 호출하면 에러가 발생한다.
- 기명 클래스 표현식에서 클래스 명은 클레스 몸체 내부에서만 유효한 식별자다.

## 25.5 메서드

> 클래스 메서드는 0개이상 선언할 수 있고 3개의 메서드타입이 있다.

### 25.5.1 constructor

> constructor 는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.

```js
class Person {
  // new 키워드를 통한 인스턴스화 시점에 실행된다.
  constructor(name) {
    this.name = name;

    // 암묵적으로 this 가 반환된다.
    return this;
  }
}

const SEOKHO = new Person('seokho');
```

- `constructor` 는 클래스를 인스턴스화할 때 실행되는 메서드이다.
- `constructor` 는 암묵적으로 `this` 를 생성 및 반환한다.
  - `return` 을 생략하면 `this` 가 반환된다.
  - 원시값을 반환하면 원시값은 무시되고 `this` 가 반환된다.
  - 객체를 반환하면 객체가 반환된다.
- `constructor` 를 2개이상 쓴다면 에러가 발생한다.
- `constructor` 를 생략할 수 있다.
  - 빈 `constructor` 가 암묵적으로 정의된다.
- `constructor` 의 소괄호는 인스턴스화하기위한 매개변수이다.

### 25.5.2 프로토타입 메서드

> 생성자함수를 이용한 인스턴스를 생성 시 프로토타입 메서드를 추가할 수 있다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi my name is ${this.name}`);
  }
}
```

### 25.5.3 정적 메서드

> 클래스는 정적 메서드를 선언할 수 있으며 이는 생성자 함수를 통한 인스턴스는 호출하지 못하고 클래스로 호출할 수 있다.
> 또한 constructor 를 통한 초기화된 변수 및 멤버변수를 사용할 수 없다.

```js
class Person {
  static sayHi() {
    console.log('Hi');
  }
}
```

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

1. 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다르다.
1. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
1. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.
1. 정적 메서드는 정적 프로퍼티를 참조할 수 있지만 프로토타입 메서는 정적 프로퍼티를 참조할 수 없다.

### 25.5.5 클래스에서 정의한 메서드의 특징

1. `function` 키워드를 생략한 메서드 축약 표현을 사용한다.
1. 객체 리터럴과 다르게 클래스에서 메서드를 정의할때는 콤마가 필요없다.
1. 암묵적으로 `strict mode` 로 실행된다.
1. 프로퍼티 어트리뷰트 \[\[Enumerable]] 의 값이 `false` 이다.
1. 내부 메서드 \[\[construct]] 를 갖지않는 `non-construct` 이다.

## 25.6 클래스의 인스턴스 생성 과정

> 클래스를 `new` 연산자와 함께 호출하면 \[\[constructor]] 를 실행하며 인스턴스화를 할 수 있다.
> 생성과정은 아래와 같다.

1. 인스턴스 생성과 `this` 바인딩
1. 인스턴스 초기화
1. 인스턴스 반환

## 25.7 프로퍼티

### 25.7.1 인스턴스 프로퍼티

> 인스턴스 프로퍼티는 `constructor` 내부에서 정의해야한다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

### 25.7.2 접근자 프로퍼티

> 클래스도 접근자 프로퍼티를 가질 수 있다.

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}
```

### 25.7.3 클래스 필드 정의 제안

> `Chrome v72 이상`, `Node.js v12 이상` 에서는 아래와 같은 문법으로 클래스 멤버변수를 선언할 수 있다.

```js
class Person {
  name = 'Lee';
}
```

### 25.7.4 private 필드 정의 제안

> `Chrome v74 이상`, `Node.js v12 이상` 에서는 아래와 같은 문법으로 `private` 필드를 정의할 수 있다.

```js
class Person {
  #name = 'lee';

  #printName() {
    console.log(this.#name);
  }

  getName() {
    this.#printName();

    return this.#name;
  }
}

const person = new Person();

person.getName();
// 에러
person.#name;
// 에러
person.#printName;
```

### 25.7.5

> `Chrome v72 이상`, `Node.js v12 이상` 에서는 아래와 같은 문법으로 `static filed` 를 정의할 수 있다.

```js
class Person {
  static name = 'lee';
  static #tempName = 'tempLee';

  static getName() {
    return this.name;
  }

  static #getTempName() {
    return this.#tempName;
  }
}
```

## 25.8 상속에 의한 클래스 확장

### 25.8.1 클래스 상속과 생성자 함수 상속

> 동일한 프로퍼티를 가지는 클래스가 여러개가 있다면 상위 클래스로 두어 추상화 한 후 상속받아 확장할 수 있다.

```js
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }
}

class Bird extends Animal {
  fly() {
    return 'fly';
  }
}
```

### 25.8.2 extends 키워드

> `extends` 키워드를 통해 상속받을 클래스를 정의한다.

```js
class Base1 {}
function Base2() {}
class Base3 {}
class Base4 {}

// 일반적인 클레스 상속
class Child1 extends Base1 {}

// 생성자함수 상속
class Child2 extends Base2 {}

// 조건부 동적 상속
class Child3 extends (Math.random() > 0.5 ? Base3 : Base4) {}
```

### 25.8.5 super 키워드

- `super` 를 호출하면 수퍼클래스의 `constructor`를 호출한다.
- `super` 를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

#### super 호출

```js
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Child1 extends Base {
  // 암묵적 constructor define
  // constructor(...args) { super(...args) }
}

class Child2 extends Base {
  constructor(a, b, c) {
    super(a, b);

    this.c = c;
  }
}
```

##### super 호출 시 주의사항

1. 서브클래스에서 `constructor` 를 사용할 경우 반드시 `super` 를 호출해야한다.
1. 서브클래스 `constructor` 에서 `super` 를 호출하기전 `this` 를 참조할 수 없다.
1. `super` 는 반드시 서브클래스 `constructor` 에서만 호출한다.

#### super 참조

```js
class Base {
  hi() {
    console.log('hi');
  }

  static hi() {
    console.log('hi');
  }
}

class Child extends Base {
  temp() {
    super.hi();
  }

  static temp() {
    console.log('hi');
  }
}
```

##### super 참조 시 주의사항

1. 서브클래스의 프로토터입 메서드 내에서 `super.hi` 는 수퍼클래스 프로토타입 메서드 `hi` 를 가리킨다.
1. 서브 클래스의 정적 메서드 내에서 super.

### 25.8.6 상속 클래스의 인스턴스 생성 과정

1. 서브클래스 `super` 호출
1. 수퍼클래스의 인스턴스 생성과 `this` 바인딩
1. 수퍼클래스 인스턴스 초기화
1. 서브클래스 `constructor` 로의 복귀와 `this` 바인딩
1. 서브클래스의 인스턴스 초기화
1. 인스턴스 반환
