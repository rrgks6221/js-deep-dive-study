# 32장 String# 32장 String

## 32.1 String 생성자 함수

> `String`객체는 new 연산자를 통해 호출하거나 new 연산자 없이 생성이 가능하다.
> 물론 리터럴을 통해 생성도 가능하다.

- new 연산자와 함께 호출하면 String 래퍼 객체를 호출한다.
- new 연산자 없이 호출하면 강제 형변환을 하며 문자열을 반환한다.

```js
const strObj = new String('lee');
console.log(strObj); // String{0: "L" ..., length: 3, [[PrimitiveValue]]: 'lee"}

const str = String(lee);
console.log(str); // 'lee'
```

## 32.3 String 메서드

> `String`객체는 여러 prototype 메서드를 제공한다.
> String 타입은 불변이기 떄문에 부수효과가있는 메서드가 존재하지 않는다.
