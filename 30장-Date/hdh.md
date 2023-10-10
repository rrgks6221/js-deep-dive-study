# 30장 Date

- 표준 빌트인 객체 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.

### 1. Date 생성자 함수

#### 1.1 new Date()

- Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다.

#### 1.2 new Date(milliseconds)

- Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.

#### 1.3 new Date(dateString)

- Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

#### 1.4 new Date(year, month[, day, hour, minute, second, millisecond])

- Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.
- 연, 월은 반드시 지정해야 하고 연, 월 이외의 지정하지 않은 옵션 정보는 0 또는 1로 초기화된다.

### 2. Date 메서드

#### 2.1 Date.now

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

#### 2.2 Date.parse

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.
- 인수의 형식은 new Date(dateString)의 인수와 동일하다.

#### 2.3 Date.UTC

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.
- 인수의 형식은 new Date(year, month[, day, hour, minute, second, millisecond])의 인수와 동일하다.

#### 2.4 Date.prototype.getFullYear

- Date 객체의 연도를 나타내는 정수를 반환한다.

#### 2.5 Date.prototype.setFullYear

- Date 객체의 연도를 나타내는 정수를 설정한다.
