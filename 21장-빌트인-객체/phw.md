# 21장 빌트인-객체

## 자바스크립트 객체의 분류

1. 표준 빌트인 객체 : ECMA Script 사양에 정의된 객체
1. 호스트 객체 : 실행환경(Node, 브라우저) 에서 추가로 제공하는 객체
1. 사용자 정의 객체

## 원시값과 래퍼 객체

- 객체가 아닌 원시값에 프로퍼티, 메소드가 없음에도 객체처럼 동작

```js
const str = "javascript";

console.log(str.length); // 10
```

- 래퍼 객체(wrapper object) : 원시값 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를
  - 예시 : 문자열을 객체처럼 접근하면 래퍼객체 String 생성자 함수의 인스턴스 생성 문자열은 래퍼객체 내부슬롯 [[StringData]] 에 할당
- null과 undefined 는 래퍼객체를 생성하지 않는다.

## 전역 프로퍼티

- Infinity 숫자 무한대를 나타냄
- NaN 숫자 값이 아님을 나타냄
- eval js코드를 나타내는 문자열을 받아 런타임때 실행
  - 사용금지
- isFinite 인수가 유한수인지 판단 유한일경우 true 반환 무한대, NaN일 경우 false 반환
- isNaN 인수가 NaN일 경우 true 반환
- parseFloat 인수를 실수화 하여 반환
  - parseInt 정수화
