# 43장 Ajax

## Ajax란?

- Asynchronous JavaScript and XML
- 서버에게 비동기 방식으로 데이터를 요청하고, 수신하여 동적으로 웹페이지를 갱신하는 프로그래밍 방식
- Web API인 XMSHttpRequesr 객체를 기반으로 동작

Ajax 등장이전에는 웹페이지가 변동이 있을 경우는 html를 다시 렌더링하는 방식으로 동작했다. 드럼으로 다음과 같은 문제들이 발생하였다.

1. 변경할 필요가 없는 부분까지 포함된 html 전체를 다시 전송받기 때문에 불필요한 데이터 통신이 발생
2. 필요가 없는 부분까지 처음부터 다시 렌더링
3. 통신이 동기 방식으로 동작하기 때문에, 서버로부터 응답이 있을 때까지 다음 처리는 블로킹 됨.

Ajax의 등장으로 인해 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경할 필요가 있는 부분만 한정적으로 렌더링 하는 방식이 가능해졌다.

## JSON

- JavaScript Object Notation
- HTTP 통신을 위한 텍스트 데이터 포맷
- 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷

### JSON 표기 방식

- 키와 값으로 구성된 순수한 텍스트
- 키는 반드시 큰따옴푤로 묶어야 한다.
- 값은 객체 리터널과 같은 표기법으로 그대로 사용 가능
- 문자열은 반드시 큰따옴표로 묵어야 한다.

### JSON.stringify

- 객체를 JSON 포맷의 문자열로 변환
- 클라이언트가 서버로 전송하려면 객체를 문자열화해야 하는데 이를 직렬화라 함

```js
const obj = {
  name: 'LEE',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis'],
};

const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"LEE","age":20,"alive":true,"hobby":["traveling","tennis"]}

console.log(typeof prettyJson, prettyJson);
/* string {
  "name": "LEE",
  "age": 20,
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
} */

// replacer 함수
function fillter(key, value) {
  return typeof value === 'number' ? undefined : value;
}

const strFilteredObject = JSON.stringify(obj, fillter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/* string {
  "name": "LEE",
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
} */
```

- 객체뿐만 아니라 배열도 JSON 포맷의 문자열로 변환

### JSON.parse

- JSON 포맷의 문자열을 객체로 변환 -> 역직렬화
- 배열이 포함된 경우 배열 객체로 변환

## XMLHttpRequest

- HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용

### XMLHttpRequest 객체 생성

- XMLHttpRequest 생성자 함수를 호출하여 생성(브라우저 환경에서만 정상적으로 실행)

### XMLHttpRequest 객체의 프로퍼티와 메서드

### HTTP 요청 전송

1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화
2. XMLHttpRequest.prototype.setRequestHeader 메서드로 HTTP 요청 헤더 값 설정
3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', '/user');
xhr.setRequestHeader('content-type', 'application/json');
shr.send();
```

#### XMLHttpRequest.prototype.open

- xhr.open(method, url[, async])

| 매개변수 | 설명                             |
| -------- | -------------------------------- |
| method   | HTTP 요청 메서드                 |
| url      | HTTP 요청을 전송할 URL           |
| async    | 비동기 요청 여부, default = true |

#### XMLHttpRequest.prototype.send

- GET: 데이터를 쿼리 스트링으로 서버에 전송
- POST: 데이터를 몬체에 담아 전송(직렬화 한 후 전송)

#### XMLHttpRequest.prototype.setRequestHeader

- HTTP 요청의 헤더 값 설정
- 반드시 open 메서드 호출 이후에 호출해야함

  - Content-type: 전송할 데이터의 MIME 타입의 정보 표현

  | MIME 타입   | 서브타입                                           |
  | ----------- | -------------------------------------------------- |
  | text        | text/plain, text/html, text/css, text/javascript   |
  | application | application/json, application/x-www-form-urlencode |
  | multipart   | multipart/formed-data                              |

  - Accept: 서버가 응답할 데이터의 MIME 타입을 지정

### HTTP 응답처리

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// readystatechange가 변경되었을 때 이벤트 핸들러
xhr.onreadystatechange = () => {
  // readtState가 XMLHttpRequest.DONE이 될 때까지 그냥 리턴
  if (xhr.readyState !== XMLHttpRequest.DONE) return;
  // 상태코드가 200, 즉 통신이 성공했을데 response값 출력
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

xhr.send();
// load 이벤트는 HTTP요청이 성공적으로 완료된 경우 발생하기 때문에 XMLHttpRequest.DONE을 확인할 필요 없음
xhr.load = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```
