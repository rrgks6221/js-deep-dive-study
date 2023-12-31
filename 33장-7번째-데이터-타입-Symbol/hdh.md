# 33장 7번째-데이터-타입-Symbol

### 1. 심벌이란?

- ES6에서 도입된 7번째 데이터 타입으로 원시 타입의 값이다.
- 다른 값과 중복되지 않는 유일무이한 값이다.
- 주로 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

### 2. 심벌 값의 생성

#### 2.1 Symbol 함수

- 심벌 값은 Symbol 함수를 호출하여 생성한다.
- 다른 원시값과 달리 리터럴 표기법을 통해 값을 생성할 수 없다.
- 심벌 값에 대한 설명 용도의 문자열을 인수로 전달할 수 있다.

#### 2.2 Symbol.for/Symbol.keyFor 메서드

- Symbol.for 메서드는 인수로 전달받은 문자열을 키로 전역 심벌 레지스트리에서 검색한다. 검색에 성공하면 검색된 심벌 값을 반환하고 검색에 실패하면 전달받은 문자열을 키로 전역 심벌 레지스트리에 새로운 심벌 값을 생성하고 생성된 심벌 값을 반환한다.
- Symbol.keyFor 메서드는 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

### 3. 심벌과 상수

- 변수 이름에 의미가 있는 상수를 사용하는 경우 다른 원시 값 대신 중복 가능성이 없는 심벌을 사용하면 좋다.

### 4. 심벌과 프로퍼티 키

- 객체의 프로퍼티키는 문자열 또는 심벌 값으로 만들 수 있으며 동적으로 생성할 수 있다.
- 심벌 값을 프로퍼티 키로 사용하거나 프로퍼티에 접근할 때 대괄호를 사용해야 한다.

### 5. 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for … in 문이나 Object.keys 등의 메서드로 찾을 수 없다.
- 외부에 노출할 필요가 없는 프로퍼티를 은닉할 때 사용하면 좋다.

### 6. 심벌과 표준 빌트인 객체 확장

- 표준 빌트인 객체에 사용자 정의 메서드를 추가하면 이후 사양에 같은 이름의 메서드가 나올 경우 사용자 정의 메서드가 추가될 메서드를 덮어쓰게 된다.
- 이럴 경우 심벌을 사용하면 어떤 프로퍼티 키와도 중복될 위험이 없어서 안전하게 표준 빌트인 객체를 확장할 수 있다.

### 7. Well-known Symbol

- 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서 Well-known Symbol이라 부른다.
