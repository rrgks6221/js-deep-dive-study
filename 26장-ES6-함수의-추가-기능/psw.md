# 26장 ES6 함수의 추가 기능

# 26.1 함수의 구분

ES6이전에는 함수의 용도에 관계 없이 모든 방법으로 함수를 호출하고 사용 했다.

그러나 ES6부터는 다음과 같이 사용 목적에 따라 구분한다.

| ES6함수의 구분 | constructor | prototype | super | arguments |
| -------------- | ----------- | --------- | ----- | --------- |
| 일반 함수      | O           | O         | X     | O         |
| 메서드         | X           | X         | O     | O         |
| 화살표 함수    | X           | X         | X     | X         |

# 26.2 메서드

ES6부터 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

```jsx
const obj = {
  fun1() {
    return "method";
  },
  fun2: function () {
    return "not method";
  },
};
//fun1 만 메서드이다.
```

메서드는 인스턴스를 생성 할 수 없는 non-constructor이다. 따라서 prototype 프로퍼티를 갖지 않고 프로토타입을 생성하지 않는다.

메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다. super의 참조가 이 내부 슬롯을 사용한다.

# 26.3 화살표 함수

화살표 함수도 일급 객체이므로 고차 함수에 인수로 전달 할 수 있다. 또한 표현이 간결하기 때문에 콜백 함수로 사용 하기 좋다.

### 26.3.2 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 non-constructor이다.
2. 화살표 함수는 자체의 this.arguments, super, [new.target](http://new.target) 바인딩을 갖지 않는다.

만일 참조하려 하면 스코프 체인을 따라 상위의 참조를 찾는다.

### 26.3.3 this

화살표 함수에서의 this는 일반 함수와 다르게 동작한다.

일반 함수의 this는 전역 객체를 바인딩 하고 있기 때문에 일반 함수를 콜백 함수로 사용하려면 별도의 작업이 필요하다. 하지만 화살표 함수는 자체적인 this바인딩을 갖지 않고 상위 스코프의 this바인딩을 그대로 가져온다. 이를 lexical this라 한다.

### 26.3.4 super

화살표 함수는 자체의 super 바인딩 또한 가지지 않는다. super는 this와 마찬가지로 상위 스코프의 super를 참조한다.

### 26.3.5 arguments

arguments또한 화살표 함수 자체에 바인딩은 없고 상위 스코프의 바인딩을 따른다. 하지만 화살표 함수에선 사용하지 않는다. 화살표 함수 자신에게 전달된 인수 목록을 확인 할 수 없고 상위 함수에게 전달된 인수 목록을 참조하므로 그다지 소용이 없다.

# 26.4 Rest 파라미터

### 26.4.1 기본 문법

매개변수에 (…rest) 라고 작성하여 함수에 전달된 인수들의 목록을 배열로 전달한다.

rest 파라미터는 전달 받은 인수들 중에 나머지들을 묶어서 사용하는 인수이기 때문에 rest파라미터는 반드시 마지막 파라미터여야 한다.

### 26.4.2 Rest 파라미터와 arguments 객체

기존에 매개변수의 개수를 확정할 수 없어 가변 인자 함수는 arguments객체를 통해 인수를 전달 받았으나 객체가 아닌 유사 배열 객체라서 사용에 번거로움이 있었다. ES6부터는 Rest파라미터를 사용하여 가변 인자 함수에 인수를 전달하는 것이 편리해졌다.

# 26.5 매개변수 기본 값

함수의 매개변수에 기본 값을 설정하여 전달 받지 못한 인수은 기본 값으로 처리하는 기능이 생겼다.

```jsx
function fun(x = 1) {
  return x + 1;
}
fun(); // 인수를 전달받지 못해 기본값으로 실행된다.
```

인수를 전달 받지 못하거나 undefined가 전달 된 경우 기본 값을 전달한다.
