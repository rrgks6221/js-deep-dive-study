# 36장 디스트럭처링-할당

> 구조화된 배열과 같은 이터러블 또는 객체를 비구조화(destructuring) 하여 1개 이상의 변수에 개별적으로 할당 하는것

## 배열 디스트럭처링 할당

```js
const arr = [1, 2, 3];

const [one, two, three, four, five = 5] = arr; //우변이 이터러블이 아니면 에러 발생

console.log(one, two, three, four, five); //1, 2, 3, undefined, 5
// 인덱스 기준 순서대로 할당
```

## 객체 디스트럭처링 할당

```js
const user = { firstName: "Hyunwoo", lastName: "Park" };
const { lastName, firstName } = user; // 우변에 객체, 객체로 평가되는 표현식 이 아니면 에러발생
//프로퍼티 키를 기준으로 구조분해할당 된다 순서 의미 X
console.log(firstName, lastName); // Hyunwoo Park

// 중첩 객체의 경우
const user2 = {
  name: "Lee",
  address: {
    zipCode: "03068",
    city: "Seoul",
  },
};

const {
  address: { city },
} = user;

console.log(city); // 'Seoul’

//Rest 프로퍼티 ... 사용
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
```
