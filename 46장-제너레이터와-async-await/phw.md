# 46장 제너레이터와-async-await

- 제너레이터 : 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

- 특징
  1. 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
  1. 함수 호출자와 함수의 상태를 주고받을 수 있다.
  1. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

### 제너레이터 함수 정의

- `function*` 키워드로 선언 후 하나이상의 `yield` 표현식을 포함
- 화살표 함수로 정의할 수 없다

### 제너레이터 객체

- 제너레이터 객체 : 제너레이터 함수 호출시 생성되어 반환되는 객체

  - 이터러블이며 동시에 이터레이터이다.

- next, return, throw 메서드를 갖는다.
  - next : yield 표현식까지 코드블록 실행 후 yield 값을 value 프로퍼티로, false 를 done 프로퍼티로 갖는 리절트객체 반환
  - return : 인수로 전달받은 값을 value, true를 done 프로퍼티로 갖는 리절트객체 반환
  - throw : 인수로 전달받은 에러 발생, undefined 를 value, true 를 done 으로 갖는 리절트 객체 반환

### 일시 중지와 재개

- yield 키워드는 제너레이터 함수의 실행을 일시 중지 시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다
- 제너레이터 객체의 next 메서드 호출시 yield 표현식까지 실행되고 일시 중지 된다.(함수의 제어권 호출자로 양도)

### 활용

1. 이터러블 구현
1. 비동기 처리

## async/await

- await 키워드는 async 함수 내부에서 사용해야 한다
- async 함수가 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve 하는 프로미스를 반환한다.
- await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리결과를 반환한다 (반드시 프로미스 앞에서 사용)
