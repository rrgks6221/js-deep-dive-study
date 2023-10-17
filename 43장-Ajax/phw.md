# 43장 Ajax

- Ajax : 서버에게서 응답받은 데이터를 수신해 웹페이지를 동적으로 갱신하는 프로그래밍 방식
  - 브라우저에서 제공하는 XMLHttpRequest 객체를 기반으로 동작(HTTP 비동기 통신을 위한 메서드, 프로퍼티 제공)

## JSON

> 클라이언트와 서버간의 HTTP 통신을 위한 텍스트 데이터 포맷

- JSON.stringify 메서드는 객체(배열도가능)를 JSON 포맷의 문자열로 반환한다. (직렬화)

- JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환한다. (역직렬화)

## XMLHttpRequest

- js를 사용해 HTTP요청을 전송할때 XMLHttpRequest 객체를 사용한다.

- http 요청 전송 과정

1. XMLHttpRequest.prototype.open -> HTTP 요청 초기화
1. XMLHttpRequest.prototype.setHeader -> 요청 헤더 값 설정 (필요에 따라)
1. XMLHttpRequest.prototype.send -> HTTP 요청 전송
