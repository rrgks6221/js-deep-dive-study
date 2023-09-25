# 26장 ES6-함수의-추가-기능

> ES6 이전의 모든함수는 일반함수로서 호출할 수 있는것은 물론 생성자함수로서 호출할 수 있다.

## 메서드

> ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

- ES6 이후 메서드는 인스턴스를 생성할 수 없다. (생성자 함수로서 호출 불가)
  - 즉 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
- 메서드는 자신을 바인딩한 객체를 가리키는 내부슬롯 [[HomeObject]]를 갖는다.
  - 즉 super 키워드를 사용할 수 있다.

## 화살표 함수

- 간략하게 함수를 정의할 수 있다 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다
- 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.
- 표현식이 아닌 문은 반환할 수 없기 때문에 함수 몸체를 감싸는 중괄호 {}를 생략한 경우 에러가 발생한다

### 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.
1. 중복된 매개변수 이름을 선언할 수 없다.
1. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.
   - 화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 가장 가까운 상위 함수중 화살표 함수가 아닌 함수의 것을 참조한다.

### this

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
  - 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this(lexical this)를 그대로 참조한다.
- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 `Function.prototype.call`, `Function.prototype.apply`, `Function.prototype.bind` 메서드를 사용해도 화살표 함수 내부의 this를 교체할 수 없다.
  - 호출은 가능하다.
- 메서드로써 사용은 피해야한다.

### arguments

- 상위 스코프 함수의 arguments객체를 참조하기 때문에 화살표 함수로 가변 인자 함수를 구현해야 할 때는 Rest 파라미터를 사용해야 한다

## Rest 파라미터

- Rest 파라미터는 매개변수 이름 앞에 세개의 점 ... 을 붙여서 정의한 매개변수를 의미한다. 함수에 전달된 인수들의 목록을 배열로 전달받는다.
  - Rest 파라미터는 반드시 마지막 파라미터 이어야 한다.
- length 프로퍼티에 영향을 주지 않는다.
- Rest 파라미터에는 기본값 지정이 불가능하다

```js
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2

function temp(...rest = []) {
    console.log(rest)
}
temp()// // SyntaxError: Rest parameter may not have a default initializer
```
