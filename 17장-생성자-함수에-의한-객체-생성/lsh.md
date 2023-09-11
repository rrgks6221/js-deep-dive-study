# 17장 생성자-함수에-의한-객체-생성

## 17.1 Object 생성자 함수

객체 리터럴로도 object 를 생성할 수 있지만 `new Object()` 를 통해서도 생성할 수 있다.

JS 는 객체 뿐만 아닌 다른 생성자 함수들도 추가로 제공한다.

- String
- Number
- Boolean
- Function
- Array
- RegExp
- Date

### 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

> 객체 리터럴은 문법이 직관적이지만 같은 property 를 가지는 객체를 여러개 생성할 때 같은 코드가 여러번 생성되므로 가독성 및 유지보수성을 해치는 문제가 있다.

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 생성자 함수를 이용하면 프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성할 수 있다. 이는 클레스와 비슷하다.
- 생성자 함수는 객체를 생성하는 함수다
- new 연산자가 없다면 일반 `function` 으로 인식한다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const c1 = new Circle(5);
const c2 = new Circle(10);
const c3 = Circle(5);

console.log(c1.getDiameter()); // 10
console.log(c2.getDiameter()); // 20
console.log(c3); // undefined
```

### 17.2.3 생성자 함수의 인스턴스 생성 과정

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const c1 = new Circle(10);
```

위의 코드의 인스턴스 생성과정에 대해 알아보자

1. 정의된 함수가 new 연산자로 호출되면 내부적으로 인스턴스가 생성되고 `this` 를 바인딩한다.
2. 프로퍼티들을 `this` 객체에 초기화 및 할당한다.
3. `this` 객체를 반환한다.
   - 이때 `return` 문이 없기때문에 암묵적으로 `this` 가 반환되기에 주의해야한다.
   - `return this;` 를 명시적으로 반환해도 된다.
   - `return this;` 가 아닌 다른 `return` 문을 사용하면 생성자 함수의 기본동작을 훼손하기에 사용하면 안된다.
   - 생성자 함수는 `return` 문을 생략하는게 좋다.

### 17.2.4 내부 메서드 \[\[Call]] \[\[Construct]]

> 함수도 객체이다. 함수는 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고있으면 \[\[Call]] 과 \[\[Construct]] 또한 가지고 있다.

- 일반적인 함수 호출을 하면 \[\[Call]] 이 호출된다.
- new 연산자와 함께 함수 호출을 하면 \[\[Construct]] 가 호출된다.

### 17.2.5 constructor 와 non-constructor 의 구분

> JS 는 \[\[Construct]] 를 가지냐 가지지 않냐로 `constructor` 와 `non-constructor` 를 구분한다.
> 아래 특징을 봤을 때 `this` 바인딩 유무 \[\[Construct]] 유무에 따라 구분한다고 볼 수 있다.

- constructor
  - 함수 선언문, 함수 표현식, 클레스(클레스도 함수)
  - \[\[Construct]] 를 가지고 있다.
  - `this` 를 내부 인스턴스에 바인딩할 수 있다.
    - 무조건적으로 바인딩하지 않는 이유는 new 연산자에서 설명한다.
  - `new` 연산자를 통해 인스턴스를 생성할 수 있다.
- non-constructor
  - 메서드(ES6 메서드 축약표현), 화살표 함수
  - \[\[Construct]] 를 가지고 있지 않다.
  - `this` 를 내부 인스턴스에 바인딩할 수 없다.
  - `new` 연산자를 통해 인스턴스를 생성할 수 없다.
    - 이때 엔진 내부적으로 \[\[Construct]] 를 호출하는데 해당 슬롯이 없기 때문에 Error 가 발생한다.

### 17.2.6 new 연산자

> 일반 함수와 생성자 함수는 형식적 차이는 엇지만 `new` 연산자를 사용하냐 안하냐에 따라 내부적으로 \[\[Call]] 이 호출되냐 \[\[Construct]] 가 호출되나에 차이이다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// \[\[Construct]] 가 호출된다.
const c1 = new Circle(5);
// \[\[Call]] 이 호출된다.
// 내부적으로 this 를 바인딩하지 않기 때문에 상위 this 인 globalThis 에 바인딩된다.
const c2 = Circle(10);

console.log(c1.getDiameter()); // 10
console.log(globalThis.getDiameter()); // 20
```

위에 예제에서 보듯이 개발자의 실수로 예기치않은 오류가 발생할 수 있기 때문에 `naming convention` 을 지키는 것이 좋다.

- constructor
  - PascalCase 를 사용하여 명명한다.
  - `function Circle() { }`
- non-constructor
  - camelCase 를 사용하여 명명한다.
  - `function circle() { }`

### 17.2.7 new.target

> naming convention 을 지키더라도 개발자의 실수가 있을 수 있기 때문에 방어코드를 사용하여 올바르게 사용할 수 있도록 할 수 있다.

```js
function Circle(radius) {
  // new 연산자 없이 호출됐다면 new.target 이 undefined 이다.
  if (!new.target) {
    // 재귀호출을 통해 [[Construct]] 호출을 통한 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```
