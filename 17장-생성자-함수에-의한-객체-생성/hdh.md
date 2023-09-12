# 17장 생성자-함수에-의한-객체-생성

### 1. Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성한다.

```js
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = "Hong";
person.sayHello = function () {
  console.log("Hi! My name is" + this.name);
};
```

### 2. 생성자 함수

#### 2.1 객체 리터럴에 의한 객체 생성방 식의 문제점

객체 리터럴로 객체를 만들 경우 동일한 프로퍼티 구조라도 매번 같은 객체를 만들어야 한다

#### 2.2 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수를 사용하면 동일한 프로퍼티 구조의 객체를 간편하게 생성할 수 있다.

- 생성자 함수는 일반 함수와 동일한 방법으로 정의
- new 연산자와 함께 호출하면 해당 함수가 생성자 함수로 동작(아니면 일반 함수로 동작)

#### 2.3 생성자 함수의 인스턴스 생성 과정

new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 과정을 거쳐 인스턴스를 생성, 초기화, 반환한다.

1. 인스턴스 생성과 this 바인딩
   - 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩된다.
2. 인스턴스 초기화
   - this에 바인딩되어 있는 인스턴스를 초기화한다.
   - 인스턴스에 프로퍼티나 메서드를 추가하고 인수로 전달받은 초기값을 프로퍼티에 할당한다.
3. 인스턴스 반환
   - 모든 처리가 끝나면 인스턴스가 바인딩된 this를 암묵적으로 반환한다.

```js
// 생성자 함수
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  //3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
}

// 인스턴스 생성 Circle 생성자 함수를 암묵적으로 this를 반환한다.
const circle = new Circle(5); // Circle {radius: 5, getDiameter: f}
```

#### 2.4 내부 메서드 \[[Call]]과 \[[Construct]]

함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 \[[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 \[[Construct]]가 호출된다.

- 내부 메서드 \[[Call]]을 갖는 함수 객체를 callable이라 한다.
- 내부 메서드 \[[Construct]]를 갖는 함수 객체를 constructor, 갖지 않는 함수 객체를 non-constructor라고 한다.

#### 2.5 constructor와 non-constructor의 구분

자바스크립트 엔진은 constructor와 non-constructor를 함수 정의 방식에 따라 구분한다.

- constructor: 함수 선언문, 함수 표현식, 클래스
- non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수

#### 2.6 new 연산자

new 연산자를 사용하면 \[[Call]] 호출되는 것이 아니라 \[[Construct]]가 호출된다. 단, new연산자와 함께 호출하는 함수는 non-constructor가 아닌 constructor이어야 한다.
일반 함수와 생성자 함수에 형식적 차이가 없기 때문에 생성자 함수를 첫 문자를 대문자로 기술하는 **파스칼 케이스**로 명명하도록 한다.
