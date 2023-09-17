# 22장 this

## this 키워드

&nbsp;메서드는 자신이 속한 객체의 프로퍼티를 참조하고 변경할 수 있어야 한다. 그때 필요한것이 바로 this 키워드이다. this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가르키는 자기 참조 변수이다. 이 this 바이딩은 함수 호출 방식에 의해 동작으로 결정된다.

## 함수 호출 방식과 this 바인딩

&nbsp;함수 호출의 방식은 4가지가 존재한다.

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

### 일반 함수 호출

&nbsp;일반 함수로 호출되면 this는 전역 객체가 바인딩된다. 하지만 여기서 주의해야 할 점이 있다. 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this는 전역 객체가 바인딩된다. 콜백함수도 마찬가지다. 이를 객체내에서 제대로 사용하기 위해서는 후에 다룰 Function.prototype.apply/call/bind 메서드를 사용하면 된다. 그리고 객체내에서 화살표 함수를 사용하여 this 바인딩을 일치시킬 수 있다.

### 메서드 호출

&nbsp;메서드 내부의 this는 메서드 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다.

### 생성자 함수 호출

&nbsp;생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

&nbsp;apply, call, bind 메서드는 Function.prototype의 메서드이다. 그렇기 때문에 모든 함수에서 사용이 가능하다.

&nbsp;apply, call 메서드는 기본적으로 함수를 호출하는 것이다. 호출할 때 전달하는 첫 번째 인수인 객체가 호출한 함수의 this에 바인딩된다. 차이점은 apply 메서드는 호출한 함수의 인수를 배열로 묶어서 전달하고, call 메서드의 경우는 호출할 함수의 인수를 쉼표로 구분하여 전달한다.

&nbsp;bind 메서드는 apply와 call과 다르게 this로 사용할 객체만 전달한다.

```js
function getThisBinding() {
  return this;
}

const obj = { a: 1 };

console.log(getThisBinding.bind(obj)()); // {a: 1}
```
