# 02장 자바스크립트란?

- 자바스크립트는 현재 모든 브라우저의 표준 프로그래밍 언어로 자리 잡은 언어

## 2-1. ECMAScript

- 프로그래밍 언어의 값, 타입, 객체
  와 프로퍼티, 함수, 표준 빌트인 객체 등 핵심 문법을 규정
- 등장 배경 : 브라우저에 따라 웹페이지가 정상적으로 동작하지 않는 크루스 브라우징 이슈가 발생

- ES 버전별 변경점 정리

| 버전 | 출시 년도 | 변경점                                                                                                                                                                                                                                   |
| ---- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ES1  | 1997      | 초판                                                                                                                                                                                                                                     |
| ES2  | 1998      | 국제표준 규격 적용                                                                                                                                                                                                                       |
| ES3  | 1999      | 정규 표현식, try ... catch                                                                                                                                                                                                               |
| ES5  | 2009      | HTML5와 함께 출현, JSON, strict mode, 접근자 프로퍼티, 프로퍼티 어트리뷰트 제어, 배열 조작 기능(forEach, map, reduce ...)                                                                                                                |
| ES6  | 2015      | let/const, 클래스, ArrowFunction, 템플릿 리터럴, 스프레드 문법, Symbol, Promise, for...of, 모듈 import/export                                                                                                                            |
| ES7  | 2016      | 지수 연산자(\*\*), includes(Arr, Str)                                                                                                                                                                                                    |
| ES8  | 2017      | async/await, Object정적 메서드                                                                                                                                                                                                           |
| ES9  | 2018      | Object rest/spread 프로퍼티, finally(), async generator, for await ...of                                                                                                                                                                 |
| ES10 | 2019      | Object.fromEntries, Array.p.flat, Array.p.flatMap                                                                                                                                                                                        |
| ES11 | 2020      | String.p.matchAll, BigIng, globalThis, Promise.allSettled, null병합연산자, 옵셔널 체이닝 연산자, for ... in enumeration order                                                                                                            |
| ES12 | 2021      | String.p.replaceAll, Promise.any, WeakRefs, 논리 할당 연산자, 숫자 구분 기호                                                                                                                                                             |
| ES13 | 2022      | Top-level Await, Class Field Declarations, Private Methods and Fields(#), Static Class Fields and Private Static Methods, Regexp Match Indices, Ergonomic Brand Checks for Private Fields(in), Array.p.at(), Object.p.hasOwn(), Temporal |
| ES13 | 2022      | findLast(), findLastIndex(), Change Array by Copy(toReversed, toSorted, toSpliced, with)                                                                                                                                                 |

## 2-2. Ajax, Node.js

- Ajax : 비동기 방식으로 데이터 교환 하는 통신기능 (XMLHttpRequest)
- Node.js : V8엔진으로 빌드된 js 런타임 환경

## 2-3. Js 특징

- 웹 브라우저에서 동작하는 유일한 프로
  그래밍 언어
- 인터프리터 언어
- 명령형, 함수형, 프로토타입 기반 객체지향 을 지원하는 멀티 패러다임 프로그래밍 언어
