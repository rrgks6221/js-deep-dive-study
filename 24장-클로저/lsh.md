# 24장 클로저

> 클로저란 함수형 프로그래밍 언어에서 사용되는 특성이다.

```js
const x = 1;

function outerFn() {
  const x = 10;

  function innerFn() {
    console.log(x); // 10
  }

  innerFn();
}

outerFn();
```

- 위에 예제에서 `innerFn` 이 `outerFn` 의 `x` 변수에 접근할 수 있는 이유는 `outerFn` 이 `innerFn` 의 상위 스코프이기 때문이다.

```js
const x = 1;

function outerFn() {
  const x = 10;
  innerFn();
}

function innerFn() {
  console.log(x); // 1
}

outerFn();
```

- 위의 예제까지 살펴보면 호출된 위치가 아닌 선언된 위치에 따라 스코프 체인이 생성되는것을 알 수 있다.

## 24.1 렉시컬 스코프

> 렉시컬 환경의 "외부 렉시컬환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.

## 24.2 함수 객체의 내부 슬롯

> 렉시컬 스코프는 함수 객체의 내부 슬롯에 저장하고 참조한다.

- 함수 선언 시 자신의 상위 스코프에 대한 참조를 \[\[Environment]] 슬롯에 저장하고 해당 값을 읽어 참조한다.

## 24.3 클로저와 렉시컬 환경

> 외부 함수보다 내부 함수가 더 오래 유지되는 경우 이미 생명주기가 종료된 외부 함수의 변수를 참조하는 내부 함수를 클로저라고 부른다.

```js
function foo() {
  const x = 1;
  const y = 2;

  function bar() {
    console.log(x); // 1
  }
  return bar;
}

const temp = foo();
temp();
```

위의 예제의 bar 함수를 클로저라고 부른다.

- foo 함수의 생명주기가 종료됐음에도 상위 스코프의 변수를 참조할 수 있다.
- 외부 함수인 `foo` 보다 `bar` 함수의 생명주기가 더 길다.
- 상위 스코프에 대한 변수는 참조하는 변수에 대해서만 남겨놓고 나머지 변수는 가지고있지 않는다. 이런 변수를 자유변수라고 한다.

## 24.4 클로저의 활용

> 클로저는 변수를 은닉할 때 자주 사용된다.
> 상위스코프의 변수를 항상 조작할 수 있기 때문에 private 한 상위 스코프를 가지는 변수를 만들 수 있다.

```js
const Counter = function () {
  // 이 변수는 생성자를 통해 할당된 객체에서는 참조하지 못한다.
  // 하나의 생성자로 만들어진 객체 내에서는 공유한다.
  let num = 0;

  function Counter() {}

  Counter.prototype.increase = function () {
    return ++num;
  };
  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };
};

const Counter = new Counter();
```

## 24.5 캡슐화와 정보 은닉

> JS 에서는 `private`, `protected`, `public` 같은 접근제한자가 없기때문에 클로저를 통해 정보를 은닉한다.

## 24.6 자주 발생하는 실수

> 책에 소개되어있는 예제들은 사실 `var` 를 사용하지 않으면 발생하지 않는 문제이다. `let` 과 `const` 사용을 생활화하자.
