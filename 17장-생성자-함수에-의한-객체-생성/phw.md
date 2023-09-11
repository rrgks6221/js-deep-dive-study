# 17장 생성자-함수에-의한-객체-생성

## 생성자 함수

- 일반적인 선언 방식 객체 리터럴로 선언시 같은 객체를 대량으로 만들 때 불리 하다.
- 생성자 함수의 역할 : 인스턴스의 생성과 생성된 인스턴스의 초기화
- new 연산자와 함께 함수를 호출하면 생성자 함수로 동작한다.
  - 내부메소드 [[Construct]] 호출
  - new.target 함수자신 (new 연산자 없이 호출된 함수는 undefined)

```js
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circlel = new Circle(5);
const circle2 = new Circle(10);
console.log(circlel.getDiameter()); // 10
console.Iog(circle2.getDiameter()); // 20
```
