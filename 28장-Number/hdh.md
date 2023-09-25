# 28장 Number

### 1. Number 생성자 함수

- 표준 빌트인 객체인 Number 객체는 생성자 함수로 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.
- Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 \[[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다.
- Number 생성자 함수에 인수로 숫자를 전달하면서 new 연산자와 함께 호출하면 \[[NumberData]] 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성한다.
- new 연산자 없이 호출하면 전달한 인수가 숫자로 반환된다. 명시적 타입 변환할 때 사용하기도 한다.

### 2. Number 프로퍼티

#### 2.1 Number.EPSILON

- 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이.
- 부동소수점 표준 IEEE 754는 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 발생할 수 밖에 없는 구조적 한계가 있다.
- Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용된다.

#### 2.2 Number.MAX_VALUE

- 자바스크립트에서 표현할 수 있는 가장 큰 양수 값이다.
- Number.MAX_VALUE보다 큰 숫자는 Infinity다.

#### 2.3 Number.MIN_VALUE

- 자바스크립트에서 표현할 수 있는 가장 작은 양수 값이다.
- Number.MIN_VALUE보다 작은 숫자는 0이다.

#### 2.4 Number.MAX_SAFE_INTEGER

- 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정숫값이다.

#### 2.5 Number.MIN_SAFE_INTEGER

- 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정숫값이다.

#### 2.6 Number.POSITIVE_INFINITY

- 양의 무한대를 나타내는 숫자값 Infinity와 같다.

#### 2.7 Number.NEGATIVE_INFINITY

- 음의 무한대를 나타내는 숫자값 -Infinity와 같다.

#### 2.8 Number.NaN

- 숫자가 아님을 나타내는 숫자값이다.

### 3. Number 메서드

#### 3.1 Number.isFinite

- 인수로 전달된 숫자값이 유한수인지(무한대가 아닌지) 검사하여 결과를 불리언 값으로 반환한다.
- 인수가 NaN이면 언제나 false를 반환한다.

#### 3.2 Number.isInteger

- 인수로 전달된 숫자값이 정수인지 검사하여 결과를 불리언 값으로 반환한다.

#### 3.3 Number.isNaN

- 인수로 전달된 숫자값이 NaN인지 검사하여 결과를 불리언 값으로 반환한다.

#### 3.4 Number.isSafeInteger

- 인수로 전달된 숫자값이 안전한 정수인지 검사하여 결과를 불리언 값으로 반환한다.

#### 3.5 Number.prototype.toExponential

- 숫자를 지수 표기법으로 변환하여 문자열로 변환한다.
- 숫자 리터럴과 함께 Number 프로토타입 메서드를 사용하는 경우 그룹 연산자를 사용할 것을 권장한다.

#### 3.8 Number.prototype.toString

- 숫자를 문자열로 변환하여 반환한다.
- 진법을 나타내는 2~36 사이의 정숫값을 인수로 전달할 수 있고 생략하면 기본값 10진법이 지정된다.
