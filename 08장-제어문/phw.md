# 08장 제어문

## 블록문

- 0개 이상의 문을 중괄호로 묶은 것, 코드블록 혹은 블록이라 부름
- 블록문은 문의 종료를 의미하는 자체 종결성을 갖기 때문에 세미콜론 필요 없음

## break문

- 레이블, 반복문, switch 문의 코드 블록 외에 break 문을 사용하면 SyntaxError(문법 에러) 발생
  - 레이블 : 식별자가 붙은 문 (switch 문의 case, default 도 레이블문)
    ```js
    foo : {
        console.log(123);
        break;
        }
    ```
  ```js
  // outer라는 식별자가 붙은 레이블 for 문
  outer: for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
      if (i + j === 3) break outer;
      console.log(` inner :${i}, ${j} `);
    }
  }
  console.log("Done! ");
  //출처 lsh
  ```
