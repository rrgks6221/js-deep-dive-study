# 29장 Math

### Math 프로퍼티

- Math.PI : 원주율값 반환

## Math 메서드

### Math.abs

- 인수로 전달된 숫자의 절대값을 반환, 절대값은 반드시 0 또는 양수

```js
Math.abs(""); // —0
Math.abs([]); //—0
Math.abs(null); //—0
Math.abs(undefined); // — NaN
Math.abs({}); // — NaN
Math.abs("string"); // — NaN
Math.abs(); // — NaN
```

### Math.round

- 인수 소숫점 아래 반올림

### Math.ceil

- 인수 소숫점 아래 올림

### Math.floor

- 인수 소숫점 아래 내림

### Math.sqrt

- 인수 제곱근 반환

```js
Math.sqrt(9); // -3
```

### Math.random

- 난수 발생 메서드
- 0이상 1 미만 값 반환

### Math.pow

- 첫번째 인수를 밑으로 두번째 인수를 지수로 제곱 계산
- 인수가 한개일때

### Math.max

- 인수중 가장 큰 수 반환
- 인수 없으면 -Infinity 반환

### Math.min

- 인수 없으면 Infinity 반환
