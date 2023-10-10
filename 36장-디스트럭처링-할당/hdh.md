# 36장 디스트럭처링-할당

- 디스트럭처링 할당(구조 분해 할당)은 구조화된 이터러블이나 객체를 1개 이상의 개별 변수에 비구조화하여 할당하는 것을 말한다.

### 1. 배열 디스트럭처링 할당

- 배열 디스트럭처링 할당을 위해서 변수를 배열 리터럴 형태로 선언해야 한다.
- 할당문의 우변은 이터러블이어야 하고 할당 기준은 인덱스이다. 즉, 순서대로 할당된다.
- 변수의 개수와 이터러블의 요소 개수가 반드시 일치할 필요가 없다.
- 배열 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다.

```js
// 배열 디스트럭처링 할당
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3

// 변수의 개수와 이터러블의 요소 개수가 달라도 됨
const [a, b] = [1];
console.log(a, b); // 1, undefined

const [c, d] = [1, 2, 3];
console.log(c, d); // 1, 2

const [e, , f] = [1, 2, 3];
console.log(e, f); // 1 3

// 변수에 기본값 설정
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 1 2 3

const [e, f = 10, g = 3] = [1, 2];
console.log(e, f, g); // 1, 2, 3
```

### 2. 객체 디스트럭처링 할당

- 객체 디스트럭처링 할당을 위해서 변수를 객체 리터럴 형태로 선언해야 한다.
- 할당문의 우변은 객체여야 하며 변수 이름과 일치하는 프로퍼티 키의 프로퍼티 값이 할당된다.
- 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당받을 수 있다.
- 객체 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다.
- 객체에서 필요한 프로퍼티만 추출하여 변수에 할당하고 싶을 때 유용하다.

```js
// 객체 디스트럭처링 할당
const user = { firstName: "Dong-hui", lastName: "Hong" };

const { lastName, firstName } = user;

console.log(firstName, lastName); // Dong-hui Hong

// 객체 프로퍼티 키와 다른 변수 이름으로 할당받기
const { lastName: 성, firstName: 이름 } = user;

console.log(이름, 성); // Dong-hui Hong

// 변수에 기본값 설정
const { firstName: 이름 = "Dong-hui", lastName } = { lastName: "Hong" };
console.log(이름, lastName); // Dong-hui Hong

// 함수의 매개변수에 사용하는 경우
function printTodo(todo) {
  console.log(
    `할일 ${todo.content}은 ${todo.completed ? "완료" : "비완료"} 상태 입니다.`
  );
}

function printTodo({ content, completed }) {
  console.log(
    `할일 ${content}은 ${completed ? "완료" : "비완료"} 상태 입니다.`
  );
}

printTodo({ id: 1, content: "HTML", completed: true }); // 할일 HTML은 완료 상태입니다.

// 중첩 객체 디스트럭처링 할당
const user = {
  address: "Seoul",
  name: {
    firstName: "Dong-hui",
    lastName: "Hong",
  },
};

const {
  address,
  name: { firstName: 이름, lastName },
} = user;
console.log(address, 이름, lastName); // Seoul Dong-hui Hong
```
