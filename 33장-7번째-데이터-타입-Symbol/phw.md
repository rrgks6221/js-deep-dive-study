# 33장 7번째-데이터-타입-Symbol

## Symbol

- 원시 타입의 값
- 다른값과 중복되지 않는 유일무이한 값

  ```js
  const foo = Symbol("same value");
  const bar = Symbol("same value");

  console.log(foo === bar); // ==> false
  ```

- new 연산자 없이 Symbol 함수 호출

  ```js
  const temp = Symbol();
  ```

- 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다 (단 boolean 예외)

---

### 메서드

- Symbol.for

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const si = Symbol.for( ySymbc );
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for( /Sy L );
console.log(sl === s2); // true
```

- Symbol.keyFor

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const si = Symbol.for("mySymbol");
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(sl); // — mySymbol
// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s2 = Synibol("foo");
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s2); // — undefined
```
