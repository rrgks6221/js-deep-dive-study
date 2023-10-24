# 46장 제너레이터와-async-await

## 제너레이터란?

- ES6에서 도입된 generator는 코드 블록의 실행을 일시중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

## 제너레이터 함수의 정의

function\* 키워드로 선언, 하나 이상의 yield 표현식 포함, 나머지는 일반 함수와 같다.

```js
function* genDecFunc() {
  yield 1;
}

const genExpFunc = function* () {
  yield 1;
};

const obj = {
  *getObjMethod() {
    yield 1;
  },
};

class MyClass {
  *genClsMethod() {
    yield 1;
  }
}
```

```js
// (*) 의 위치는 function 키워드와 함수 이름 사이면 상관 없다.
// 하지만 function 키워드 바로 뒤에 붙이는 것을 권장한다.
function* genFunc() { yield 1; }
function * genFunc() { yield 1; }
function  *genFunc() { yield 1; }
function *genFunc() { yield 1; }
function*genFunc() { yield 1; }

// 화살표 함수로 정의할 수 없음.
const genArrowFunc = * () => { yield 1; } ; // SyntaxError

// new 연산자와 함께 생성자 함수로 호출할 수 없음.
function* genFunc() {
  yield 1;
}

new genFunc(); // TypeError
```

## 제너레이터 객체

제너레이터 함수 호출시 일반 함수처럼 코드 블록 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다.
제너레이터 객체는 iterable 이면서 동시에 iterator 이다.

```js
function* genFunc() {
  yield 1;
  yield 2;
}

const generator = genFunc();

// Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받음.
console.log(Symbol.iterator in generator); // true

// 이터레이터는 next 메서드를 가짐.
console.log('next' in generator); // true
iterator 에는 없는 return, throw 메서드를 갖는다.
next 호출:
제너레이터 함수의 yield 표현식까지 코드 블록 실행
return iterator result: { value: yield된 값, done: false}
return 호출:
return iterator result: { value: 인수, done: true}
throw 호출:
인수로 전달 받은 에러 발생시킴
return iterator result: { value: undefined, done: true}
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch(e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return('End')); // {value: 'End', done: true}
console.log(generator.throw('Error')); // {value: undefined, done: true}
```

## 제너레이터의 일시 중지와 재개

```js
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}

// 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행함.
console.log(generator.next()); // {value: undefined, done: true}
```

```js
function* genFunc() {
  // 처음 next 메서드 호출시 첫 번째 yield 표현식까지 실행되고 일시 중지됨.
  // x 변수에는 아직 아무것도 할당되지 않았음. next 메서드가 두 번째 호출될 때 결정됨.
  const x = yield 1;

  // 두 번째 next 메서드 호출하며 전달한 인수 10은 x변수에 할당됨.
  // 즉, const x = yield 1; 은 두 번째 next 메서드 호출시 완료됨.
  const y = yield x + 10;

  // 세 번째 next 메서드 호출하며 전달한 인수 20은 y변수에 할당됨.
  // 즉, const y = yield (x + 10); 은 세 번째 next 메서드 호출시 완료됨.
  // 이때 함수의 반환값 x+y 는 next 메서드가 반환한 이터레이터 리절트 객체의 value에 할당됨
  // 제너레이터에서는 값을 반환할 필요가 없고, return은 종료의 의미로만 사용해야함.
  return x + y;
}

const generator = genFunc(0);

let res = generator.next();
console.log(res); // {value: 1, done: false}

res = generator.next(10);
console.log(res); // {value: 20, done: false}

res = generator.next(20);
console.log(res); // {value: 30, done: true}
```

## 제너레이터의 활용

### 이터러블의 구현

```js
// 이터레이션 프로토콜 준수해 생성하는 방식보다 간단히 구현할 수 있음.
const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
})();

for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num); // ...
}
```

### 비동기 처리

- 제너레이터를 활용해서 비동기 처리를 동기처럼 동작하게 하는 코드 예제가 있지만 다음 장에서 async/await 에서 다루므로 생략함.

## async/await

- ES8에서 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처럼 동작하도록 구현할 수 있는 async/await 가 도입되었다.
- 프로미스를 기반으로 동작한다. 프로미스의 후속 처리 메서드 없이 마치 동기 처리 처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

### async 함수

- await 키워드는 반드시 async 함수 내부에서 사용해야 한다.
- async 함수는 언제나 프로미스를 반환한다.
- async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.
- 클래스의 constructor 메서드는 async 함수가 될 수 없다.

```js
// ex
async function foo(n) { return n; }
foo(1).then(v =. console.log(v)); // 1

const bar = async function(n) { return n; }
bar(2).then(v =. console.log(v)); // 2

const baz = async n => n;
baz(3).then(v =. console.log(v)); // 3

const obj = {
  async foo(b) { return n; }
}
obj.foo(4).then(v => console.log(v)); // 4

class MyClass {
  async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v)); // 5
```

### await 함수

- await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.
- await 키워드는 반드시 프로미스 앞에서 사용해야 한다.
- 모든 프로미스에 await 키워드 사용하는 것을 주의해라. 서로 연관이 없이 개별적으로 수행되는 비동기 처리에서는 순차적으로 처리할 필요가 없다. 하지만 비동기 처리의 순서가 보장되어야 할 때는 모든 프로미스에 await 키워드를 사용하여 순차적으로 처리한다.

### 에러 처리

- async/await 에서 에러처리는 try catch 문을 사용할 수 있다.

```js
const foo = async () => {
  try {
    const wrongUrl = '...';

    const response = await fetch(wrongUrl);
    const data = await response.json();
  } catch (e) {
    console.error(e); // fail to fatch
  }
};

foo();

// ex. 후속처리 메서드 사용
const foo = async () => {
  const wrongUrl = '...';

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo().then(console.log).catch(console.error); // fail to fatch
```
