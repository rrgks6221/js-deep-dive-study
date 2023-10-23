# 48장 모듈

- 모듈: 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각
- 기능을 기준으로 파일 단위로 분리
- 자신만의 파일 크소프(모듈 스코프)를 가질 수 있어야 함
- 모든 자산은 캡슐화
- 개별적 존쟁로서 애플리케이션과 분리되어 존재
- 공개가 필요한 자산에 한정하여 명시적으로 export로 선택적으로 공개 가능
- 모듈이 공개한 자산 중 일부 또는 전체를 자신의 스코프로 불러들여 재사용하는 것을 import하고 한다.
- 재사용성이 좋아서 개발 효율성과 유지보수성을 높일 수 있다.

## 자바스크립트와 모듈

자바스크립트는 script 태그를 사용하여 외부의 자바스크립트 파일을 로드할 수 있지만 파일마다 독립적인 파일 스코프를 갖지 않기 때문에 모듈이라고 보기 힘들다.

이를 해결하기 위해 CommonJs와 AMD가 나왔다. Node.js는 CommomJS를 채택했다.

## ES6 모듈(ESM)

ES6에서 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가했다.

script 태그에 type="module" 어트리뷰트를 추가하면 그 자바스크립트 파일은 모듈로서 동작한다. 그리고 파일 확장자는 mjs를 사용할 것을 권장한다. 그리고 EMS는 기본적으로 strict mode가 적용된다.

### 모듈 스코프

EMS은 파일은 자체의 독자적인 모듈 스코프를 제공한다. 그 때문에 모듈 내에서 var 키워드를 선언한 변수는 더는 전역 변수가 아니며 window 객체의 프로퍼티도 아니게 된다.

### export 키워드

- 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 할 때 export 키워드를 사용한다.

```js
// test.mjs
const pi = Math.Pi;

const func = () => {
  console.log('hello');
}

export = {pi, func}
```

### import 키워드

- export한 식별자를 자신의 모듈 스코프 내부로 로드하려면 import 키워드를 사용한다.

```js
// app.mjs
import {pi, func} from ./test.mjs

...
```

```html
<script
  type="module"
  src="app.mjs"
></script>
```

여기서 app.mjs는 진입점이기 때문에 반드시 script 태그를 사용해야하지만 test.mjs는 app.mjs의 import문에 의해 로드되는 의존성이 있기 때문에 따로 script 태그로 로드하지 않아도 된다.

```js
import * as lib form './test/mjs';
import {pi as PI, func as f} from './test/mjs'
```

이런식으로 as를 사용하여 이름을 변경하여 사용할 수 있다.

모듈에서 하나의 값만 export 한다면 default 키워드를 사용할 수 있다. default 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export한다. 이 때 var, let, const 키워드는 사용할 수 없다. default 키워드로 export 한 모듈은 {} 없이 임의의 이름을 import한다
