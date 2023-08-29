# 08장 제어문

### 1. 블록문

- **0개 이상의 문을 중괄호로 묶은 것**으로 코드 블록 또는 블록이라고도 함.

- 단독으로 사용할 수도 있지만 일반적으로 제어문이나 함수를 정의할 때 사용.

- 언제나 문의 종료를 의미하는 자체 종결성을 가짐 → 세미콜론 붙이지 않음.

### 2. 조건문

- **주어진 조건식에 평가 결과에 따라 코드 블록의 실행 여부을 결정**.

- 조건식은 불리언 값으로 평가될 수 있는 표현식.

- 자바스크립트는 if…else 문과 switch 문 두 가지 조건문을 제공.

- **if…else 문의 조건식은 불리언 값**으로 평가

- 반면에 **switch 문의 표현식은 문자열이나 숫자 값**인 경우가 많음.

- if…else 문 → 논리적 참, 거짓으로 실행할 코드 블록 결정

- switch 문 → 다양한 경우(case)에 따라 실행할 코드 블록 결정

#### if…else 문

- 조건식의 평가 결과가 **참일 경우 if 문의 코드 블록 실행**

- **거짓일 경우 else 문의 코드 블록 실행**

- if 문의 조건식은 불리언 값으로 평가되어야 하기 때문에 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 불리언 타입으로 암묵적 타입 변환 수행

```js
// if...else
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행
}

//if...else if...else
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행
} else if (조건식2) {
  // 조건식2가 참이면 이 코드 블록이 실행
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행
}
```

- else 문과 else if 문은 선택사항

- **대부분의 if…else 문은 삼항 조건 연산자로 바꾸어 쓸 수 있음.**

#### switch 문

- **표현식을 평가하여 값이 일치하는 표현식을 갖는 case 문으로 흐름을 옮김**

```js
switch (표현식) {
	case 표현식1:
		표현식1과 switch 문의 표현식이 일치하면 실행될 문;
		break;
	case 표현식2:
		표현식2와 switch 문의 표현식이 일치하면 실행될 문;
		break;
	default:
		switch 문의 표현식과 일치하는 case 문이 없을 떼 실행될 문;
}
```

- default 문은 선택사항

- break 문을 작성하지 않으면 switch 문의 평가 결과와 일치하는 case 문으로 실행 흐름이 이동하여 문을 실행한 후 switch 문을 탈출하지 않고 이후의 모든 case 문과 default 문을 실행하고 종료. 이를 폴스루(fall through)라 함.

### 3. 반복문

#### for 문

조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행.

- **for 문**

  - **형식**

    ```js
    for (변수 선언문 or 할당문; 조건식; 증감식) {
        조건식이 참일 동안 반복 실행될 문
    }
    ```

  - **예시**

    ```js
    for (let i = 0; i < 2; i++) {
      console.log(i);
    }
    // for 문 내 변수 선언문의 변수 이름은 반복을 의미하는
    // iteration의 i를 사용하는 것이 일반적
    ```

  - **for 문 예시 실행 결과**

    **0**

    **1**

  - **for 문 예시 실행 흐름**

    1. 변수 선언문 i = 0 실행 -> 조건식(i < 2)에 참인지 평가(0 < 2, true)
    2. 평가 결과가 참이므로 console.log(i) 실행
    3. 증감식 i++가 실행되어 i 변수의 값이 1이 됨
    4. 조건식에 참인지 평가(1 < 2, true) -> console.log(i) 실행
    5. 증감식 i++가 실행되어 i 변수의 값이 2가 됨
    6. 조건식에 참인지 평가(2 < 2, false) -> for 문 실행 종료

- **무한루프 for 문**
  - **형식**
    ```js
    for (;;) {...} // 선언문 조건식 증감식은 옵션. 모두 미지정 시 무한루프.
    ```
- **중첩 for 문**
  - **예시**
    ```js
    // 주사위 두 개를 던졌을 때 두 눈의 합이 6인 경우의 수를 출력
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        if (i + j === 6) console.log(`[${i}, ${j}]`);
      }
    }
    ```
  - **중첩 for 문** **실행 결과**
    **[1, 5]**
    **[2, 4]**
    **[3, 3]**
    **[4, 2]**
    **[5, 1]**

#### while 문

주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행

while 문 조건식의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료

조건식의 평가 결과가 불리언 값이 아닐 경우 불리언 값으로 암묵적 타입 변환

- **while 문**

  - **예시**

    ```js
    let count = 0;

    // count가 3보다 작을 때까지 코드 블록을 계속 반복 실행
    while (count < 3) {
      console.log(count);
      count++;
    }
    ```

  - **예시 실행 결과**
    **0**
    **1**
    **2**

- **무한루프 while 문**

  - **형식**

    ```js
    while (true) {...}
    ```

  - **조건 탈출 무한루프 예시**

    ```js
    let count = 0;

    while (true) {
      console.log(count);
      count++;
      // count가 3이면 코드 블록을 탈출
      if (count === 3) break;
    }
    ```

  - **예시 실행 결과**
    **0**
    **1**
    **2**

#### do…while 문

코드 블록을 먼저 실행하고 조건식을 평가 → 코드 블록이 최소한 한 번은 실행

- **예시**

  ```js
  let count = 0;

  // count가 3보다 작을 때까지 코드 블록 계속 반복 실행
  do {
    console.log(count);
    count++;
  } while (count < 3);
  ```

- **실행결과**

  **0**

  **1**

  **2**

for 문은 반복 횟수가 명확할 때

while 문은 반복 횟수가 불명확할 때

do…while 문은 반복 횟수가 불명확하고 최소 한 번은 실행되어야 할 때

#### break 문

break 문은 레이블 문, 반복문, switch 문의 코드 블록을 탈출함

그 이외의 문에서 break 문을 사용하면 문법 에러(SyntaxError) 발생

- **레이블 문**
  - 레이블 문이란 식별자가 붙은 문
  - 사실 switch 문의 case 문과 default 문도 레이블 문임
  - 레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정
- **예시**

  ```js
  foo: {
    console.log("안녕");
    break foo; // 레이블 문 foo의 코드 블록을 탈출
    console.log("절대 실행 안됨");
  }

  console.log("친구야");
  ```

- **실행 결과**
  **안녕**
  **친구야**

중첩된 for 문의 내부 for 문에서 break 문 실행 → 내부 for문을 탈출 → 외부 for 문 진입

중첩 반복문에서 빠져나갈 코드 블록을 지정하여 탈출하고 싶을 때 사용

보통 중첩된 for 문 외부로 탈출할 때 유용하지만 그 밖의 경우에는 권장하지 않음

흐름이 복잡해져서 가독성이 나빠지고 오류 발생 가능성 높아짐

- **break 문 사용 예시(문자열에서 특정 문자의 인덱스 검색)**

  ```js
  let string = "Hello World"; // [0]-H, [1]-e, [2]-l, [3]-l...
  let search = "W";
  let index;

  // 문자열은 유사 배열 -> for 문으로 순회 가능
  for (let i = 0; i < string.length; i++) {
    if (string[i] === search) {
      index = i;
      break; // 문자열의 개별 문자가 'W'면 반복문 탈출
    }
  }

  console.log(index);

  // String.prototype.indexOf 메서드를 사용해도 같은 동작
  console.log(string.indexOf(search)); // 6
  ```

- **예시 실행 결과**

  **6**

#### continue 문

반복문의 코드 블록 실행을 현 시점에서 중단 → 반복문의 증감식으로 실행 흐름을 이동

break 문처럼 반복문을 탈출하지는 않음

- **continue 문 사용 예시(문자열에서 특정 문자의 개수 세기)**

  ```js
  let string = "Hello World"; // [0]-H, [1]-e, [2]-l, [3]-l...
  let search = "o";
  let count = 0;

  // 문자열은 유사 배열 -> for 문으로 순회 가능
  for (let i = 0; i < string.length; i++) {
    // 'o'가 아니면 현 시점에서 실행을 중단하고 반복문의 증감식으로 이동
    if (string[i] !== search) continue;
    count++; // continue 문이 실행되면 이 문은 실행되지 않음
  }

  console.log(count);

  // String.prototype.match 메서드를 사용해도 같은 동작
  const regexp = new RegExp(search, "g");
  console.log(string.macth(regexp).length); // 2
  ```

- **예시 실행 결과**

  **2**

위의 **continue 문 사용 예시**처럼 if 문 내에서 실행해야할 코드가 한 줄이면 continue 문을 사용 안하는게 좋고 여러 줄이면 들여쓰기가 한 단계 더 깊어지므로 continue 문을 사용하는 편이 가독성이 더 좋음

```js
for (let i = 0; i < string.length; i++) {
  // 'o'가 아니면 현 시점에서 실행을 중단하고 반복문의 증감식으로 이동
  if (string[i] !== search) continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않음
}

// 위 코드랑 같은 동작
for (let i = 0; i < string.length; i++) {
  if (string[i] === search) count++;
}
```
