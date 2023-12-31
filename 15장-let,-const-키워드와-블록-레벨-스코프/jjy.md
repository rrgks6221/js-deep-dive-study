# 15장 let,-const-키워드와-블록-레벨-스코프

## var 키워드로 선언한 변수의 문제점

- 변수 중복 선언 허용
- 함수 레벨 스코프
- 변수 호이스팅

## let 키워드

- 변수 중복 선언 금지
- 블록 레벨 스코프
- 변수 호이스팅이 안되는 것처럼 실행됨
- 전역 객체에 포함 안 됨

#### 변수 호이스팅이 발생한다는 것의 근거

```js
let foo = 1;
{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2;
}
```

&nbsp;전역변수에 foo가 이미 존재하지만 블록 스코프안에서 새로운 foo가 호이스팅이 일어나면서 레퍼렌스 오류가 발생하게 된다.

&nbsp;이런 식을 실행되는 이유는 var의 경우는 선언 단계와 초기화 단계가 동시에 이루어 지게된다. 하지만 let의 경우는 선언 단계와 초기화 단계가 나누어져서 실행된다. 그리고 이 이 스코프의 시작 지점부터 초기화 시작 시점까지 변수를 참조할 수 없는 구간을 일시적 사각지대라고 부른다.

## const 키워드

대부분의 특징이 let과 동일

- 선언과 초기화가 동시에 진행되어야 함
- 재할당 금지
- 재할당을 금지할 뿐 불변을 의미하지 않음(객체 안의 내용은 변경 가능)

## var vs. let vs. const

- ES6를 사용중이라면 var 키워드는 가용하지 않는다.
- 재할당이 필요한 경우만 let을 사용(스코프는 최대한 좁게 만든다)
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 키워드 사용
