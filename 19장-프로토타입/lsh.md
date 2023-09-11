# 19장 프로토타입

## 19.1 객체지향 프로그래밍

> 객체지향 프로그래밍이란 여러개의 독립적 단위, 즉 객체의 집합으로 프로그램을 표현하는 프로그래밍 패러다임이다.

## 19.2 상속과 프로토타입

> JS 는 prototype 을 이용하여 상속을 구현할 수 있다.

### 상속하지 않은 경우

이 경우에 가변적인 값은 `radius` 밖에 없다.
`getArea` 는 `radius` 의 값에 따라서 다른 값을 반환하지만 동작 자체는 어떤 인스턴스를 만들던 동일하다
하지만 아래 예제에서는 `c1` 과 `c2` 의 `getArea` 는 각각 다른 메모리 주소를 호출한다.
이 경우 메모리를 낭비할 수 있고 인스턴스를 생성할 때마다 새롭게 `getArea` 를 생성해야하기떄문에 퍼포먼스에 영향을 줄 수 있다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const c1 = new Circle(1);
const c2 = new Circle(2);

console.log(c1.getArea === c2.getArea); // false
```

### 상속하여 구현한 경우

상속하여 구현한다면 다른 인스턴스를 만들어도 미리 만들어놓은 프로토타입 함수를 바라보기 때문에 상속하지 않아서 구현했을 때의 단점을 없앨 수 있다.

```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const c1 = new Circle(1);
const c2 = new Circle(2);

console.log(c1.getArea === c2.getArea); // true
```

---

아래 챕터들은 완벽히 이해하지 못하여 추후 이해한 뒤 추가
