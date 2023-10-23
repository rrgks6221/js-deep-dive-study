# 44장 REST-API

> REST 는 HTTP 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고 REST API 는 REST 를 기반으로 서비스 API 를 구현한 것을 의미한다.

## 44.1 REST API의 구성

> REST API 는 자원, 행위, 표현 3가지로 구성된다.

| 구성 요소 | 내용                           | 표현 방법        |
| --------- | ------------------------------ | ---------------- |
| 자원      | 자원                           | URI(엔드포인트)  |
| 행위      | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현      | 자원에 대한 행위의 구체적 내용 | 페이로드(body)   |

## 44.2 REST API 설계 원칙

> REST에서 가장 중요한 기본적인 원칙은 URI는 리소스를 표현하는데 집중하고 Method 는 행위를 표현하는데 집중해야한다.

- URI는 리소스를 표현해야한다.
- 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

## 44.3 JSON Server 를 이용한 REST API 실습

> 책에서는 간단한 예제가 있지만 건너뛰고 HTTP 메서드에 대한 설명만 살펴본다.

```json
"todos": [
  {
    "id": 1,
    "title": "title1",
    "description": "description1"
  },
  {
    "id": 2,
    "title": "title2",
    "description": "description2"
  },
  {
    "id": 3,
    "title": "title3",
    "description": "description3"
  }
]
```

### 44.3.4 GET 요청

#### GET /api/todos

- todos 리소스에서 모든 todo 를 가져온다.

#### GET /api/todos/{todoId}

- todos 리소스에서 todoId 에 해당하는 todo 를 가져온다.

### 44.3.5 POST 요청

#### POST /api/todos

- todo 리소스를 새롭게 생성한다.

### 44.3.6 PUT 요청

#### PUT /api/todos/{todoId}

- todos 리소스에서 todoId 에 해당하는 todo 의 리소스 전체를 교체할 때 사용한다.

### 44.3.6 PATCH 요청

#### PATCH /api/todos/{todoId}

- todos 리소스에서 todoId 에 해당하는 todo 의 리소스 일부를 교체할 때 사용한다.

### 44.3.6 DELETE 요청

#### DELETE /api/todos/{todoId}

- todos 리소스에서 todoId 에 해당하는 todo 의 리소스를 삭제하는데 사용한다.
