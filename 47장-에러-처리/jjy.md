# 47장 에러-처리

## 에러 처리의 필요성

에러가 발생하지 않는 코드를 작성하는 것은 불가능하다. 그렇기 때문에 에러에 대해 대처하지 안혹 방치하면 프로그램은 강제 종료된다.

try ... catch문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.

직접적으로 에로ㅓ를 발생하지 않는 예외적인 상황이 발생할 수도 있다. 예외적인 상황이 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다. 그렇기 때문에 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전제로하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## try...catch...finally문

에러 처리를 구현하는 방법

- if문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 확인해서 처리라는 방법
- 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 하는 방법 --> try...catch...finally문

```js
try {
  // 실행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
  // try 코드 블록에서 에러가 발생하면 이코드 블록의 코드가 실행됨
  // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
} finally {
  // 에러 발생과 강선 업싱 반드시 한 번 실행됨
}
```

## Error 객체

- Error 생성자 함수로 에러 객체를 생성
- 에러를 상세히 설명하는 어러 메시지를 인수로 전달

```js
const error = new Error('invalid');
```

| 생성자 함수    | 인스턴스                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| Error          | 일반적인 에러 객체                                                        |
| SyntaxError    | 문법 에러                                                                 |
| ReferenceError | 참조할 수 없는 식별자를 참조했을 때 에러                                  |
| TypeError      | 타입 에러                                                                 |
| RangeError     | 허용 범위를 벗어났을 때 발생하는 에러                                     |
| URIError       | encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 |
| EvalError      | eval 함수에서 발생하는 에러                                               |

## throw 문

에러 객체를 생성한다고 에러가 발생하는 것은 아니다. 에러를 발생시키기 위해서는 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

```js
throw 표현식;
```

```js
try {
  // 에러 객체를 던지면 catch 코드 블록이 실행됨
  throw new Error('error');
} catch (err) {
  console.log(err);
}
```

## 에러의 전파

```js
const foo = () => {
  throw Error('foo에서 발생한 에러');
};

const bar = () => {
  foo();
};

const var = () => {
  bar();
};

try {
  baz();
} catch (err) {
  console.errot(err)
}
```

foo 실행 컨텍스트(에러 발생)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  
bar 실행 컨텍스트  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  
baz 실행 컨텍스트  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  
전역 실행 컨텍스트
