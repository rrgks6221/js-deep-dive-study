# 28장 Number

## Numbeer 생성자 함수

Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다. 인수를 숫자로 전달하면 [[NumberData]] 내부 슬롯에 그 값을 할당한 래퍼 객체를 생성한다. 숫자가 아닌 경우 숫자로 강제 변환한 후 [[NumberData]] 내부 슬롯에 할당한다. 변환할 수 없는 경우는 NaN을 할당한다.

new 연산자 없이 Number 생상자 함수를 호출하면 숫자를 반환한다. 이를 통해 타입 변환하기도 한다.

## Number 프로퍼티

### Number.EPSILON

1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이이다. 부동소수점 산술 연산은 정확한 결과를 기대하기 어려운데 이 Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

### Number.MAX_VALUE

자바스크립트에서 표현할 수 있는 가장 큰 양수 값. 이보다 더 크면 Infinity다.

### Number.MIN_VALUE

자바스크립트에서 표현할 수 있는 가장 작은 양수 값. 이보다 작으면 0이다.

### Number.MAX_SAFE_INTEGER

안전하게 표현할 수 있는 가장 큰 정수값

### Number.MIN_SAFE_INTEGER

안전하게 표현할 수 있는 가장 작은 정수값

### Number.POSITIVE_INFINITY

양의 무한대

### Number.NAGATIVE_INFINITY

음의 무한대

## Number 메서드

Number의 메서드들 중 빌트인 전역 함수와 같은 이름인 메서드들이 있는데 차이점이 존재한다. 빌트인 함수는 암묵적 타입 변환하여 실행하지만 Number의 메서드는 암묵적 타입 변환이 없다.

### Number.isFinite

정상적인 유한수인지 확인하여 불리언 값으로 반환하는 메서드, 숫자가 아니면 false

### Number.isNaN

NaN인지 검사, 숫자가 아니면 모두 NaN으로 판단

### Number.isSafeInteger

안전한 정수인지 검사

### Number.prototype.toExponential

숫자를 지수 표기법으로 변환하여 문자열로 반환

```js
77.toExponential()
```

위와 같이 사용하면 .의 의미가 모호 해진다. 자바스크립트는 이를 소수 구분 기호로 해석하기 때문에 에러가 발생하게 된다. 이 때문에 다음과 같은 방법 들고 사용해야한다.

```js
(77.123).toExponential();
(77).toExponential();
(77).toExponential();
```

### Number.prototype.toFixed

숫자를 반올림하여 문자열로 반환. 소수점 자릿수를 나타내는 정수값을 인수로 전달할 수 있다.

### Number.prototype.toPrecision

인수로 전달받은 전체 자릿수까지 요효하도록 나머지 자릿수를 반올림하여 문자열로 반환

### Number.prototype.toString

숫자를 문자열로 반환. 진법을 나타내는 정수값을 인수로 전달
