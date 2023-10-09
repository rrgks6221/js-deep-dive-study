# 31장 RegExp

## 정규 표현식이란?

- 정규 표현식: 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
- 문자열을 대상으로 패턴 매칭 기능 제공
  - 패턴 매칭: 특정 패턴과 일치한는 문자열을 검새ㄱ, 추출 또는 치환할 수 있는 기능

## 정규 표현식의 생성

- 정규 표현식 리터널
- RegExp 생성자 함수

### 정규 표현식 리터널

```
/패턴/플래그
```

```js
const regexp = /is/i;
```

### RegExp 생성자 함수

```
new RegExp(패턴,[, 플래그])
```

```js
const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, i)
// const regexp = new RegExp('is' ,i)
```

## RegExp 메서드

### RegExp.prototype.exec

- 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환
- g 플래그를 지정해도, 첫 번째 매칭 결과만 반환

### RegExp.prototype.test

- 문자열에 대해 정규 표현식의 패턴을 검색하여 불리언 값으로 반환

### String.prototype.match

- 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환
- g 플래그를 사용하면 앞서 exec 메서드와는 다르게 모든 매칭 결과를 배열로 반환

## 플래그

| 플래그 | 의미        | 설명                                                       |
| ------ | ----------- | ---------------------------------------------------------- |
| i      | ignore case | 대소문자를 구별하지 않고 패턴을 검색                       |
| g      | Gloval      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색 |
| m      | Multi line  | 문자열이 행이 바뀌더라도 패턴 검색을 계속                  |

## 패턴

### 문자열 검색

```js
const regExp = /is/;
// const regExp = /is/i; -> 대소문자 구별 X
// const regExp = /is/ig; -> 대소문자 구별 X, 패턴과 일치하는 모든 문자열
```

### 임의의 문자열 검색

```js
const regExp = /.../; // 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색
```

```js
const regExp = /A{1,2}/g; // A가 최소 1번 최대 2번 반복되는 문자열 전역 검색
const regExp = /A{2}/g; // A가 2번 반복되는 문자열 전역 검색
const regExp = /A{2,}/g; // A가 최소 2번 반복되는 문자열 전역 검색
```

```js
const regExp = /A+/g; // 최소 한번 이상 반복되는 문자열을 전역 검색
```

```js
const regExp = /colou?r/g; // u가 최대 한 번(0번 포함)이상 반복되고 r이 이어지는 문자열 전역 검색
```

### OR 검색

```js
const regExp = /A|B/; // A 또는 B를 전역 검색
```

```js
const regExp = /[AB]+/g; // A또는 B가 한 번 이상 반복되는 문자열 전역 검색
```

```js
const regExp = /[A-Z,]+/g; // A ~ Z 또는 ","가 한 번 이상 반복되는 문자열 전역 검색
```

```js
const regExp = /[A-Za-Z]+/g; // 알파벳이 한 번 이상 반복되는 문자열 전체 전역 검색
```

- \d: 0 ~ 9
- \D: 0 ~ 9가 아닌 문자(숫자가 아닌 문자)
- \w: 알파벳, 숫자, 언더스코어
- \W: 알파벳, 숫자, 언더스코어가 아닌 문자

## NOT 검색

```js
// []안에 ^은 not을 의미
const regExp = /[^0-9]+/g; // 숫자를 제외한 문자열 전역
```

```js
// []빡의 ^은 문자열의 시작을 의미한다.
const regExp = /^https/g; //  https로 시작하는지 검색
```

```js
const regExp = /com$/g; // com은로 끝나는지 검사
```

## 자주 사용하는 정규표현식

### 특정 단어로 시작하는지 검사

```js
/^https?:\/\//.test(url)
/^(http|https):\/\//.test(url) // http:// 또는 https://로 시작하는지 검사
```

### 특정 단어로 끝나는지 검사

```js
/html$/.test; // html로 끝나는지 검사
```

### 숫자로만 이루어진 문자열인지 검사

```js
/^\d+$/.test(target);
```

### 하나 이상의 공백으로 시작하는지 검사

```js
// \s는 공백 문자를 의미
/^[\s]+/.test(target);
```

### 아이디로 사용 가능한지 검사

```js
^[A-Za-z0-9]{4,9}$/.test(id)
```

### 메일로 사용 가능한지 검사

```js
^[A-Za-z0-9]([-_\.]?[0-9a-zA-Z]*@)[A-Za-z0-9]([-_\.]?[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/.test(email)
```

### 특수 문자 포함 여부 검사

```js
/[^A-Za-z0-9]/gi.test(target);
```
