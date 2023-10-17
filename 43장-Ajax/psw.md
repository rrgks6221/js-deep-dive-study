# 43장 Ajax

# 43.1 Ajax란?

Ajax 는 Asynchronous JavaScript and XML 의 약자로 브라우저가 서버에 비동기 방식으로 데이터를 요청하고 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 뜻한다.

Ajax 이전의 웹페이지는 html태그로 감싸진 완전한 문서를 받아 웹페이지를 렌더링 하고 화면 전환이 발생하면 새로운 html을 받아야 했다.

Ajax가 도입 되고 난 후에는 변경이 필요한 부분만을 비동기적으로 렌더링 하는 것이 가능 해졌다.

###

# 43.2 JSON

JSON 은 JavaScript Object Notation 약자로 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다. 자바스크립트 뿐만 아니라 대부분의 언어에서 사용 가능한 독립형 데이터 포맷이다.

### 43.2.1 JSON 표기 방식

```json
{
  "head": "head",
  "body": 123,
  "foot": ["left", "right"]
}
```

자바스크립트의 객체 리터럴과 유사하며 키를 따옴표로 감싸주어야 한다.

### 43.2.2 JSON.stringify

객체를 JSON 포맷에 맞게끔 변환 해 주는 메서드 이다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화라 한다.

### 43.2.3 JSON.parse

JSON 포맷의 문자열을 객체로 변환한다. 서버가 클라이언트에게 전송한 JSON 데이터는 문자열이다. 이 JSON 포맷의 문자열을 객체화 하는 것을 역직렬화 라고 부른다.

# 43.3 XMLHttpRequest

브라우저는 주소창 혹은 form 태그 또는 a 태그를 통해 HTTP 요청 기능을 기본 제공한다. 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 시용한다.

### 43.3.1 XMLHttpRequest 객체 생성

XMLHttpRequest 생성자 함수를 호출하여 생성 할 수 있다. XMLHttpRequest 객체는 브라우저에서 제공하는 Web API 이기 때문에 브라우저 환경에서만 정상적으로 실행된다.

### 43.3.3 XMLHttpRequest 객체의 프로퍼티와 메서드

HTTP 요청 전송 과정은 다음과 같다.

1. XMLHttpRequest.prototype.open 메서드로 HTTP요청을 초기화 한다.
2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 요청의 헤더 값을 설정한다.
3. XMLHttpRequest.prototype.send 메서드로 요청을 전송한다.

### XMLHttpRequest.prototype.open

```jsx
req.open(method,url[,async]);
```

| 매개변수 | 의미                                                           |
| -------- | -------------------------------------------------------------- |
| method   | HTTP 요청 메서드                                               |
| url      | 요청을 전송할 URL                                              |
| async    | 비동기 요청 여부, 기본 값은 true이며 비동기 방식으로 동작한다. |

### XMLHttpRequest.prototype.send

send 메서드는 open 메서드가 초기화한 요청을 전송한다. send메서드는 요청의 몸체에 전송할 데이터를 담아 보낼 수 있다. 이를 페이로드라고 한다. 페이로드가 객체일 경우 반드시 직렬화 과정을 거쳐야 한다.

만일 HTTP 요청 메서드가 GET일 경우 페이로드값은 무시되고 null로 설정된다.

### XMLHttpRequest.prototype.setRequestHeader

setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정한다. 반드시 open 메서드로 초기화를 한 후에 사용해야 한다.

Content-type은 요청 몸체에 담아 전송할 데이터의 MIME타입을 표현하는 헤더이다.
