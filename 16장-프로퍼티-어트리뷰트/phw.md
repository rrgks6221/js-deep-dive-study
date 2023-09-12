# 16장 프로퍼티-어트리뷰트

## 내부슬롯과 내부메소드

- 의사 프로퍼티 의사 메소드 : ES사양에서 이중 대괄호로 쓰인 이름들
- 직접 접근 불가능, 일부 내부슬롯, 내부메소드에 한하여 간접적 접근 수단 제공

## 프로퍼티 어트리뷰트 프로퍼티 디스크립터 객체

- 자바스크립트 엔진은 프로퍼티를 생성할 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다
- 프로퍼티 디스크립터 객체 : 프로퍼티 어트리뷰트 정보 제공

- Object.getOwnPropertyDescriptor로 프로퍼티 디스크립터 객체 반환
  - ES8 -> Object.getOwnPropertyDescriptors 모든 프로퍼티 어트리뷰트의 정보 제공

## 데이터 프로퍼티, 접근자 프로퍼티

### 데이터 프로퍼티

- 키와 값으로 구성된 일반적인 프로퍼티

  | 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                                                                        |
  | ------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
  | [[Value]]           | value                               | 프로퍼티 키를 통해 접근하며 반환되는 값                                                                                     |
  | [[Writable]]        | writable                            | 프로퍼티 값의 변경가능 여부 (boolean)                                                                                       |
  | [[Enumerable]]      | enumerable                          | 열거가능 여부 false 의 경우 for... in, Object.keys 등으로 열거 불가                                                         |
  | [[Configurable]]    | configurable                        | 프로퍼티 재정의 가능 여부, false 의 경우 변경, 삭제 불가능, true 의 경우 value 의 변경과 writable 을 false 로 만들 수 있다. |

### 접근자 프로퍼티

- 자체적으로 값을 갖지 않고 프로퍼티의 값을 읽거나 저장할 호출되는 접근자 함수로 구성된 프로퍼티
- 접근자 함수는 getter/setter 라고도 부름

  | 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                                                                                     |
  | ------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
  | [[Get]]             | get                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수, [[Get]] 의값 getter 함수 호출시 프로퍼티 값 반환             |
  | [[Set]]             | set                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티 값을 저장할 때 호출되는 접근자 함수, [[Set]]의 값 setter 호출 시 그 결과가 프로퍼티 값으로 저장됨 |
  | [[Enumerable]]      | enumerable                          | 데이터 프로퍼티의 [[Enumerable]]                                                                                                         |
  | [[Configurable]]    | configurable                        | 데이터 프로퍼티의 [[Configurable]]                                                                                                       |

## 프로퍼티 정의

```js
const person = {};

Object.defineProperty(person, "firstName", {
  value: "Ungmo",
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(person, "lastName", {
  value: "Lee",
}); // default : false

delete person.lastName; //writable이 false 일때무시됨

Object.defineProperty(person, "fullName1", {
  // getter 함수
  get() {
    return "${this.firstName} ${this.lastName}";
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
  enumerable: true,
  configurable: true,
});
```

## 객체 변경 방지

- 확장금지(preventExtenstions) : 프로퍼티 추가금지 .isExtensible 메소드로 확인
- 객체밀봉(seal) : 읽기와 쓰기만 가능 .isSealed 메소드로 확인
- 객체동결(freeze) : 읽기만 가능 .isFrozen 메소드로 확인
