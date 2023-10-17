# 40장 이벤트

- 이벤트 핸들러 : 이벤트가 발생했을 때 호출될 함수
- 이벤트 핸들러 등록 : 브라우저에 이벤트 핸들러의 호출을 위임하는 것

이벤트 중심으로 프로그램의 흐름을 제거하는 것을 이벤트 드리븐 프로그래밍이라고 한다!

### 이벤트 핸들러 제거

addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector('button');

      const handleClick = () => console.log('button click');

      // 이벤트 핸들러 등록
      $button.addEventListener('click', handleClick);

      // 이벤트 핸들러 제거
      // addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
      // 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
      $button.removeEventListener('click', handleClick, true); // 실패
      $button.removeEventListener('click', handleClick); // 성공
    </script>
  </body>
</html>
```

### 이벤트 객체의 공통 프로퍼티

| target        | 이벤트를 발생시킨 DOM 요소                                     |
| ------------- | -------------------------------------------------------------- |
| currentTarget | 이벤트 핸들러가 바인딩된 DOM 요소                              |
| eventPhase    | 단계0: 이벤트 없음 1: 캡처링 단계, 2: 타깃 단계 3: 버블링 단계 |

clientX, clientY : 웹페이지의 가시 영역(뷰포트)을 기준으로 마우스 포인터 좌표를 나타낸다.

### 이벤트 전파

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 타깃 단계와 버블링 단계의 이벤트만 캐치한다. addEventListener 메서드 방식으로 등록한 이벤트 핸들러는 +캡처링 단계의 이벤트로 캐치 가능하다. 단, addEventListener 메서드의 3번째 인수로 true를 전달해야한다.

### 버블링을 통해 전파되지 않는 이벤트

1. 포커스 이벤트: focus/blur
2. 리소스 이벤트: load/unload/abort/error
3. 마우스 이벤트: mouseenter/mouseleave

Element.prototype.matches 메서드는 인수로 전달된 선택자에 의해 특정 노드를 탐색 가능한지 확인한다.

### 이벤트 핸들러 내부의 this

이벤트 핸들러를 호출할 때 전달한 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.  
\*화살표 함수 제외

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="handleClick(this)">Click me</button>
    <script>
      function handleClick(button) {
        console.log(button); // 이벤트를 바인딩한 button 요소
        console.log(this); // window
      }
    </script>
  </body>
</html>
```
