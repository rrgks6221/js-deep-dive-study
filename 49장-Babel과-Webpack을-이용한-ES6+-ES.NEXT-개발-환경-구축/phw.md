# 49장 Babel과-Webpack을-이용한-ES6+-ES.NEXT-개발-환경-구축

## Webpack

> 웹팩은 여러개 파일을 하나로 합쳐주는 모듈 번들러이다.

- 기본적으로 모듈을 지원하고 파일 분할 기능, css loader, jsx 변환 작업등에 쓰인다.
  - 여러개로 나뉘어진 js 파일을 html이 실행할 수 있는 하나의 Js 파일로 합쳐준다.
- 웹팩을 사용하는 이유 : 많은 파일을 다운하면 네트워크 부하가 커져 느려지고, 같은 이름의 변수,함수로 충돌 가능성이 있다.

## 웹팩 개념

### 1. 엔트리

```js
module.exports = {
  entry: {
    main: "./src/main.js",
  },
};
```

- 엔트리 : 의존성 그래프의 시작점

### 2. 아웃풋

```js
module.exports = {
  output: {
    filename: "bundle.js",
    path: ".dist",
  },
};
```

- 엔트리에 설정한 js파일을 시작으로 의존되어 있는 모듈을 하나로 묶어 내보낸다(번들링)
- 번들된 결과물이 나오는 위치는 output 키에 기록한다.
  - 예제) dist 디렉토리, bundle.js 파일에 결과가 나온다(html 파일에는 번들링된 bundle.js 파일만 사용)

### 3. 로더

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
// css-loader 예
```

- 웹팩이 이해하지 못하는 파일들을 이해할 수 있도록 js로 변경해주는 기능
- test : 로더를 적용할 파일 유형(일반적으로 정규표현식 사용)
- use : 해당 파일에 적용할 로더의 이름
- 로더 적용 순서는 기본적으로 오른쪽에서 왼쪽 순서이다.
- 예제) 모든 css 파일에 대해 style-loader, css-loader를 적용하겠다

### 4. 플러그인

- 로더는 파일단위(번들되기전)를 처리하고 플러그인은 번들된 결과물을 추가로 처리한다.
- 번들된 Js 난독화, 특정 텍스트 추출등의 용도로 사용
- 웹팩 객체의 plugins 배열에 추가

## Babel

> 모든 브라우저가 ES의 최신기능을 제공하지 않는다.

- 바벨 : 트랜스파일러
  - 구기능으로 변환시키는 과정이 필요할 때 사용

[babel, 폴리필 관련 참고 링크](https://ko.javascript.info/polyfills)
