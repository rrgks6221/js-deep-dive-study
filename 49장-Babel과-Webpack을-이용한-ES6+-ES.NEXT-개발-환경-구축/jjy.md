# 49장 Babel과-Webpack을-이용한-ES6+-ES.NEXT-개발-환경-구축

## Webpack

Webpack은 의존 관계에 있는 자바스크립트, CSS, 이미지 등의 리소스들을 하나(또는 여러개)의 파일로 번들링 하는 모듈 번들러다.

Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요 없다.
그리고 여러 개의 자바스크립트 파일을 하나로 번들링하므로 HTML 파일에서 script 태그로 여러 개의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

## webpack.config.js 설정 파일 작성

webpack.config.js는 WEbpack이 실행될 때 참조하는 설정 파일이다.
프로젝트 루트 폴더에 webpack.config.js 파일을 생성하고 다음과 같이 작성한다.

```js
const path = require('path');

module.exports = {
  // entry file
  entry: './src/js/main.js',
  //번들링된 js파일의 이름(filename)과 지정될 경로(path)를 지정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
          ],
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
      }
      },
  devtool: 'source-map',
  mode: 'development'
};
```

Webpack을 실행하여 트랜스파일링 및 번들링을 실행해보자.

트랜스파일링은 Babel이 소행하고 번들링은 WEbpack이 수행한다.

만약 이전에 실행시킨 빌드 명령이 실행 중인 상태라면 중지시키고 다시 다음 명령을 실행한다.

npm run build

Webpack을 실행한 결과, dist/js 폴더에 bundle.js가 생성되었다.
이 파일은 main.js, lib.js 모듈이 하나로 번들링된 결과물이다.
index.html을 다음과 같이 수정하고 브라우저에서 실행해보자.

## babel-polyfill 설치

Babel을 사용하여 ES6+/ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링해도 브라우저가 지원하지 않는 코드가 남아 있을 수 있다.
예를 들어, ES6에서 추가된 Promise, Object.assign, Array.from등은 ES5 사양으로 트랜스파일링 해도 ES5 사양에 대체할 기능이 없기 때문에 트랜스파일링되지 못하고 그대로 남는다.
src/js/main.js를 다음과 같이 수정하여 ES6에서 추가된 Promise, Object.assign, Array.from 등이 어떻게 트랜스파일링되는지 확인해보자.

```js
//src/js/main.js

import { pi, power, Foo } from './lib';

// 폴리필이 필요한 코드
console.log(
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 100);
  })
);

console.log(Object.assign({}, { x: 1 }, { y: 2 }));

console.log(Array.from([1, 2, 3], (v) => v + v));
```

다시 트랜스파일링과 번들링을 실행한 다음, dist/js/bundle.js를 확인해보면 ES5 사양으로 대체할 수 없는 기능은 트랜스파일링이 되지 않는 것을 볼 수 있다. 그렇기 때문에 @babel/polyfiil을 설치해야 한다.

npm install @babel/polyfill

@babel/polyfill은 개발 환경에서만 사용하는 것이 아니라 실제 운영 환경에서도 사용해야 한다. 따라서 개발용 의존성으로 설치하는 --save-dev 옵션을 지정하지 않는다.

ES6의 import를 사용하는 경우에는 진입점의 선두에서 먼저 폴리필을 로드하도록 한다.

```js
// src/js/main.js

import '@babel/polyfill';
import { pi, power, Foo } from './lib'
...
```

Webpack을 사용하는 경우에는 위 방법 대신 webpack.config.js파일의 entry 배열에 폴리필을 추가한다.

```js
const path = require('path');

module.exports = {
  //entry file
  entry: ['@babel/polyfill', '/src/js/main.js']
  ...
}
```

dist/js/bundle.js를 확인해보면 폴리필이 추가된것을 확인할 수 있다.
