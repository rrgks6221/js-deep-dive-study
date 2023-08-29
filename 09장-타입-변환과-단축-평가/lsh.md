# 09장 타입-변환과-단축-평가

## 9.2 암묵적 타입 변환

### 9.2.3 불리언 타입으로 변환

> JS 의 조건식은 불리언 타입으로 암묵적 타입변환을 하여 평가한다.

아래 경우를 제외하고 Truthy 한 값으로 인식하여 처리한다.

- false
- undefined
- null
- 0, -0
- NaN
- ''(빈 문자열)

## 9.4 단축 평가

### 9.4.1 논리연산자를 사용한 단축평가

> 일반적으로 논리연산자가 Boolean type 을 반환한다고 알고있는데 이는 틀린 사실이다.
> 논리연산자는 왼쪽부터 오른쪽 순서대로 평가된다

#### OR 연산자

> OR 연산자는 Truthy 한 값을 가질때는 가장 먼저 평가된 Truthy 한 값을 가지고 모두 Truthy 한 값을 가진다면 마지막으로 평가된 값을 가진다.

```js
console.log(0 || ''); // ''
console.log(1 || 'a'); // '1'
console.log(1 || 'a' || {} || []); // 1
```

OR 연산의 특징으로 하나만 참이면 참이기때문에 하나라도 참으로 평가되면 다음 평가되는 구문을 해석하지 않는다.
이런 특징을 이용하여 처리하는 방법도 많다.

```js
let el = null;

// el 이 Truthy 한 값이라면 el 을 할당 아니면 e 를 할당
const e = el || 'e';
```

#### AND 연산자

> AND 연산자는 Falsy 한 값을 가질때는 가장 먼저 Falsy 한 값으로 평가된 값을 가지고 Truthy 한 값을 가질 때는 가장 마지막 평가된 값을 가진다.

```js
console.log('' && 0); // ''
console.log(1 && 'a'); // 'a'
console.log(1 && 'a' && {} && []); // []
```

AND 연산의 특징으로 하나만 거짓이면 거짓이 되기때문에 하나라도 거짓으로 평가되면 다음 평가되는 구문을 해석하지 않는다.
이런 특징을 이용하여 처리하는 방법도 많다.

```js
let temp = null;

// temp null 이나 undefined 일 경우 프로세스가 종료될 수 있어 방어코드를 간략화 할 수 있다.
const el = temp && temp.value;
```

### 9.4.2 옵셔널 체이닝 연산자

> ES11 에 나온 연산자로 구문을 쉽게 간략화 할 수 있는 강력한 연산자다.
> null, undefined 인 경우 undefined 를 반환하고 그렇지 않으면 우항의 프로퍼티를 참조를 이어간다.

#### 객체 참조 시 방어코드를 넣는 경우

**if 문으로 하는 경우**

```js
// 외부에서 가져오는 값은 신뢰성이 떨어질 수 있다.
const el = 대충 외부에서 가져오는 값;

if (!el) {
  throw new Error();
}
if (!el.e) {
  throw new Error();
}

const v = el.e.value;
```

**AND 연산자를 사용하는 경우**

```js
const v = el && el.e && el.value;
```

**옵셔널 체이닝을 사용하는 경우**

```js
const v = el?.e?.value;
```

### 9.4.3 null 병합 연산자

> null 이나 undefined 값이 오면 우항을 실행한다.

```js
let foo = null ?? 'default string'; // default string
let foo = undefined ?? 'default string'; // default string
let foo = '' ?? 'default string'; // ''
```

OR 연산자와 다른 특징은 `Falsy` 한 값이 아닌 `null`, `undefined` 만 해석한다는 점이다.
