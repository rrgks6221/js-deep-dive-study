# 33장 7번째-데이터-타입-Symbol

## 33.1 심벌이란?

> `Symbol`은 `ES6`에서 도입된 7번째 데이터타입으로 변경 불가능한 원시값이다.
> 다른값과 중복되지않는 유일무이한 값이다.

## 33.2 심벌값의 생성

### 33.2.1 Symbol 함수

> `Symbol`은 함수를 호출하여 생성한다.
> 이때 `new` 연산자와 같이 호출하면 에러가 발생한다.

```js
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

new Symbol(); // TypeError

const mySymbol1 = Symbol('str');
const mySymbol2 = Symbol('str');

// 같은 값으로 만들어도 유일무이한 값이기때문에 false 가 나온다.
console.log(mySymbol1 === mySymbol2); // false
// 내부 값을 사용하고싶다면 description property 에 접근한다.
console.log(mySymbol1 === 'str'); // true
```

### 33.2.2 Symbol.for / Symbol.keyFor 메서드

> `Symbol`은 이 두개의 메서드를 이용해 전역 Symbol 레지스트리에서 관리할 수 있다.
> `Symbol`함수를 이용해 생성된 값과는 별개의 값이다.

## 33.5 심벌과 프로퍼티 은닉

> `Symbol`값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 일반적으로 접근할 수 없다.
> 이를통해 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

```js
const obj = {
  [Symbol('str')]: 1,
};

for (const key in obj) {
  console.log(key); // 출력 X
}

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(str)]
```

## 33.6 심벌과 표준 빌트인 객체 확장

> `Symbol`은 유일무이한 값이기때문에 빌트인객체를 확장할 때 용이하다.

일반적으로 표준 빌트인 객체를 확장하는것은 권장하지 않는데 후에 개발자가 추가한 메서드와 같은 이름의 메서드가 표준으로 채택되어 확장될 수 있기 때문이다.
하지만 Symbol을 통해 생성하면 이런 충돌을 걱정하지 않아도 된다.

## 33.7 Well-known-Symbol

> `Symbol`은 중복되지 않는 상수값을 생성, 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해 도입되었다.
