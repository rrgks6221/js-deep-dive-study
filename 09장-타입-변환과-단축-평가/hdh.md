# 09장 타입-변환과-단축-평가

### 1. 타입 변환이란?

자바스크립트의 모든 값은 타입이 있고 개발자의 의도에 따라 다른 타입으로 변환 가능

**개발자 의도적으로 값의 타입을 변환** → **명시적 타입 변환** 또는 **타입 캐스팅**

**의도치 않게** 표현식을 평가하는 도중에 **자바스크립트 엔진이 자동으로 타입 변환**

→ **암묵적 타입 변환** 또는 **타입 강제 변환**

기존의 원시 값을 직접 변경하는 것은 아님 타입 변환은 기존 값을 이용해 새 값을 만듦

자신이 작성한 코드에서 암묵적 타입 변환이 발생하는지, 발생한다면 어떤 타입의 어떤 값으로 변환되는지, 변환된 값으로 표현식이 어떻게 평가될 것인지 예측 가능해야 함

### 2. 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이

코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환할 때가 있음

암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언 같은 원시 타입 중 하나로 타입 변환

```js
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2      // '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10'      // 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
0!            // true
if (1) {...}  //
```

### **문자열 타입으로 변환**

- 연산자는 피연산자 중 하나 이상이 문자열이면 문자열 연결 연산자로 동작

문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환 함

ES6에서 도입된 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입변환 함

**문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환하는 예시**

```jsx
// 숫자 타입
0 + ''           // "0"
-0 + ''          // "0"
1  + ''          // "1"
-1 + ''          // "-1"
NaN + ''         // "NaN"
Infinity + ''    // "Infinity"
-Infinity + ''   // "-Infinity"

// 불리언 타입
true + ''    // "true"
false + ''   // "false"

// null 타입
null + ''  // "null"

// undefined 타입
undefined + ''  // "undefined"

// 심벌 타입
(Symbol()) + ''  // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''            // "[object Object]"
Math + ''            // "[object Math]"
[] + ''              // ""
[10, 20] + ''        // "10, 20"
(function(){}) + ''  // "function(){}"
Array + ''           // "function Array() { [native code] }"
```

### 숫자 **타입으로 변환**

산술 연산자의 모든 피연산자는 문맥상 모두 숫자 타입이어야 함

피연산자 중 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환

피연산자를 숫자 타입으로 변환할 수 없는 경우 표현식의 평가 결과는 NaN

산술 연산자뿐만 아니라 대소 비교 연산자의 피연산자도 모두 숫자 타입이어야 함

- 단항 연산자는 피연산자의 값이 숫자 타입이 아니면 숫자 타입으로 암묵적 타입 변환

빈 문자열(’ ’), 빈 배열([ ]), null, false는 0

true는 1

객체, 빈 배열이 아닌 배열, undefined는 NaN

**숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환하는 예시**

```js
// 문자열 타입
+"" + // 0
  "0" + // 0
  "1" + // 1
  "string" + // NaN
  // 불리언 타입
  true + // 1
  false + // 0
  // null 타입
  null + // 0
  // undefined 타입
  undefined + // NaN
  // 심벌 타입
  Symbol() + // TypeError: Cannot convert a Symbol value to a number
  // 객체 타입
  {} + // NaN
  [] + // 0
  [10, 20] + // NaN
  function () {}; // NaN
```

### **불리언 타입으로 변환**

if 문, for 문 같은 제어문이나 삼항 조건 연산자의 조건식은 불리언 값이어야 함

자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환

Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분

**불리언 타입으로 암묵적 타입 변환**

- **Falsy 값**
  - false
  - undefined
  - null
  - 0, -0
  - NaN
  - ‘’(빈 문자열)
- **Truthy 값**
  - Falsy 값 이외의 모든 값(ex. “0”, 빈 객체, 빈 배열도 모두 Truthy 값)

### 3. 명시적 타입 변환

개발자 의도에 따라 명시적으로 타입을 변경하는 것

- **표준 빌트인 생성자 함수를 new 연산자 없이 호출하는 방법**
- **표준 빌트인 메서드를 사용하는 방법**
- **암묵적 타입 변환을 이용하는 방법**

**문자열 타입으로 변환**

1. String 생성자 함수를 new 연산자 없이 호출
2. Object.prototype.toString 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```jsx
// 1
String(1); // "1"
String(NaN); // "NaN"
String(false); // "false"

// 2
(1).toString(); // "1"
NaN.toString(); // "NaN"
false.toString(); // "false"

// 3
1 + ""; // "1"
NaN + ""; // "NaN"
false + ""; // "false"
```

**숫자 타입으로 변환**

1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
3. `+` 단항 연산자를 이용하는 방법
4. `*` 산술 연산자를 이용하는 방법

```js
// 1
Number("0"); // 0
Number("10.53"); // 10.53
Number(true); // 1
Number(false); // 0

// 2
parseInt("-1"); // -1
parseFloat("10.53"); // 10.53

// 3
+"0"; // 0
+"10.53"; // 10.53
+"false"; // 0

// 4
"-1" * 1; // -1
"10.53" * 1; // 10.53
true * 1; // 1
```

**불리언 타입으로 변환**

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두 번 사용하는 방법

```js
// 1
// 문자열 => 불리언
Boolean("x"); // true
Boolean(""); // false
Boolean("false"); // true
// 숫자 => 불리언
Boolean(0); // false
Boolean(1); // true
Boolean(NaN); // false
Boolean(Infinity); // true
// null => 불리언
Boolean(null); // false
// undefined => 불리언
Boolean(undefined); // false
// 객체 => 불리언
Boolean({}); // true
Boolean([]); // true

// 2
// 문자열 => 불리언
!!"x"; // true
!!""; // false
!!"false"; // true
// 숫자 => 불리언
!!0; // false
!!1; // true
!!NaN; // false
!!Infinity; // true
// null => 불리언
!!null; // false
// undefined => 불리언
!!undefined; // false
// 객체 => 불리언
!!{}; // true
!![]; // true
```

### 4. 단축 평가

### **논리 연산자**

논리 연산 표현식의 평가 결과는 불리언 값이 아닐 수도 있음

논리합, 논리곱 연산자 표현식은 언제나 2개의 피연산자 중 하나로 평가(좌항 → 우항)

**논리곱 연산 단축 평가 예시**

```js
"Cat" && "Dog"; // "Dog"
```

논리곱(&&) 연산자는 두 개의 피연산자 모두 true로 평가될 경우 true를 반환하므로 첫 번째 피연산자가 Truthy 값이어도 표현식을 평가할 수 없고 두 번째 피연산자까지 평가해 보아야 표현식을 평가할 수 있음. 논리곱 연산자는 연산의 결과를 결정하는 두 번째 피연산자를 그대로 반환

**논리합 연산 단축 평가 예시**

```js
"Cat" || "Dog"; // "Cat"
```

논리합(| |) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환하므로 첫 번째 피연산자가 Truthy 값이라면 두 번째 피연산자까지 평가해 보지 않아도 표현식을 평가할 수 있음. 논리합 연산자는 연산의 결과를 결정한 첫 번째 피연산자를 그대로 반환

**논리합, 논리곱 연산자 단축 평가 표현식**

| 단축 평가 표현식  | 평가 결과 |
| ----------------- | --------- | -------- | -------- |
| true              |           | anything | true     |
| false             |           | anything | anything |
| true && anything  | anything  |
| false && anything | false     |

논리합, 논리곱 연산자는 논리 연산의 결과를 결정하는 피연산자를 타입 변환 없이 그대로 반환하는데 이를 단축 평가라고 함. 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것.

```js
// if 문은 단축 평가로 대체 가능
let truthy = true;
let falsy = false;
let message = "";

// 아래 두 코드는 똑같이 동작
if (truthy) message = "완료";
message = truthy && "완료"; // truthy가 true면 message에 '완료'를 할당

// 아래 두 코드는 똑같이 동작
if (falsy) message = "미완료";
message = falsy || "미완료"; //falsy가 false면 message에 '미완료'를 할당

// 삼항 조건 연산자는 if...else 문 대체 가능
message = truthy ? "완료" : "미완료";
```

단축 평가가 사용되는 유용한 상황

**조건문 대체**

```js
const [modalOpen, setModalOpen] = useState(false);

const handleClick = () => {
  setModalOpen(true);
};

return (
  <div onClick={() => handleClick()}>
    {modalOpen && <Modal />} // modalOpen이 true면 Modal 컴포넌트 return
  </div>
);
```

**객체를 가리키는 변수가 null 또는 undefined인지 확인하고 프로퍼티를 참조할 경우**

```js
let elem = null;

let value = elem.value; // TypeError: Cannot read property 'value' of null
let value = elem && elem.value; // null
```

**함수 매개변수에 기본값을 설정할 때**

```js
// 단축 평가를 사용한 매개변수 기본값 설정
인수로 전달받은 문자열의 길이를 반환하는 함수
function getStringLength(str) {
	str = str || '';
	return str.length;
}

getStringLength();      // 0
getStringLength('hi');  // 2

//ES6의 매개변수 기본값 설정
function getStringLength(str = '') {
	return str.length;
}

getStringLength();      // 0
getStringLength('hi');  // 2
```

### **옵셔널 체이닝 연산자**

ES11에서 도입됨 ?. 연산자 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어감

옵셔널 체이닝 연산자 도입 이전에는 논리 연산자 &&를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인함

논리 연산자를 사용하면 좌항 피연산자가 null 또는 undefined가 아닌 Falsy 값인 경우에도 좌항 피연산자를 그대로 반환

```js
let elem = null;

// elem이 Falsy 값이면 elem으로, Truthy 값이면 elem.value로 평가
let value = elem && elem.value;
console.log(value); // null

let str = "";

// 문자열의 길이를 참조
let length = str && str.length;

// null 또는 undefined가 아니지만 빈 문자열 ''는
// Falsy 값이기 때문에 문자열의 길이를 참조하지 못함
console.log(length); // ''
```

하지만 옵셔널 체이닝 연산자 ?.는 좌항 피연산자가 Falsy 값이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어감

```js
let str = "";

// 문자열의 길이를 참조 좌항의 피연산자가 Falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어감
let length = str?.length;
console.log(length); // 0
```

### **null 병합 연산자**

ES11에서 도입된 null 병합 연산자 ??는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환

```js
// 좌항의 피연산자가 null 또는 undefined면 우항의 피연산자 반환
// 그렇지 않으면 좌항의 피연산자 반환
let foo = null ?? "default string";
console.log(foo); // "default string"
```

변수에 기본값을 설정할 때 유용함

```js
// 기본값을 숫자 0이나 빈 문자열 ''로 지정하고 싶은 경우에도
// 0과 ''이 Falsy 값이기 때문에 우항의 피연산자를 반환(의도와 다름)
let foo = "" || "default string";
console.log(foo); // "default string"

// 좌항의 피연산자가 Falsy 값이라도
// null 또는 undefined가 아니면 좌항의 피연산자 반환
let foo = "" ?? "default string";
console.log(foo); // ""
```
