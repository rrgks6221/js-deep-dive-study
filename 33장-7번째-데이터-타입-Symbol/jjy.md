# 33장 7번째-데이터-타입-Symbol

- 다른 값과 중복되지 않는 유일무이한 값이다.
- 문자열과 같이 프로퍼티의 키값으로 사용할 수 있다.
- 변경불가능한 원시값이다. ( 원시값이라서 new를 이용해서 생성하면 안됨 )

```js
const symbol = Symbol('apple');
const copy = Symbol('apple');

console.log(symbol === copy); // false

console.log(symbol.description); // "apple"
console.log(symbol.toString()); // Symbol(apple)

// 문자열 or 숫자로 암묵적 변환 X
console.log(symbol + ''); // error
console.log(+symbol); // error

// 불리언 암묵적 변환 O
console.log(!!symbol); // true

// 전역 심벌 레지스트리에 값 저장 ( 없으면 생성 있으면 가져다 사용 )
const globalSymbol = Symbol.for('g');
const copySymbol = Symbol.for('g');
console.log(globalSymbol === copySymbol); // true

// 전역 심벌 값의 키값 가져오기
Symbol.keyFor(globalSymbol);
```

- enum처럼 활용가능함
- 프로퍼티로 만들면 기본적으로 은닉되며, Object.getOwnPropertySymbols로 찾을 수 있음
  profile
