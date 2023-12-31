# 18장 함수와-일급-객체

## 일급객체

### 일급 객체의 조건

1. 무명의 리터널로 생성할 수 있다.
2. 변수나 자료구저에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다
4. 함수의 반환값으로 사용할 수 있다.

## 함수 객체의 프로퍼티

### arguments 프로퍼티

&nbsp;arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다.

&nbsp;arguments 객체는 인수를 프로퍼티 값으로 소유하며 프로퍼티 키는 인수의 순서를 나타낸다. callee 프로퍼티는 arguments 객체를 생성한 함수 즉, 함수 자신을 가르킨다. length 프로퍼티는 인수의 개수를 가르킨다.

&nbsp;arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

&nbsp;arguments 객체는 실제 배열이 아닌 유사 배열 객체이다. 이는 length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체를 말한다. 하지만 실제 배열은 아니기 때문에 배열 메서드는 사용할 수 없다.

### caller 프로퍼티

caller 프로퍼티는 함수 자신을 호출한 함수

### length 프로퍼티

length 프로퍼티는 함수를 저으이할 때 선언한 매개변수의 개수를 가리킨다. arguments 객체의 length는 인자의 개수이고, 함수 객체의 length 프로퍼티는 매개 변수의 개수이다.

### \_\_proto\_\_접근자 프로퍼티

&nbsp;\_\_proto\_\_프로퍼티는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.[[Prototype]] 내부 슬롯에 직접 접근할 수 없으며, \_\_proto\_\_접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

### prototype 프로퍼티

&nbsp;prototype 프로퍼티는 constructor만이 소유하는 프로퍼티이다. 이 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
