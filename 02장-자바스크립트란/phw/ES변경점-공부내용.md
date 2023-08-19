## 개요

- 해당 문서는 ECMAscript 변경점 중 기존에 모르던 내용을 따로 공부하고 정리한 문서이다.

- 책을 계속 읽어 나가며 관련된 내용이 있는 장을 표시할 예정

### 1. 정적 메소드, 정적 프로퍼티

<details>

- 정적 메소드 : prototype 이 아닌 함수 자체에 설정된 메소드 (static 키워드를 붙여 만듬)
- 예시

```js
   Class User {
     static staticMethod() {
       alert(this === User);
     }
   }

   User.staticMethod();
```

- 정적 프로퍼티 예시

```js
  Class User {
    static age = 25;
  }

  alert(User.age);
```

  </details>

### 2. async generator, for await ...of

<details>

- async 키워드가 붙은 제너레이터에서 반복문 내 모든 비동기 구문에 await

- Promise.all() 과의 차이 : all() 의 병렬 동작과 달리 순차적으로 실행

</details>

### 3. Promise.allSettled

<details>

- Promise.all()과의 차이 : all()은 하나라도 거절되면 전체를 거절

- 반면 allSettled()는 모든 프라미스가 처리될때까지 기다림

  ```js
        [
        {status: 'fulfilled', value: ...응답...},
        {status: 'fulfilled', value: ...응답...},
        {status: 'rejected', reason: ...에러 객체...}
        ]
  ```

</details>

### 4. 옵셔널 체이닝 연산자 (?.)

<details>

- ?. 앞의 평가 대상이 undefined 나 null 의 경우 평가를 멈추고 undefined를 반환

```js
const user = {
  name : 'Park'
  age : 25
}

console.log(user.address.city) // Err
console.log(user.address?.city) // undefined
```

</details>

### 5. Object.fromEntries

<details>

- 2차원 배열을 객체로 묶어주는 메소드

```js
const arr = [
  ["foo", 1],
  ["bar", 2, 3],
  ["baz", [1, 2, 3]],
];

const obj = Object.fromEntries(arr);

console.log(obj);
// { foo : 1, bar : 2, baz : [1, 2, 3]}
```

- entries()와 반대

</details>

### 6. Object rest/spread 프로퍼티

<details>

- spread : 전개연산자

- rest : 변수 할당된 요소를 제외한 나머지 할당

```js
const arr = [1, 2, 3, 4];
const [one, ...rest] = arr;
//[one, two, ...rest]도 가능

console.log(one); // 1
console.log(rest); // [2, 3, 4]
```

</details>

### 7. Promise.any

<details>

- 이행되는 프로미스 집합에서 첫번째로 성공한 프로미스 결과 반환

- 여러개의 프로미스를 병렬로 실행하되, 모든 프로미스의 결과가 필요하지 않을때 사용

- 모두 거부 됐을땐 에러 반환

</details>

### 8. Object 프로퍼티

<details>

- 데이터 프로퍼티 : 값을 저장하기 위한 프로퍼티

- 접근자 프로퍼티 : 값이 없음, 프로퍼티를 읽거나 쓸 때 호출하는 함수를 값 대신 지정하는 프로퍼티

- getter와 setter

  ```js
  const obj =  {
    get propName() {
      //getter, obj.propName에서 실행되는 코드
    }

    set propName(value) {
      //setter, obj.propName = value에서 실행되는 코드
    }
  }
  ```

  - 예시

  ```js
  const obj = {
    name: "Park",
    age: 25,

    get propAge() {
      return `나이 : ${this.age}`;
    },

    set propAge(value) {
      this.age = value;
    },
  };

  console.log(obj.propAge); //나이 : 25
  obj.propAge = 26;
  console.log(obj.propAge); // 나이 : 26
  ```

- defineProperty 예시

```js
const user = {
  name: "John",
  surname: "Smith",
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});

console.log(user.fullName); // John Smith
```

</details>

### 9. WeakRefs

<details>

- 약한 참조 : 객체에 대한 참조가 있어도 가비지 컬렉션이 일어 날 수 있음

```js
const wm = new WeakMap();
{
  const ref = {};
  const metaData = "foo";
  wm.set(ref, metaData);
  wm.get(ref); // metaData
}
// 블록 스코프 내 `ref`에 대한 참조가 없다면, `wm`의 키로 접근이 가능하더라도
// 가비지 컬렉션이 일어날 수 있다.

const ws = new WeakSet();
{
  const ref = {};
  ws.add(ref);
  ws.has(ref); // true
}
// 블록 스코프 내 `ref`에 대한 참조가 없다면, `ws`의 키로 접근이 가능하더라도
// 가비지 컬렉션이 일어날 수 있다.
```

- [참고 toastUI post](https://ui.toast.com/posts/ko_20210624)

</details>

### 10. 숫자 구분 기호

<details>

- 가독성이 떨어질 만큼 큰 수에 구분기호를 넣을 수 있다.

- 사용자가 원하는 곳 어느곳에나 넣을 수 있다. ex)10_0_000_00 이런식으로도 가능

```js
//before
1000000000; // 10억
//after
1_000_000_000;

const a = 1_000_000_000;
console.log(a); // output: 1000000000
```

</details>

### 11. Top-level Await

<details>

- 비동기 함수 외부에서도 awailt 연산자 사용 가능

```js
import { getInfo } from "./User";
const user = await getInfo();
```

</details>

### 12. Private Methods and Fields

<details>

- \# 기호를 사용해 private 클래스 필드 선언

```js
class hello {
  fields = 0;
  #title;

  get #title() { return #title; }
  set #title() { #title = null; }
}
```

</details>

### 13. Regexp Match Indices

<details>

- d 문자를 활용해 일치하는 문자열의 시작 및 끝 인덱스가 있는 배열 반환

```js
const re1 = /a+(?<Z>z)?/d;

// indices are relative to start of the input string:
const s1 = "xaaaz";
const m1 = re1.exec(s1);
m1.indices[0][0] === 1;
m1.indices[0][1] === 5;
s1.slice(...m1.indices[0]) === "aaaz";
```

</details>

### 14. Ergonomic Brand Checks for Private Fields(in)

<details>

- in 연산자를 사용해 클래스에 필드가 있는지 여부 확인 가능

```js
class hello{
  name;
  #title;
    get #title() {
    return #title;
  }
  set #title() {
  	#title=null;
  }
  static hasTitle(obj1) {
    return #title in obj1;
  }
}
```

</details>

### 15. Array.Prototype.at()

<details>

- at() 함수로 양수 및 음수 인덱스를 사용해 문자열 인덱싱

```js
const arr = [1, 2, 3, 4];

console.log(arr.at(-1)); // 4
console.log(arr.at(1)); // 2
```

</details>

### 16. Change Array by Copy

<details>

- 기존 배열 제어 메소드(reverse(), sort(), splice()) 등은 원본 배열을 변형 시켰다.

- 원본 배열을 변형 하지않고 복사된 배열을 반환 하는 (toReversed(), toSorted(), toSpliced()) 메소드 추가

</details>

### 17. Change Array by Copy

<details>

- 기존 배열 제어 메소드(reverse(), sort(), splice()) 등은 원본 배열을 변형 시켰다.

- 원본 배열을 변형 하지않고 복사된 배열을 반환 하는 (toReversed(), toSorted(), toSpliced()) 메소드 추가

</details>
