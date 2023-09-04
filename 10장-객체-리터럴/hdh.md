# 10장 객체-리터럴

### 1. 객체란?

- 원시 값, 다른 객체 값 등 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조

- 원시 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체

- 원시 타입의 값은 변경이 불가능한 값이지만 객체 타입의 값은 변경이 가능한 값

- 객체는 0개 이상의 프로퍼티로 구성된 집합이고 프로퍼티는 키(key)와 값(value)으로 구성

```js
const person = {
  name: "donkey", // 키와 값의 쌍(name: 'donkey')을 프로퍼티라고 함
  age: 26, // age는 키(key), 26은 age에 대한 값(value)
};
```

- 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있음

- 자바스크립트에서 함수는 일급 객체이므로 값으로 취급할 수 있음

- **함수가 프로퍼티의 값인 경우 일반 함수와 구분하기 위해 메서드라 부름**

```js
const counter = {
  num: 0, //  <- 프로퍼티
  increase: function () {
    //  <- counter.num의 값에 1을 더한 값을
    this.num++; //     반환하는 메서드 increase()
  },
};
```

### 2. 객체 리터럴에 의한 객체 생성

**C++이나 자바** 같은 **클래스 기반 객체지향 언어**는 클래스를 사전에 정의해두고 필요한 시점에 **new 연산자로 생성자를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성**

**자바스크립트**는 **프로토타입 기반 객체지향 언어**로 **클래스 기반 객체지향 언어**와 다르게 다양한 객체 생성 방법을 지원

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

제일 간단한 방법은 객체 리터럴을 사용하는 방법

리터럴은 값 생성을 위한 표기법 → 객체 리터럴은 객체를 생성하기 위한 표기법

객체 리터럴은 중괄호({ … }) 내에 0개 이상의 프로퍼티를 쉼표(,)로 구분하여 정의

중괄호 내에 어떤 프로퍼티도 정의하지 않으면 빈 객체가 생성

```js
const person = {
  name: "donkey",
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}`);
  },
};

console.log(typeof person); // object
console.log(person); // {name: "donkey", sayHello: *f}

const empty = {}; // 빈 객체
console.log(typeof empty); // object*
```

객체 리터럴의 중괄호는 코드 블록을 의미하지 않음

코드 블록의 닫는 중괄호는 문의 종료를 의미하는 자체 종결성을 지님 → 세미콜론 필요X

반면 객체 리터럴은 값으로 평가되는 표현식 → 세미콜론 필요O

### 3. 프로퍼티

> **객체는 프로퍼티의 집합, 프로퍼티는 키와 값으로 구성**

```js
const person = {
  // 프로퍼티 키는 name, 값은 'donkey'
  name: "donkey",
  // 프로퍼티 키는 age, 값은 26
  age: 26,
};
```

- 프로퍼티를 나열할 때 쉼표(,)로 구분

- 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 안쓰지만 써도 상관 없음

**프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값들**

- **프로퍼티 키**: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- **프로퍼티 값**: 자바스크립트에서 사용할 수 있는 모든 값

**프로퍼티 키**는 **프로퍼티 값**에 접근할 수 있는 식별자

**프로퍼티 키**는 문자열이므로 작은 따옴표(‘ ’) 또는 큰 따옴표(” “)로 감싸야 하지만 식별자 네이밍 규칙(ex. 식별자로 예약어 사용 불가 등)을 준수하면 생략 가능

식별자 네이밍 규칙을 따르지 않는 이름은 사용을 권장하지 않지만 사용하려면 반드시 따옴표를 사용해야 함

- 프로퍼티를 동적으로 생성할 수 있음 프로퍼티 키로 사용할 값을 문자열이나 문자열로 평가할 수있는 표현식으로 선언하고 객체 식별자[프로퍼티 키]로 프로퍼티 생성
- 프로퍼티 키에 문자열이나 심벌 이외 값을 사용하면 **문자열로 암묵적 타입 변환**됨
- 예약어는 예상치 못한 에러 발생의 여지가 있으므로 사용을 권장하지 않음
- 빈 문자열을 프로퍼티 키로 사용 가능하지만 키로서의 의미를 가지지 못하므로 사용을 권장하지 않음
- 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어씀

### 4. 메서드

자바스크립트에서 사용할 수 있는 모든 값을 프로퍼티로 사용 가능함

→ 일급 객체인 함수는 값으로 취급할 수 있으므로 프로퍼티로 사용 가능

**프로퍼티 값이 함수인 경우 일반 함수와 구분하기 위해 메서드라 부름**

```js
const circle = {
  radius: 5, // 프로퍼티

  getDiameter: function () {
    // 메서드
    return 2 * this.radius; // this는 객체 자신(circle)을 가리킴
  },
};

console.log(circle.getDiameter()); // 10
```

### 5. 프로퍼티 접근

프로퍼티에 접근하는 두가지 방법

- **마침표 프로퍼티 접근 연산자**( . ) 사용 → 마침표 표기법(dot notation)
- **대괄호 프로퍼티 접근 연산자**([ … ])를 사용 → 대괄호 표기법(bracket notation)

대괄호 프로퍼티 접근 연산자 내부의 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 함. 그렇지 않으면 자바스크립트 엔진이 식별자로 해석

```js
const person = {
	name: 'donkeykong'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name);    // donkeykong
// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name'];  // donkeykong
// name을 따옴표로 감싸지 않아 식별자(변수) name을 찾아봤지만 못 찾음
console.log(person[name]);   // ReferenceError: name is not defined
// 존재하지 않는 프로퍼티에 접근 시 ReferenceError가 아닌 undefined 반환
console.log(person.age);     // undefined
```

프로퍼티 키가 식별자 네이밍 규칙을 준수하는 이름이면 마침표, 대괄호 둘 다 사용 가능

그렇지 않으면 반드시 대괄호 표기법을 사용해야 함

```js
const person = {
	'first-name': 'donkeykong',  // - 사용, 식별자 네이밍 규칙에 어긋남
	1: 10,     // 식별자로 숫자 사용 불가, 프로퍼티 키가
};           // 문자열 or 심벌이 아니면 문자열로 암묵적 타입 변환 -> '1': 10

person.'first-name';   // SyntaxError: Unexpected string
person.first-name;     // 브라우저 환경: NaN, Node.js 환경: ReferenceError

person[first-name];    // ReferenceError: firse is not defined
person['first-name'];  // donkeykong

person.1;      // SyntaError: Unexpected number
person.'1';    // SyntaError: Unexpected string
person[1];     // 10 (문자열로 변환되어 person['1'] 실행됨)
person['1'];   // 10
```

**person.first-name이 브라우저 환경에서 NaN인 이유**

1. person.first-name에서 자바스크립트 엔진이 person.first를 먼저 평가
2. first는 person 객체 안에 없는 프로퍼티 키이므로 undefined 반환
3. person.first가 undefined이므로 표현식은 undefined - name과 같아짐
4. 브라우저 환경에는 전역 객체 window의 프로퍼티인 name이라는 전역 변수가 암묵적으로 존재(기본값은 빈 문자열 ‘’)
5. undefined - ‘’를 수행하여 NaN 반환

**person.first-name이 Node.js 환경에서 참조 에러를 발생시키는 이유**

1. 1~3까지 과정이 브라우저 환경과 동일
2. name이라는 식별자 선언이 없으므로 ReferenceError 발생

### 6. 프로퍼티 값 갱신

이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신됨

```jsx
const person = {
  name: "donkeykong",
};

person.name = "hong";

console.log(person); // {name: "hong"}
```

### 7. 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티 키가 동적으로 생성되어 추가되고 프로퍼티 값이 할당됨

```jsx
const person = {
  name: "donkeykong",
};
// person 객체에 age 프로퍼티가 존재하지 않음
// age 프로퍼티를 추가하고 값 26을 할당
person.age = 26;

console.log(person); // {name: 'donkeykong', age: 26}
```

### 8. 프로퍼티 삭제

delete 연산자는 객체의 프로퍼티를 삭제함

delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 함

존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시됨

```js
const person = {
  name: "donkeykong",
};

person.age = 26;

delete person.age;

delete person.address;

console.log(person); // {name: "donkeykong"}
```

### 9. ES6에서 추가된 객체 리터럴의 확장 기능

### **프로퍼티 축약 표현**

프로퍼티 값으로 변수를 사용할 경우 프로퍼티 키의 이름이 변수 이름과 동일할 때

프로퍼티 키 생략 가능 → 변수 이름으로 프로퍼티 키 자동 생성

```js
const name = "donkeykong";
const age = 26;

const person = {
  name, // name: name
  age, // age: age
};

console.log(person); // {name: 'donkeykong', age: 26}
```

### **계산된 프로퍼티 이름**

**문자열 or 문자열로 타입 변환할 수 있는 값**으로 평가되는 표현식을 사용해서 프로퍼티 키를 동적으로 생성 가능한데 이를 계산된 프로퍼티 이름이라고 함

**ES5**에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법([ … ])을 사용해야 함

```js
const prefix = 'player';
let number = 0;

const team = {};

team[prefix + '(' + ++number + ')'] = 'Donkeykong';
team[prefix + '(' + ++number + ')'] = 'Sonny';
****team[prefix + '(' + ++number + ')'] = 'Ji-sung Park';

console.log(team);
// {player(1): 'Donkeykong', player(2): 'Sonny', player(3): 'Ji-sung Park'}
```

**ES6**에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키 생성 가능

```js
const prefix = "player";
let number = 0;

const team = {
  [`${prefix}(${++number})`]: "Donkeykong",
  [`${prefix}(${++number})`]: "Sonny",
  [`${prefix}(${++number})`]: "Ji-sung Park",
};

console.log(team);
// {player(1): 'Donkeykong', player(2): 'Sonny', player(3): 'Ji-sung Park'}
```

### **메서드 축약 표현**

**ES5**에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당함

```js
const obj = {
  name: "donkeykong",
  sayHello: function () {
    console.log("Hello!" + this.name);
  },
};

obj.sayHello(); // Hello! donkeykong
```

**ES6**에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있음

프로퍼티에 값으로 할당한 함수와는 다르게 동작함(인스턴스를 생성할 수 없음 → 생성자 함수로서 호출 불가)

```js
const obj = {
  name: "donkeykong",
  // 메서드 축약 표현
  sayHello() {
    console.log("Hello!" + this.name);
  },
};

obj.sayHello(); // Hello! donkeykong
```
