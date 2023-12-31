# 3장 - 자바스크립트 개발 환경과 실행 방법

## 본문 요약

# 3.1 자바스크립트 실행 환경

자바스크립트를 실행하는 환경은 대표적으로 브라우저와 Node.js로 나뉜다. 둘은 자바스크립트를 실행하는 목적이 다른데 브라우저는 CSS,HTML과 함께 웹 페이지를 렌더링 하는 것이 주 목적이지만 Node.js는 브라우저 밖의 환경에서도 자바스크립트를 실행시키는 것이 목적이다. 그렇기 때문에 둘 다 ECMAScript를 실행시킬 수 있지만 서로 호환 되지 않는 기능도 있다.

# 3.2 웹 브라우저

V8 엔진이 내장된 크롬 브라우저가 점유율 1위를 달리고 있으며 V8 엔진은 Node.js에서도 사용한다.

### 3.2.1 개발자 도구

개발자는 크롬 브라우저에 내장된 개발자 도구를 이용해 세션 및 쿠키 관리, 렌더링 된 페이지의 콘솔창 확인 등의 작업을 할 수 있다.

### 3.2.2 콘솔

에러 메세지를 확인하기 좋은 창이며 console.log() 메서드를 활용하여 코드의 실행 결과를 확인하기에도 유용하다.

### 3.2.3 브라우저에서 자바스크립트 실행

브라우저는 HTML파일을 로드 한 뒤 <script> 태그에 작성된 자바스크립트 코드를 실행한다.

### 3.2.4 디버깅

개발자 도구의 Sources 패널에서 에러가 발생한 지점을 확인하고 해결하는 디버깅을 진행 할 수 있다.

# 3.3 Node.js

프로젝트 규모가 커지거나 라이브러리 등을 사용하려면 Node.js환경에서 개발하는 것이 필수이다.

### 3.3.1 Node.js 와 npm 소개

Node.js는 자바스크립트를 브라우저 밖에서도 실행시킬 수 있는 런타임 환경이며 개발자는 Node.js를 사용하여 개발을 할 수 있다. 이 때 npm에서 Node.js에서 사용 할 수 있는 패키지를 설치하여 사용 할 수 있다.

### 3.3.2 Node.js 설치

생략

### 3.3.3 Node.js REPL

컴퓨터에 기본 탑재된 명령 프롬프트에서 node명령어로 자바스크립트 코드를 작성,실행 해 볼 수 있다.

# 3.4 비주얼 스튜디오 코드

### 3.4.1 비주얼 스튜디오 코드 설치

생략

### 3.4.2 내장 터미널

비주얼 스튜디오 코드에는 내장된 터미널이 있다. 기본적으로 윈도우 에서는 명령 프롬프트이고 필요에 의해 다른 터미널도 설치하여 사용 할 수 있다.

### 3.4.3 Code Runner 확장 플러그인

생략

### 3.4.4 Live Server 확장 플러그인

생략
