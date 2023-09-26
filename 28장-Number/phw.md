# 28장 Number

## Number 프로퍼티

### Number.EPSILON

- ES6에서 도입, 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이
- 부동 소수점때문에 발생하는 오류해결을 위해 추가

### max, min value

- 크기순 정렬

1. Infinity
1. Number.MAX_VALUE : 가장 큰 양수
1. Number.W_SAFE_INTEGER : 안전하게 표현할 수 있는 가장 큰 수
1. Number.MIN_VALUE : 가장 작은 양수
1. 0
1. Number.MIN_SAFE_INTEGER : 안전하게 표현할 수 있는 가장 작은 수

## Number 메서드

### Number.isFinite

- 인수가 유한수이면 true 반환

### Number.islnteger

- 인수가 정수라면 true 반환
- 암묵적 타입변환이 일어나지 않는다

### Number.isNaN

- 빌트인 전역함수 isNaN -> 암묵적 타입변환이 일어남
- `Number.isNaN -> 암묵적 타입변환이 일어나지 않음`

### Number.prototype.toExponential

- 숫자를 지수표기법으로 변환해 문자열로 반환

```js
(77.1234).toExponential(); // — "7.71234e+l"
(77.1234).toExponential(4); // — "7.7123e+l"
```

### Number.prototype.toFixed

- 숫자를 반올림

```js
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // - "12346"
// 소수점 이하 1자릿수 유효, 나머지 반올림
(12345.6789).toFixed(l); // - "12345.7"
// 소수점 이하 2자릿수 유효, 나머지 반올림
(12345.6789).toFixed(2); // - "12345.68"
```

### Number.prototype.toString

```js
// 인수를 생략하면 10잔수 문자열을 반환한다.
(10).toString(); // — "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // - "10000"
// 8잔수 문자열을 반환한다.
(16).toString(8); // — "20"
// 16잔수 문자열을 반환한다.
(16).toString(16); // — "10"
```
