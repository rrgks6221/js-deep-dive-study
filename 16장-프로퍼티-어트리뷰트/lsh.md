# 16장 프로퍼티-어트리뷰트

## 16.1 내부 슬롯과 내부 메서드

> `ECMAscript` 사양에 따라 내부 슬롯과 내부 메서드가 존재하지만 일반적으로는 접근할 수 없다.

prototype 기반 언어는 JS 의 모든 객체는 prototype 을 갖는다.
아래 예제를 통해서 `[[Prototype]]` 내부 슬롯에 접근할 수 있다.

```js
const obj = {};

o.[[Prototype]] // Uncaught SyntaxError

o.__proto__ // Object.prototype
```

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

> JS 엔진은 프로퍼티를 생설할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값을 자동 정의한다.

프로퍼티 어트리뷰트

1. value: 프로퍼티가 가지고 있는 값
2. writable: 값의 갱신 가능 여부
3. enumerable: 열거 가능 여부
4. configurable: 정의 가능 여부

```js
const person = {
  name: 'lee',
};

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// { value: 'lee', writable: true, enumerable: true, configurable: true }

person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: { value: 'lee', writable: true, enumerable:true, configurable: true },
  age: { value: 20, writable: true, enumerable: true, configurable: true }
}
*/
```

## 16.3 데이터 프로퍼티와 접근자 프로퍼티

> 프로퍼티에는 `데이터 프로퍼티` 와 `접근자 프로퍼티` 가 있다.

### 16.3.1 데이터 프로퍼티

> 키와 값으로 구성된 일반적인 프로퍼티이며 JS 엔진이 프로퍼티가 생성될때 자동으로 생성해준다.

데이터 프로퍼티는 다음과 같은 어트리뷰트가 있다.

1. \[\[Value]]: 프로퍼티가 가지고 있는 값
2. \[\[Writable]]: 값의 갱신 가능 여부
3. \[\[Enumerable]]: 열거 가능 여부
4. \[\[Configurable]]: 정의 가능 여부

#### \[\[Value]] (value)

- 프로퍼티 키를 통해 프로퍼티에 접근하면 반환되는 값
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 \[\[Value]] 에 값을 재할당한다.
- 프로퍼티 키를 동적으로 생성하면 자동으로 지정해준다.

#### \[\[Writable]] writable

- 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.
- default 는 true 이다.
- \[\[Writable]] 값이 false 인 경우 \[\[Value]] 값을 변경할 수 없기에 읽기전용 프로퍼티가 된다.
- 읽기전용 프로퍼티는 값을 변경하려 할 때 에러가 나는게 아닌 아무일도 일어나지 않는다.

  ```js
  const obj = {
    a: 1,
  };

  Object.defineProperty(obj, 'a', { writable: false });

  obj.a = 2;

  console.log(Object.getOwnPropertyDescriptors(obj));

  console.log(obj);
  ```

- `Typescript` 환경에서 `Readonly` 나 `as const` 같은 접근지정자를 지정해도 실제 \[\[Writable]] 은 바뀌지 않는다.

  ```ts
  const obj1: Record<any, any> = {
    a: 1,
  } as const;

  const obj2 = {
    a: 1,
  } as const;

  /* 두 console 모두 아래와 같은 속성을 갖는다.
   {
    "a": {
      "value": 1,
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
  }
  */
  console.log(Object.getOwnPropertyDescriptors(obj1));
  console.log(Object.getOwnPropertyDescriptors(obj2));
  ```

#### \[\[Enumerable]] enumerable

- 프로퍼티 열거가능 여부를 나타내며 불리언 값을 갖는다.
- default 는 true 이다.
- \[\[Enumerable]] 값이 false 인 경우 해당 프로퍼티는 열거 대상에서 제외된다.

  ```js
  const a = { a: 1 };

  a.b = 2;

  Object.defineProperty(a, 'b', { enumerable: false });

  console.log(Object.values(a)); // [1]

  for (const b in a) {
    console.log(b); // a 프로퍼티에 한해서 한번만 실행된다.
  }
  ```

#### \[\[Configurable]] configurable

- 프로퍼티 재정의 가능 여부를 나타내며 불리언 값을 갖는다.
- \[\[Configurable]] 값이 false 인 경우 해당 프로퍼티 삭제 또는 어트리뷰트 값의 변경이 금지된다.
- \[\[Writable]] 이 true 인 경우 \[\[Value]] 변경과 \[\[Writable]] 을 false 로 변경하는건 허용된다.
- \[\[Writable]] 과 \[\[Configurable]] 값이 둘다 false 인 경우 `Object.defineProperty` 함수를 사용하려 하면 에러가 발생한다. 즉 완전한 읽기전용 상태이다.

  ```js
  const obj = {
    a: 1,
  };

  Object.defineProperty(obj, 'a', { configurable: false, writable: false });

  Object.defineProperty(obj, 'a', { writable: true }); // TypeError: Cannot redefine property: a
  ```

### 16.3.2 접근자 프로퍼티

> 값은 가지지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 정의된 프로퍼티이다.

접근자 프로퍼티는 다음과 같은 어트리뷰트가 있다.

1. \[\[Get]]
2. \[\[Set]]
3. \[\[Enumerable]]
4. \[\[Configurable]]

#### \[\[Get]] (get)

- `getter` 함수라고도 불린다.
- 프로퍼티 값을 읽을 때 호출되는 접근자 함수이다.
- 접근자 프로퍼티 키로 값에 접근하면 프로퍼티 어트리뷰트 \[\[Get]] 의 값 즉 `getter` 함수가 호출된다.

#### \[\[Set]] (set)

- `setter` 함수라고도 불린다.
- 프로퍼티 값을 저장할 때 호출되는 접근자 함수이다.
- 접근자 프로퍼티 키로 값을 저장하면 프로퍼티 어트리뷰트 \[\[Set]] 의 값 즉 `setter` 함수가 호출된다.

#### \[\[Enumerable]] (enumerable)

- 데이터 프로퍼티의 \[\[Enumerable]] 과 같다

#### \[\[Configurable]] (configurable)

- 데이터 프로퍼티의 \[\[Configurable]] 과 같다

#### 예제

```js
const person = {
  firstName: 'seokho',
  lastName: 'lee',

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },

  set fullName(name) {
    return ([this.firstName, this.lastName] = name.split(' '));
  },
};

// { firstName: 'seokho', lastName: 'lee', fullName: [Getter/Setter] }
// getter, setter 를 모두 선언했기 때문에 두개 fullName 은 두가지 모두 가지고 있다.
// 만약 getter 만 선언했다면 fullName: [Getter] 로 나온다.
console.log(person);

// 같은 키를 갖지만 어떻게 접근하냐에 따라서 다른 함수가 호출된다.
// setter 함수가 호출된다.
person.fullName = 'hong gildong';
// getter 함수가 호출된다.
console.log(person.fullName);

// getter, setter 도 하나의 프로퍼티이기 때문에 재할당한다면 함수가 아닌 값으로 변환된다.
Object.defineProperty(person, 'fullName', { value: 'askdn' });
// { firstName: 'hong', lastName: 'gildong', fullName: 'askdn' }
console.log(person);
```

## 16.4 프로퍼티 정의

> 객체의 어트리뷰트를 명시적으로 정의하고 싶다면 `Object.defineProperty` 또는 `Object.defineProperties` 를 통해 정의할 수 있다.

```js
const person = {};

// 아무값도 지정하지 않으면 데이터 프로퍼티로 인식한다.
// 데이터 프로퍼티의 모든 어트리뷰트가 기본값으로 할당된다.
Object.defineProperty(person, 'empty', {});

Object.defineProperty(person, 'name', {
  value: 'lsh',
  writable: false,
  enumerable: false,
  configurable: false,
});

Object.defineProperties(person, {
  lsh: {
    get() {
      return 'get';
    },

    set(value) {
      this.temp = value;
    },
  },
});

// value 와 [Getter/Setter] 를 동시에 선언하려하면 에러가 발생한다.
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
Object.defineProperties(person, {
  wrongProperty: {
    value: 'test',

    get() {
      return 'get';
    },

    set(value) {
      this.wrongProperty = 'value';
    },
  },
});
```

---

`Object.defineProperty` 또는 `Object.defineProperties` 를 통해 프로퍼티를 정의할 때 각 어트리뷰트들은 아래 기본값을 가진다.

| 프로퍼티 디스크립터 프로퍼티 | 프로퍼티 어트리뷰트 | default value |
| ---------------------------- | ------------------- | ------------- |
| value                        | \[\[Value]]         | undefined     |
| get                          | \[\[Get]]           | undefined     |
| set                          | \[\[Set]]           | undefined     |
| writable                     | \[\[Writable]]      | false         |
| enumerable                   | \[\[Enumerable]]    | false         |
| configurable                 | \[\[Configurable]]  | false         |

## 16.5 객체 변경 방지

> 객체는 변경 가능한 값이므로 변경을 방지하려면 아래 방법처럼 할 수 있다.

| 구분           | 메서드                   | 확인 메서드         | 추가 | 삭제 | 읽기 | 쓰기 | 어트리뷰트 재정의 |
| -------------- | ------------------------ | ------------------- | ---- | ---- | ---- | ---- | ----------------- |
| 객체 확장 금지 | Object.preventExtensions | Object.isExtensible | X    | O    | O    | O    | O                 |
| 객체 밀봉      | Object.seal              | Object.isSealed     | X    | X    | O    | O    | X                 |
| 객체 동경      | Object.freeze            | Object.isFrozen     | X    | X    | O    | X    | X                 |

### 16.5.4 불변 객체

> 위의 객체 변경 방지 메서드는 얕은 변경방지로 직속 프로퍼티만 방지되고 중첩 객체는 방지할 수 없다. 따라서 깊은 변경방지를 하고싶다면 재귀함수같은 깊은 방지 함수를 선언하거나 라이브러리를 사용해야한다.
