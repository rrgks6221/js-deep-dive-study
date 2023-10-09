# 34장 이터러블

### 1. 이터레이션 프로토콜

- 순회 가능한 데이터 컬렉션을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙(ES6에서 도입)

#### 1.1 이터러블

- Symbol.iterator 메서드(직접 구현 또는 프로토타입 상속)를 갖는 객체
- for … of 문으로 순회할 수 있고 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

#### 1.2 이터레이터

- 이터러블이 갖는 Symbol.iterator 메서드가 반환하는 값
- 이터레이터는 각 요소를 순회하기 위한 포인터 역할을 하는 next 메서드를 갖는다.
- next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
- 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블의 값을 done 프로퍼티는 순회 완료 여부를 나타낸다.

### 2. 빌트인 이터러블

| 빌트인 이터러블 | Symbol.iterator 메서드                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| Array           | Array.prototype[Symbol.iterator]                                                |
| String          | String.prototype[Symbol.iterator]                                               |
| Map             | Map.prototype[Symbol.iterator]                                                  |
| Set             | Set.prototype[Symbol.iterator]                                                  |
| TypedArray      | TypedArray.prototype[Symbol.iterator]                                           |
| arguments       | arguments[Symbol.iterator]                                                      |
| DOM 컬렉션      | NodeList.prototype[Symbol.iterator], HTMLCollection.prototype.[Symbol.iterator] |

### 3. for … of 문

- 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.
- 내부적으로 이터레이터의 next 메서드를 호출하여 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for of 문의 변수에 할당한다.

### 4. 이터러블과 유사 배열 객체

- 유사 배열 객체는 배열처럼 인덱스로 값에 접근할 수 있고 for 문으로 순회 가능하지만 Symbol.iterator 메서드가 없기 때문에 이터러블이 아니다. 따라서 for … of 문으로 순회할 수 없다.
- 배열은 이터러블이다.(ES6에서 이터러블이 도입되면서 Symbol.iterator 메서드를 구현)
- arguments, NodeList, HTMLCollection은 유사 배열 객체이면서 이터러블이다.(ES6에서 이터러블이 도입되면서 Symbol.iterator 메서드를 구현)
- 모든 유사 배열 객체가 이터러블인 것은 아니다.

### 5. 이터레이션 프로토콜의 필요성

- ES6 이전처럼 순회 가능한 데이터 컬렉션들이 각자 나름의 순회 방식을 가진다면 효율적이지 않다.
- 이터레이션 프로토콜은 다양한 데이터 공급자(이터러블)가 하나의 순회 방식을 갖도록 규정하여 데이터 소비자가 효율적으로 공급자를 사용할 수 있도록하는 인터페이스의 역할을 한다.
