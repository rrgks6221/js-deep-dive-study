# 18장 함수와-일급-객체

다음과 같은 조건을 만족하는 객체를 일급 객체 한다.

- 일급 객체 조건

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
1. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
1. 함수의 매개변수에 전달할 수 있다.
1. 함수의 반환값으로 사용할 수 있다.

- js의 함수가 일급객체라는 증명

```js
//1. 무명의 리터럴로 생성할 수 있다.
//2. 변수나 자료구조에 저장할 수 있다.
const temp = function (x, y) {
  return x + y;
};

//3. 함수의 매개변수에 전달할 수 있다.
const promise = new Promise((res, rej) => {
  res();
  //매개변수 res, rej 는 모두 함수이다.
});

//4. 함수의 반환값으로 사용할 수 있다.
function solution(category) {
  let num = 0;
  return function () {
    if (category === "add") return num + 1;
    return num - 1;
  };
}

console.log(solution("add")()); // 1
```

## 함수 객체의 프로퍼티

- arguments 프로퍼티 -> arguments 객체
  - 전달된 인수들의 정보를 담고있는 iterable 객체
  - 함수 내부에서 arguments 객체 참조 가능
  - 매개변수의 갯수가 확실치 않은 가변 인자 함수 구현에 용이
- length 프로퍼티 -> 함수를 정의할때 선언한 매개변수의 갯수
- name 프로퍼티 -> 함수 이름
- \_\_proto\_\_ 접근자 프로퍼티
  - 모든 객체가 갖는 내부슬롯 [[Prototype]] 이 가리키는 프로토타입 객체에 접근하기위한 프로퍼티
- prototype 프로퍼티
  - 생성자 함수로 호출할 수 있는 함수 객체 (constructor) 만이 소유하는 프로퍼티
  - 함수가 객체를 생성하는 생성자 함수로 호출될 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
