# 24장 클로저

- 클로저: 클로저는 함수와 그 함수가 언언된 렉시컬 환경과의 조합

## 렉시컬 스코프

&nbsp;자바스크립트 엔진인 함수가 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프, 정적 스코프라고 한다.

&nbsp;상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정된다.

## 함수 객체 의 내부 슬롯 [[Enviroment]]

&nbsp;함수는 자신의 내부 슬롯 [[Enviroment]]에 상위 스코프의 참조를 저장한다. 함수 객체는 내부 슬럿 [[Enviroment]]에 저장한 상위 스코프를 자신이 존재하는 한 기억한다.

&nbsp;함수 객체는 내부 슬럿 [[Enviroment]]은 함수 저으이가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.

## 클로저와 렉시컬 환경

&nbsp;외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기사 종료한 외부 함수의 변수를 참조할 수 있다. 이런한 중첩 함수를 클로저라고 부른다.

&nbsp;자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저디. 하지만 자바스크립트에서 상위 스코프의 어떤 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프를 기억하지 않는다. 그렇기 때문에 모든 함수를 클로저라 보기 힘들다.

```js
function foo() {
  const x = 1;

  function bar() {
    debugger;

    console.log(x);
  }
  bar();
}

foo();
```

&nbsp;위와 같은 코드의 경우는 bar가 상위스코프인 foo의 지역 스코프를 참조하지만 bar의 생명주기사 foo의 생명주기 보다 짧기 때문에 클로저라 보기 어럽다.

&nbsp;즉 클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 증첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다. 그리고 클로저에 의해 참조되는 상위 스코프의 변술를 자유 변수라고 부른다.

## 클로저의 활용

&nbsp;클로저는 상태을 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

```js
const increase = (function () {
  let num = 0;

  return function () {
    return ++num;
  };
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

&nbsp;위 코드처럼 짜면 클로저는 상태가 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.

## 캡술화와 정보 은닉

&nbsp;캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메거드를 하나로 묶는 것을 말한다. 캡슐화는 프로퍼티나 메서드를 감출 목적으로 상요하기도 하는데 이를 정보 은닉이라고 한다.

```js
const Person = (function () {
  let _age = 0;

  function Person(name, age) {
    this.name = name;
    _age = age;
  }

  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  return Person;
})();

const me = new Person("Jang", 26);
me.sayHi();
console.log(me.name); // Jang
console.log(me._age); // undefined

const you = new Person("Kim", 20);
you.sayHi();
console.log(you.name); // Kim
console.log(you._age); // undefined
```

위 코드와 같이 짜면 name의 경우는 public해지고 \_age는 private해진다. 하지만 이와 같이 짠다면 \_age 변수의 상태가 유지 되지 않는다.

## 자주 발생하는 실수

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 3 3 3
}
```

&nbsp;위 코드는 처음 봤을 때 0, 1, 2가 출력될 거 같지만 위와 같이 3, 3, 3이 출력된다. 그 이유는 i는 var로 선언되었기 때문에 블록 레벨 스코프 단위가 아니라 함수 레벨 스코프이다. 그렇기 때문에 i는 전역 변수가 된다. 따라서 funcs 배열의 함수를 호출하게 되면 전역변수인 i를 참조하여 i의 값인 3이 출력된다.

```js
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 1, 2, 3
}
```

&nbsp;이렇게 실행하게 되면 즉시 실행 함수의 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수의 상위 스코프에 존재하게 된다, 그러면 반환한 중첩 함수는 상위 스코프를 기억하는 클로저이고 id는 자유 변수가 되어 그 값을 유지된다.

```js
var funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 1, 2, 3
}
```

let 키워드는 var와는 다르데 블록 레벨 스코프이기 때문에 코드 블록이 반복 실행될 때마다 렉시컬 환경이 생성된다. 이 때문에 안에 함수가 선언되어 for 문의 변수를 참조하게 되면 그 함수는 클로저가 되고 그 변수는 자유 변수가 된다.
