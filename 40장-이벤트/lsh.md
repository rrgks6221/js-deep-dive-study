# 40장 이벤트

## 40.1 이벤트 드리븐 프로그래밍

> 특정 이벤트가 발생했을 때 이벤트 핸들러를 통해 이벤트에 대한 처리를 위임하는 프로그래밍 패러다임이다. 이벤트 핸들러란 이벤트가 발생할 때 호출될 함수이다.

## 40.2 이벤트 타입

> 이벤트 타입은 이벤트의 종류를 나타내는 문자열이다.
> 브라우저 상에서의 이벤트 타입은 아래와 같은 종류가 있다.

- 마우스 이벤트
- 키보드 이벤트
- 포커스 이벤트
- 폼 이벤트
- 값 변경 이벤트
- DOM 뮤테이션 이벤트
- 뷰 이벤트
- 리소스 이벤트

## 40.3 이벤트 핸들러 등록

> 이벤트 핸들러는 이벤트가 발생했을 때 브라우저같은 실행환경에 호출을 위임한 함수로 브라우저에서 등록하는 방법은 3가지이다.

- 이벤트 핸들러 어트리뷰트 방식
- 이벤트 핸들러 프로퍼티 방식
- addEventListener 방식

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <button onclick="sayHi('Lee')">어트리뷰트 방식1</button>
    <button onclick="console.log('Hi!'); console.log('Lee')">
      어트리뷰트 방식2
    </button>
    <button id="pp">프로퍼티 방식</button>
    <button id="listener">리스너 방식</button>

    <script>
      function sayHi(name) {
        console.log(`Hi! ${name}`);
      }

      const $ppButton = document.getElementById('pp');

      $ppButton.onclick = function () {
        console.log('프로퍼티 이벤트 핸들러');
      };

      const $listenerButton = document.getElementById('listener');

      $listenerButton.addEventListener('click', function () {
        console.log('addEventListener 방식');
      });
    </script>
  </body>
</html>
```

## 40.4 이벤트 핸들러 제거

> EventTarget.prototype.removeEventListener 메서드로 제거할 수 있다.
