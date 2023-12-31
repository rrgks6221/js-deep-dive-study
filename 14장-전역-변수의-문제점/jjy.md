# 14장 전역-변수의-문제점

전역 변수의 무분별한 사용은 위험하다. 전역 변수를 반드시 사용해야 할 이유를 찾지 못 했다면 지역 변수를 사용해야 한다.

## 변수의 생명 주기

### 지역 변수의 생명 주기

&nbsp;변수에는 생성되고 소멸하는 생명 주기가 있다. 변수는 자신이 선언된 위치에서 생성되고 소멸한다. 전역 변수의 생명 주기는 애플리케이션의 생명 주기와 같다. 함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료하면 소멸한다.

&nbsp;지역 변수는 런타임 이전에 실행되는 전역 변수와는 다르게 함수가 호출된 직후 함수 몸체의 코드가 한 줄씩 순차적으로 실행되지 이전에 자바스크립트 엔진에 의해 먼저 살행된다. 함수가 종료하면 변수도 소멸되어 생명 주기가 종료된다. 즉, 지역 변수의 생명 주시는 함수의 생명 주기와 일치하다.

&nbsp;지역 변수의 생명 주기는 함수의 생명 주기와 대부분 일치하지만 지역 변수가 함수 보다 오래 생존하는 경우가 있다. 일반적으로 함수가 종료되면 함수가 생성한 스코프도 소멸하지만 누군가가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존한다. 이에 대해서는 이후 클로저에서 자세히 살펴본다.

```js
var x = 'global';

function foo() {
  console.log(x); // undefined
  var x = 'local';
}

foo();
console.log(x); // global
```

&nbsp;위 예시 처럼 호이스팅은 스코프 단위로 동작한다. 지역 변수는 함수 전체에서 유효하다. 즉, 호이스팅은 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징이다.

### 전역 변수의 생명 주기

&nbsp;전역 코드는 코드가 로드되자마자 곧바로 해석되고 실행된다. 함수는 마지막 문 또는 반환문이 실행되면 종료된다. 하지만 전역 코드에는 반환문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료 한다.

&nbsp;var 키워드로 선언된 전역 변수는 전역 객체의 프로퍼티가 된다. 이는 전역 변수의 생명 주기가 전역 객체의 생명주기와 일치한다는 것을 말한다.

#### 전역 객체

```
 전역 객체는 코드가 실행되기 이전 단계에서 엔진에 의해 어떤 객체보다고 먼저 생성되는 특수한 객체다. 브라우저에서는 window, Node.js에서는 gloval 객체를 의미한다. 환경에 따라 전역 객체를 가르키는 다양한 식별자가 존재했으나, ES11에서 globalThis로 통일 되었다.

 전역 객체는 표준 빌트인 객체, 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.
```

&nbsp;var 키워드로 선언한 전역ㄷ 변수의 생명 주기는 전역 객체의 생명 주기와 일치한다.

## 전역 변수의 문제점

### 암묵적 결합

전역 변수는 어디서든 참조하고 할당 할 수 있다. 있는 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합을 허용하는 것이다. 변수의 유효 범위가 크면 가독성도 나빠지고 의도치 않게 상태가 변경될 수 있는 위험성도 높아진다.

### 긴 생명 주기

&nbsp;전역 변수는 생명 주기가 길다. 따라서 메모리 리소스도 오랜 기간 소비한다. 더욱이 var 키워드는 변수의 중복 선언을 허용 하므로 중복될 가능성과 의도치 않은 재할당이 이뤄질 가능성이 높다.

&nbsp;지역 변수는 전역 변수보다 생명주기가 훨씬 짧다. 이는 전역 변수보다 상태 변경에 의한 오류가 발행 확률이 작다는 것을 의미하고, 리소스도 짧은 기간만 소비한다.

### 스코프 체인 상에 종점에 존재

전역 변수는 스코프 체인 상에서 종점에 존재하기 때문에 차이가 크지는 않지만 전역 변수의 검색 속도가 가장 느리다.

### 네임 스페이스 오염

&nbsp;자바스크립트의 가장 큰 문제 중 하나는 파일이 분리되어도 전역 스코프를 공유한다는 것이다. 따라서 파일 내에서 동일한 이름의 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우 예상치 못한 결과를 가져올 수 있다.

## 전역 변수의 사용을 억제하는 방법

&nbsp;전역 변수를 반드시 사용해야 할 이류를 찾지 못한다면 지역 변수를 사용해야 한다. 변수의 스코프는 좁을수록 좋다. 무분별한 전역 변수의 남방은 억제해야 한다.

### 즉시 실행 함수

&nbsp;모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다. 이 방법을 사용하면 전역 변수를 생성하지 않으므로 라이브러리 등에서 자주 사용 된다.

### 네임스페이스 객체

네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 방법이다.

```js
var MYAPP = {};

MYAPP.name = 'Lee';

console.log(MYAPP.name); // Lee
```

네임스페이스를 계층적으로 구상할 수도 있다.

```js
var MYAPP = {};

MYAPP.person = {
  name: 'Lee',
  address: 'Seoul',
};

console.log(MYAPP.person.name); // Lee
```

식별자 충돌을 방지하는 효과는 있으나 네임스페이스 객체 자체가 번역 변수에 할당되므로 그다지 유용하지는 않다.

### 모듈 패턴

&nbsp;모듈 패턴은 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다. 모듈 패턴은 클로저를 기반으로 동작한다. 모듈 패턴의 특징은 전역 변수의 억제는 물론 캡슐화까지 구현할 수 있다.

&nbsp;캡슐화는 객체 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는 데 이를 은닉이라고 한다.

&nbsp;자바스크립트는 public, private, protected 등의 접근 제한자를 제공하지 않는다. 모듈 패턴은 전역 네임스페이스의 오염을 막을 뿐만 아니라 정보 은닉도 구현 할 수 있다.

```js
var Counter = (function () {
  var num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

console.log(Counter.num);

console.log(Counter.increase()); // 1
console.log(Counter.increase()); // 2
console.log(Counter.decrease()); // 1
console.log(Counter.decrease()); // 0
```

반환되는 객체의 프로퍼티는 외부에 노출되는 퍼블릭 멤버이고, 반환하는 객체에 추가하지 않으면 외부에서 접근할 수 없는 프라이빗 맴버가 된다.

### ES6 모듈

&nbsp;ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다. 따라서 모듈 내에서 var 키워드로 선언한 변수는 더이상 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.

&nbsp;모던 브라우저에서는 ES6 모듈을 사용할 수 있다. script 태크에 type="module" 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. 모듈의 파일 확장자는 mjs를 권장한다.
