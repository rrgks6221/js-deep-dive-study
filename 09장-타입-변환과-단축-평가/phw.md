# 09장 타입-변환과-단축-평가

## 타입 변환

- 개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환, 타입 캐스팅이라고 함
- 개발자의 의도와는 상관없이 js엔진에 의해 암묵적으로 타입이 자동 변환되는 것을 암묵적 타입 변환, 강제 타입 변환이라고 함
- 타입 변환은 기존 원시값을 사용해 새로운 원시 값을 만드는 것
  - 암묵적 타입변환의 경우 재할당 없이 새로운 값을 한번 쓰고 버림

### 암묵적 타입 변환

- 개발자의 의도와 상관없이 코드 문맥을 고려해 암묵적으로(강제적으로) 데이터 변환
- 문자열 변환 : + 연산자 피연산자중 문자열이 아닌 값을 문자열로 변환
- 숫자 변환 : 산술 연산자 피연산자중 숫자값이 아닌 값을 숫자로 변환
- 불리언 변환 : if, for 문과 같이 조건식의 평가 결과가 불리언 타입이 아닐때 불리언 변환
  - 불리언 타입이 아닌값을 Truthy, Falsy값으로 구분
  - Falsy값 : false, undefined, null, 0, -0, NaN, ''(빈 문자열)
  - Falsy 를 제외한 모든 값은 Truthy

### 단축 평가

- 논리합(||)또는 논리곱(&&)연산자 표현식은 언제나 2개의 피연산자 어느 한쪽으로 평가된다

  - 논리곱 : 'first' && 'second' 좌항이 평가되고 우항에 따라 값이 다르게 평가 됨 --> second 반환
  - 논리합 : 'first' || 'second' 좌항이 평가 됐을 때 이미 True 이기 때문에 --> first 반환

- 단축평가 : 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다.
- 표현식을 평가하는 도중에 평가결과가 확정된 경우 나머지 평가 과정을 생략하는 것

|단축평가 표현식|평가 결과|
|true&#124;&#124;anything|true|
|false&#124;&#124;anything|anything|
|true&&anything|anything|
|false&&anything|false|

```js
//단축 평가 예제
let msg = true && "완료"; // msg -> '완료'
msg = false || "미완료"; // msg -> '미완료'
```

### 옵셔널 체이닝 연산자

- ?. 연산자는 좌항의 피연산자가 null 또는 undefined 의 경우 undefine 반환 아닐경우 우항 프로퍼티 참조를 이어감

### null 병합 연산자

- ?? 연산자는 좌항의 피연산자가 null 또는 undefined 의 경우 우항의 피연산자 반환 아니면 좌항 반환
