# 38장 브라우저의-렌더링-과정

### 1. 요청과 응답

- 브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버로부터 응답받은 리소스를 파싱하여 렌더링하는 것이 이다.

### 2. HTTP 1.1과 HTTP 2.0

- HTTP는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜이다.
- HTTP/1.1은 커넥션당 하나의 요청과 응답만 처리한다. 요청이 많을수록 응답 시간이 증가한다.
- HTTP/2는 커넥션당 여러 개의 요청과 응답이 가능하다. HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠르다고 알려져 있다.

### 3. HTML 파싱과 DOM 생성

- HTML 문서를 브라우저에 렌더링하려면 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.
- 브라우저 렌더링 엔진은 응답받은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM(Document Object Model)을 생성한다.
- HTML 문서의 파싱 과정
  - 바이트 → 문자 → 토큰 → 노드 → DOM

### 4. CSS 파싱과 CSSOM 생성

- HTML 문서를 파싱하여 DOM을 생성하다가 CSS를 로드하는 태그(link, style)를 만나면 DOM 생성을 일시 중단하고 CSS를 파싱하여 CSSOM을 생성한다. 이후 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 시작하여 DOM 생성을 재개한다.
- 렌더링 엔진은 CSS를 HTML과 동일한 과정으로 파싱하여 CSSOM을 생성한다.
- CSSOM은 CSS의 상속(부모 요소의 폰트 등)을 반영하여 생성된다.

### 5. 렌더 트리 생성

- 생성된 DOM과 CSSOM은 렌더 트리로 결합된다.
- 렌더 트리는 렌더링을 위한 트리 형태의 자료구조로 화면에 렌더링되는 노드만으로 구성된다.(meta 태그, script 태그, display: none인 요소 등은 노드에 포함되지 않음)
- 렌더 트리는 HTML 요소의 레이아웃을 계산하는 데 사용되어 브라우저 화면에 픽셀을 렌더링하는 페인팅 처리에 입력된다.
  - 렌더 트리 → 레이아웃 → 페인트
- 자바스크립트에 의한 노드 추가 또는 삭제, 브라우저 리사이징에 의한 뷰포트 변경 등으로 리렌더링이 발생할 수 있다.
- 리렌더링은 비용이 많이 드는 작업으로 가급적 리렌더링이 자주 발생하지 않도록 주의할 필요가 있다.

### 6. 자바스크립트 파싱과 실행

- 자바스크립트 코드에서 DOM API를 사용하여 DOM을 동적으로 조작할 수 있다.
- script 태그를 만나면 DOM 생성을 일시 중단하고 자바스크립트 엔진에 제어권을 넘긴다.
- 자바스크립트의 파싱과 실행이 종료되면 다시 렌더링 엔진에 제어권을 넘겨 HTML 파싱이 중단된 지점부터 다시 파싱을 시작하여 DOM 생성을 재개한다.

### 7. 리플로우와 리페인트

- DOM이나 CSSOM이 변경되면 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기준으로 레이아웃과 페인트 과정을 거쳐 화면에 다시 렌더링된다.
- 리플로우는 레이아웃을 다시 계산하는 것이고 리페인트는 화면에 다시 페인트하는 것이다.
- 레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.

### 8. 자바스크립트 파싱에 의한 HTML 파싱 중단

- 렌더링 엔진과 자바스크립트 엔진은 순차적, 직렬적으로 파싱을 수행
- script 태그의 위치에 따라 DOM 생성이 지연될 수 있다.
- DOM 생성 이전에 DOM이나 CSSOM을 변경하는 DOM API를 사용하는 경우 문제가 발생한다.
- 이러한 문제를 회피하기 위해서 body 요소의 가장 아래에 자바스크립트를 위치시키는 것은 좋은 방법이 될 수 있다.

### 9. script 태그의 async/defer 어트리뷰트

- 위의 문제를 해결하기 위해 HTML5부터 script 태그에 async와 defer 속성이 추가되었다.
- async와 defer 속성은 src 속성을 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용할 수 있다. src 속성 없이 script 태그 내에 작성된 인라인 자바스크립트에는 사용할 수 없다.
- async와 defer 속성 모두 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 진행되지만 자바스크립트 실행 시점에 차이가 있다.
  - async 속성: 자바스크립트 파일의 로드가 끝나면 HTML 파싱을 중단하고 자바스크립트를 파싱하고 실행한다.
  - defer 속성: 자바스크립트 파일의 로드가 끝나더라도 DOM 생성이 완료된 이후에 자바스크립트의 파싱과 실행이 이루어진다. DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용하다.
