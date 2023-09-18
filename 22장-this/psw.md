# 22장 this

## 본문 요약

# 22.1 this 키워드

this 키워드는 this가 속한 객체 또는 생성될 인스턴스를 가리키는 자기 참조 변수 이다. this가 바인딩 될 값은 호출 방식에 따라 유동적으로 결정된다.

- 전역,일반 함수 내부에서 호출 : 전역 객체(window,global)
- 메서드 내부에서 호출 : 해당 메서드가 포함된 객체
- 생성자 함수에서 호출 : 생성자 함수가 생성 할 인스턴스

# 22.2 함수 호출 방식과 this 바인딩

하나의 함수를 호출하는 방법은 네 가지가 있다. 각각의 방법에 따라 this에 무엇이 바인딩 되는지 결정된다.

### 22.2.1 일반 함수 호출

```jsx
function f() {
  console.dir(this);
}

f();
```

일반적으로 함수를 호출할 땐 this에 전역 객체가 바인딩된다. 다만 이 경우 this의 자기 참조 변수로서의 의미가 없어지기에 strict mode에서는 undefined로 바인딩된다.

함수가 일반적으로 호출 되었을 땐 메서드 내부의 중첩 함수나 콜백 함수로 사용 되었을 때에도 전역 객체를 바인딩 한다. 이 경우 개발자의 의도와 다르게 바인딩 될 경우가 많다.

메서드 내부의 중첩 함수나 콜백 함수로서 일반 함수를 사용 할 때 this에 바인딩 될 값을 일치시키는 방법은 다음과 같다.

1. 변수에 this에 바인딩 된 값을 할당하여 일반 함수 내부에서 변수를 사용하기
2. [Funtion.prototype.call/apply/bind](http://Funtion.prototype.call/apply/bind) 등의 메서드 사용
3. 화살표 함수 사용

### 22.2.2 메서드 호출

```jsx
const obj = {
  color: "black",
  func() {
    return this.color;
  },
};

console.log(obj.func()); // "black"
```

메서드는 프로퍼티에 바인딩된 함수이다. 즉 함수 객체 자체는 객체에 바인딩 되지 않고 독립적으로 존재하고 프로퍼티가 함수를 가리키고 있을 뿐이다.

정리하자면 객체의 메서드로 일반 함수를 호출할 땐 일반 함수의 this는 일반 함수를 호출한 객체가 된다.

### 22.2.3 생성자 함수 호출

생성자 함수 내부의 this는 생성자 함수가 아닌 생성될 인스턴스를 의미한다.

```jsx
function Maker(name) {
  (this.name = name),
    (this.getname = function () {
      return this.name;
    });
}

const jane = new Maker("jane");
console.log(jane.getname()); //"jane"
```

### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Funtion.prototype의 메서드이다. 따라서 모든 함수가 상속 받아 사용 할 수 있다.

apply 와 call 메서드는 사용법만 다르고 동일하게 동작하며 함수를 호출하는 기능을 한다.

- Function.prototype.apply(obj, [1, 2, 3, 4])
- Function.prototype.call(obj, 1, 2, 3, 4)
