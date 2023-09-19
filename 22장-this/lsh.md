# 22장 this

## 21.1 this 키워드

> `this` 란 자신이 속한 객ㅊ체 또는 자신이 생성할 인스턴스를 가리키는 자기참조 변수이다.

```js
console.log(this); // globalThis

function square(number) {
  console.log(this);

  return number * number;
}
square(1);

const person = {
  name: 'lee',
  getName() {
    console.log(this); // {name: "lee", getName: f}
    return this.name;
  },
};
console.log(person.getName()); // lee

function Person(name) {
  this.name = name;

  console.log(this); // Person {name: "lee"}
}

const me = new Person('lee');
```

위의 예제를 볼때 아래 특징을 알 수 있다.

- 전역에서의 `this` 는 `globalThis` 를 가리키다.
- 일반함수 내부에서의 `this` 는 `globalThis` 를 가리킨다.
- 메서드 내부에서 `this` 는 메서드를 호출한 `객체`를 가리킨다
- 생성자 함수 내부에서는 `this` 는 생성자 함수가 생성할 인스턴스를 가리킨다.
- 예제에는 없지만 `strict mode` 에서는 일반함수 내부에 this 에는 `undefined` 가 적용된다. 일반함수에서는 `this` 를 사용할 필요가 없기 때문이다.

## 22.2 함수 호출방식과 this 바인딩

> `this` 가 생성되는 시점은 함수 호출방식에 따라 조금씩 다르다.

함수호출 방식은 4가지가 있다.

1. 일반 함수 호출
1. 메서드 호출
1. 생성자 함수 호출
1. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

### 22.2.1 일반 함수 호출

> 일반 함수로 호출할 경우 `this` 는 `globalThis` 를 가리킨다.

```js
function foo() {
  let a = 'a';
  console.log(this); // globalThis
  function bar() {
    console.log(this); // globalThis
    console.log(this.a); // undefined
  }

  bar();
}

foo();
```

### 22.2.2 메서드 호출

> `메서드`를 호출할 경우 `this` 는 메서드를 호출한 객체를 가리킨다.

```js
function Person(name) {
  this.name = 'name';
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('lee');

// getName 을 호출한 객체는 me 이다.
console.log(me.getName()); // lee

Person.prototype.name = 'seokho';

// getName 을 호출한 객체는 Person.prototype 이다.
console.log(Person.prototype.getName()); // seokho
```

### 22.2.3 생성자 함수 호출

> 생성자함수를 호출할 경우 `this`에는 미래에 생성할 인스턴스에 바인딩된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const c1 = new Circle(5);
const c2 = new Circle(10);

console.log(c1.getDiameter()); // 10
console.log(c2.getDiameter()); // 20
```

예제에 보이는거처럼 인스턴스들은 각각 다른 `this` 를 가진다.

### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

> `Function` 의 prototype method 인 `apply`, `call`, `bind` 를 통해 메서드를 간접호출해 `this` 를 바인딩 할 수 있다.

- [Function.prototype.apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
  - 함수에 `this` 바인딩 및 매개변수를 전달한 뒤 해당 함수를 실행한다.
- [Function.prototype.call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  - 함수에 `this` 바인딩 및 매개변수를 전달한 뒤 해당 함수를 실행한다.
- [Function.prototype.bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  - 함수에 `this` 바인딩 및 매개변수를 전달한 뒤 해당 함수를 실행하지 않는다..
