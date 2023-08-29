# 08장 제어문

> 제어문은 조건에 따라 코드블록을 실행(조건문) 반복 실행(반복문)할 때 사용한다. 사실상 프로그래밍 언어의 많은 문법이 있지만 모두 이 두가지 행위를 하기 위해 존재한다.

## 8.1 블록문

> 블록문은 0개 이상의 문을 중괄호로 묶은 것이다.
> 0 개 이상인 이유는 중괄호를 열고 다시 닫아도 문법상으로 아무 문제가 없기 때문이다.

## 8.2 조건문

> 조건문은 주어진 조건식의 평가에 따라 코드 블록 실행을 결정한다.

### 8.2.1 if ... else 문

> if ... else 문은 이름에서 알 수 있듯이 특정 경우를 정의하고 코드블록을 실행한다.

```js
if (조건식) {
  console.log(true);
} else {
  console.log(false);
}
```

조건식을 두개가 아닌 여러개를 사용하고 싶다면 else if 문을 사용한다.

- if 문과 else 문은 한번만 사용할 수 있지만 else if 문은 여러번 사용할 수 있다.

```js
if (조건식1) {
  console.log('조건식1');
} else if (조건식2) {
  console.log('조건식2');
} else if (조건식3) {
  console.log('조건식3');
} else {
  console.log('다른경우');
}
```

조건에 만족할 때 실행해야할 코드블록이 하나뿐이라면 중괄호를 생략할 수 있다.

```js
if (조건식) console.log(true);

if (조건식)
  console.log('askdnbajasjdbasjkdbkjasbdkjasbdaskdnasjdbasjbdjsabdsa');
```

if ... else 문은 삼항 연산자로 치환 가능하다.

```js
let foo = 2;
let conditionResult;
const ternaryResult = foo % 2 ? '홀수' : '짝수';

if (foo % 2) {
  result = '홀수';
} else {
  result = '짝수';
}

console.log(conditionResult === ternaryResult); // true
```

- 예제처럼 삼항연산자를 사용할 경우 const 키워드를 통해 변수를 할당하기 때문에 이점이 있다.
- 이처럼 변수에 할당할 경우에는 삼항연산자를 자주 쓰는편이다.
- 하지만 삼항연잔사는 하나의 식에 2개이상 들어갈 경우 가독성을 헤친다.

#### [no return else](https://eslint.org/docs/latest/rules/no-else-return)

> ES lint 에서 정의한 규칙으로 return 뒤에는 else 를 붙이지 않는 코딩 스타일 가이드이다.

```js
function fn1(bool) {
  if (bool) {
    console.log(true);
    return;
  }
  console.log(false);
}

function fn2(bool) {
  if (bool) {
    console.log(true);
  } else {
    console.log(false);
  }
}
```

두 함수의 실행결과는 정확이 동일하고 no return else 규칙을 적용했을 때 indent 가 줄어들어 가독성이 증가한다.

꼭 return 문법이 아닌 같은 코드블록 내에 아래 문들을 무시하게 해주는 문법이면 모두 적용 가능하다.

**throw**

```js
if (isError) {
  throw new Error('error');
}
console.log('no error');
```

**break, continue**

```js
for (let i = 0; i > 10; i += 1) {
  if (i % 2) {
    continue;
  }
  console.log(i);
}

for (let i = 0; i > 10; i += 1) {
  if (i % 2) {
    break;
  }
  console.log(i);
}
```

#### exception priority pattern

> 예외처리를 우선적으로 하여 indent 를 줄여 코드 가독성을 올리는 패턴이다.

```js
function fn(v) {
  if (조건1) {
    if (조건11) {
      // ...
      // ...
      // ...
    }
    if (조건12) {
      throw new Error();
    }
  } else {
    throw new Error();
  }
}

function refactorFn(v) {
  if (!조건1) {
    throw new Error();
  }

  if (조건12) {
    throw new Error();
  }

  // ...
  // ...
  // ...
}
```

### 8.2.2 switch 문

> switch 일반적으로 특정 조건이 아닌 타겟의 특정 값일 경우 코드블록을 실행할 때 사용한다.

```js
let name = 'lsh';
let koreanName;

switch (name) {
  case: 'lsh'
    koreanName = '이석호';
  default:
    koreanName = null;
}

console.log(koreanName) // null
```

기본적으로 switch 문은 break 를 만나지 않는다면 아래 case 들을 계속 검사하게 된다.

```js
let name = 'lsh';
let koreanName;

switch (name) {
  case: 'lsh'
    koreanName = '이석호';
    break;
  default:
    koreanName = null;
}

console.log(koreanName) // 이석호
```

JS 의 `let` `const` 키워드는 블록 스코프를 지원하기 때문에 각 case 간에 블록이 없다면 변수를 공유한다.

```js
let name = 'lsh';
let koreanName;

switch (name) {
  case 'lsh':
    let age = 26;
    koreanName = '이석호';
  default:
    // Identifier 'age' has already been declared
    let age = null;
    koreanName = null;
}

console.log(koreanName);
```

이러한 단순한 조건식은 사실상 객체로도 표현 가능하다.

```js
let name = 'lsh';
const EN_TO_KO_NAME = {
  lsh: '이석호';
};

console.log(EN_TO_KO_NAME[name] || null)
```

C 언어 기반의 언어(C-family)는 대부분 switch 문을 지원하지만 python 같은 언어는 지원하지 않는다.
모던한 프로그래밍에서는 switch 문보다는 if 문을 사용하는 추세이다.

## 8.3 반복문

> 반복문은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다.
> JS 의 기본적은 반복문으로는 for, while, do ... while 문을 제공한다.

### 8.3.1 for 문

> for 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.
> for 문은 반복횟수가 명확할 때 사용한다. ex) arr.length

- 아무런 식도 선언하지 않으면 무한 루프가 된다.

```js
for (;;) { ... }
```

### 8.3.2 while 문

> while 문은 주어진 조건식이 참이면 코드 블록을 계속해서 반복 실행한다.
> while 문은 반복 횟수가 불명확할 때 사용한다.

### 8.3.2 do ... while

> while 블록 실행전에 do 블록을 실행한다.
> 왜 쓰는지 모르겠다 쓰지말자.

## 8.4 break 문

> break 문은 레이블 문(식별자가 붙은 문), 반복문의 코드블록을 탈출한다.

중첩 for 문의 경우 가장 가까운 for 문의 실행을 중단하지만 레이블 문을 통해 상위 for 문의 실행을 중단할 수 있다.

```js
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log(` inner :${i}, ${j} `);
  }
}
console.log('Done! ');
```

안티패턴이므로 함수로 묶어서 사용하는게 좋겠다.

```js
function fn() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (i + j === 3) return;
      console.log(` inner :${i}, ${j} `);
    }
  }
  console.log('Done! ');
}
```

## 8.5 continue 문

> continue 문은 반복문의 현 지점을 중단하고 증감식 실행흐름으로 이동시킨다. 즉 여러번의 반복문 중 현재 반복문을 중단한다.
