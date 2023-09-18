# 22장 this

### 1. this 키워드

> this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.

```js
// 예시 1
const circle = {
	radius: 5,
	getDiameter() {
		// 자신이 속한 circle 객체의 프로퍼티 radius를 참조
		return 2 * circle.radius;
		// return 2 * this.radius;
	}
};

console.log(circle.getDiameter()); // 10

// 예시 2
function Circle(radius) {
	// 생성할 인스턴스 이름을 알 수 없음
	????.radius = radius;
	// this.radius = radius;
}

Circle.prototype.getDiameter = function () {
	// 생성할 인스턴스 이름을 알 수 없음
	return 2 * ????.radius;
	// return 2 * ????.radius;
}

const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

- 객체 리터럴이 평가되어 circle에 할당된 이후에 getDiameter 메서드가 호출되기 때문에 circle을 참조할 수 있지만 자신이 속한 객체를 재귀적으로 참조하는 방식은 좋지 않다.
- 생성자 함수 방식으로 인스턴스를 생성하는 경우에는 생성자 함수 정의 시점에 인스턴스가 어떤 이름으로 생성될 지 몰라 사용할 수 없다.
- 객체 리터럴 메서드 내부의 this는 메서드를 호출한 객체를 가리키고 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

### 2. 함수 호출 방식과 this 바인딩

**this에 바인딩될 값은 함수 호출 방식에 따라 동적으로 결정된다.**

```js
const foo = function () {
  console.dir(this);
};

foo(); // window

const obj = { foo };
obj.foo(); // obj

new foo(); // foo {}

const bar = { name: "bar" };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

#### 2.1 일반 함수 호출

- 어떤 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.
- 일반 함수에서 this는 본래의 용도로(자기 참조 변수) 사용할 필요가 없으므로 strict mode가 적용된 일반 함수 내부의 this는 undefined가 바인딩된다.

#### 2.2 메서드 호출

- 메서드 내부에 this는 메서드를 호출한 객체가 바인딩된다.
- 메서드를 소유한 객체와 상관없이 this는 메서드를 호출한 객체를 가리킨다.

#### 2.3 생성자 함수 호출

- 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

#### 2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

- Function.prototype의 메서드로 모든 함수가 상속받아 사용할 수 있다.
- apply, call은 호출 방식만 다를 뿐 함수를 호출한다는 같은 역할을 하며 arguments 같은 유사 배열 객체에 배열 메서드를 사용하는 경우 사용한다.
- 메서드 내부의 this는 객체를 가리키고 그 메서드에 사용된 콜백 함수 내부의 this가 있다면 이는 전역 객체를 가리키기 때문에 일치하지 않는데 이때 bind를 사용함(또는 this가 상위 스코프의 this와 일치하는 화살표 함수를 사용)

#### call/apply

```js
function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  // Array.prototype.slice를 인수없이 호출하면 배열의 복사본을 생성한다.
  // Array.prototype.slice.call('hello');
  const arr = Array.prototype.slice.call(arguments);

  console.log(arr);

  return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```

#### bind

```js
// 예시 1
const person = {
  name: "Hong",
  foo(callback) {
    // 여기서의 this는 person
    setTimeout(callback, 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi my name is .
});

// 예시 2
const person = {
  name: "Hong",
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi my name is .
});
```
