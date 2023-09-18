# 20장 strict mode

## 본문 요약

# 20.1 strict mode란?

다른 말로 엄격 모드 라고도 한다. 자바스크립트로 작성된 코드를 평가함에 있어 더 엄격히 문법을 준수하도록 하는 것 이다. strict mode를 사용하면 의도치 않은 오류를 사전에 방지 할 수 있다.

# 20.2 strict mode의 적용 / 20.3 전역에 strict mode를 적용 하는 것은 피하자

strict mode를 적용하기 위해선 전역의 선두 혹은 함수의 선두에 “user strict”를 명시한다. 하지만 전역에 strict mode를 선언할 경우 외부의 non-strict 라이브러리를 불러와 사용하여 strict한 코드와 non-strict한 코드가 혼용되어 의도치 않은 결과가 나타날 수 있기 때문에 전역에 strict mode를 명시하는 것은 피하자

# 20.4 함수 단위로 strict mode를 적용 하는 것도 피하자

함수 내부 상단에서도 strict mode를 적용 시킬 수 있다. 그러나 이런 식으로 strict mode를 적용 시키면 해당 함수만 strict mode가 적용 되기 때문에 어떤 함수는 strict mode이고 다른 함수는 아닌 바람직 하지 않은 상황이 되며 그렇다고 일일이 strict mode를 적용 시키기도 번거롭다.

따라서 strict mode를 적용하는 가장 적절한 방법은 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

# 20.5 strict mode가 발생시키는 에러

### 20.5.1 암묵적 전역

```jsx
(function () {
  "use strict";
  po = 1;
  console.log(po);
})();
```

위 예제는 strict mode가 적용 되지 않았을 경우 1을 출력한다. po가 선언되지 않았음에도 자바스크립트가 암묵적으로 전역 객체에 po 프로퍼티를 생성시킨다. 이러한 현상을 암묵적 전역이라 한다.

strict mode가 적용된 코드는 po가 선언되지 않았다는 오류를 반환한다.

### 20.5.2 변수,함수,매개변수의 삭제

delete연산자로 객체의 프로퍼티가 아닌 변수,함수,매개변수를 삭제하려 하면 오류를 반환한다.

### 20.5.3 매개변수 이름의 중복

함수의 매개변수의 이름을 중복되게 작성하면 오류를 반환한다.

# 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

strict mode 에선 함수를 일반 함수로 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에선 this를 사용할 필요가 없기 때문이다.

### 20.6.2 arguments 객체

strict mode 에선 매개변수에 전달된 인수를 재할당하여 변경해도 arguments객체에 반영 되지 않는다.
