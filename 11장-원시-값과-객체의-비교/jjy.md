# 11장 원시-값과-객체의-비교

### 원시타입

- 원시 타입의 값: 변경 가능한 값
- 원시 값을 변수의 할당 하면 변수에는 실제 값 저장
- 원시 값을 갖는 변수를 다른 변수에 할당하면 원본의 원시 값이 복사되어 전달  
  -> 값에 의한 전달

### 객체타입

- 객체 타입의 값: 변경 가능한 값
- 객체를 변수에 할당하면 변수에는 참조 값이 저장
- 객체를 가르키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달  
  -> 참조에 의한 전달

## 원시 값

### 변경 불가능한 값

&nbsp;원시 값은 변경 불가능한 값이다. 즉 원시 값은 한번 생성된 원시 값은 읽기 전용 값으로서 변경할 수 없다. 변경 불가능하다는 것은 변수가 아니라 값에 대한 진술이다. 그러므로 상수 같은 경우는 재할당이 금지된 변수이지 상수와 변경 불가능한 값을 동일시하는 것은 곤란하다. 그리고 이러한 원시 값의 특성은 데이터의 신뢰를 보장한다.

&nbsp;변수에 새로운 원시 값을 재할당하면 기존의 원시 값을 변경하는 것이 아니라 새로운 메모리를 공간을 확보하고 재할당한 원소 값을 저장한 후, 변수는 새롭게 재할당한 원시 값을 가르킨다. 이때 변수가 참조하던 메모리 공간의 주소가 바뀐다. 이런한 값의 특성을 불변성이라고 한다. 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다. 만약 재할당 이외에 원시 값인 변수 값을 변경할 수 있다면 예기치 않게 변수 변경이 변경될 수 있다는 것을 의미하며, 이는 상태 변경을 추척하기 어렵게 만든다.

### 문자열과 불변성

&nbsp;문자열은 다른 원시 값과 비교할 때 독특한 특징이 있다. 문자열은 몇 개의 문자로 이뤄졌느냐에 따라 필요한 메모리 공간의 크기가 결정된다. 그리고 문자열은 유사 배열 객체이면서 이터러블이므로 배열과 유사하게 각 문자에 접근할 수 있지만, 생성된 문자열의 일부 문자를 변경해도 반영되지 않는다. 이러한 불변성은 데이터의 신회를 보장한다.

### 값의 의한 전달

&nbsp;변수에 원시 값을 갖는 변수를 할당하면 할당받는 변수에는 할당되는 변수의 원시 값이 복사되어 전달된다. 이를 값에 의한 전달이다. 할당받은 변수와 할당된 변수의 값은 다른 메모리 공간에 저장된 별개의 값이다. 그러므로 할당받은 변수의 값을 변경해도 활당된 변수의 값에는 어떠한 영향도 주지 않는다.

&nbsp;사실 ECMAScript 사양에는 변수를 통해 메모리를 어떻게 관리해야 하는지 명확하게 명시되어 있지 않기 때문에 할당되는 동시에 각 다른 변수의 값이 다른 메모리 공간으로 저장되는지, 아니면 파이썬처럼 변수를 할당하는 시점에는 같은 원시 값을 참조하고 있다가, 재할당이 이뤄졌을 때 새로운 메모리 공간에 재할당된 값을 저장하는 지 확신할 수 없다.

## 객체

&nbsp;객체는 원시 값과 같이 확보해야할 메모리 공간의 크기를 사전에 정해 둘 수 없다. 그리고 객체는 복합적인 자료구조이므로 관리하는 방식이 복잡하고 수현 방식도 브라우저 제조사마다 다를 수 있다. 그러므로 객체를 생성하고 프로퍼티에 접근하는 것도 원시 값에 비교할 때 비용이 많이 드는 일이다.

#### 자바스크립트 객체의 관리 방식

```
 클래스 기반 객체지향 프로그래밍 언어는 사전에 정의된 클래스를 기반으로 객체를 생성한다. 그렇기 때문에 객체가 생성된 이후에도 프로퍼티를 삭제하거나 추가할 수가 없다. 하지만 자바스크립트는 클래스가 없이 객체를 생성할 수 있으며 동적으로 프로퍼티와 메서드를 추가할 수 있다. 이는 사용하기에는 편리하지만 클래스 기반보다 생성과 프로퍼티 접근에 비용이 더 많이 드는 비효율적인 방식이다. 따라서 V8 엔진에서는 동적 탐색대신 히든 클래스라는 방식을 사용해 C++ 객체의 프로퍼티에 접근하는 정도의 성능을 보장한다.
```

### 변경 가능한 값

&nbsp;객체 타입의 값은 변경 가능한 값이다. 객체는 원시 값과 달리 객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 참조 값에 접근할 수 있다. 그래서 원시 값의 경우는 "변수는 **값을 갖는다" 또는 "변수의 값은 **이다"와 같은 표현은 쓰지만 객체는 "변수는 객체를 참조하고 있다" 또는 "변수는 객체를 가르키고 있다"라는 표현을 쓴다.

&nbsp;객체는 변경가능한 값이기 때문에 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다. 즉, 프로퍼티를 동적으로 추가하고 삭제, 갱신을 할 수 있다. 객체를 재할당하지 않기 때문에 객체를 할당한 변수의 참조 값은 변경되지 않는다.

&nbsp;객체를 생성하고 관리하는 방법은 매우 복잡하며 비용이 많이 드는 일이다. 원시 값처럼 이전 값을 복사해서 새롭게 생성한다면 신뢰성이 확보되겠지만 복사해서 생성하는 비용이 많이 든다. 따라서 비용을 절약하여 성능을 향상시키기 위해 객체는 변경 가능한 값으로 설계되어 있다.

&nbsp;객체는 이러한 구조적 단점에 따른 부작용이 있다. 그것은 여러 개의 식별자가 하나의 객체를 공유할 수 있다는 것이다.

#### 얕은 복사와 깊은 복사

```
객체를 프로퍼티 값으로 갖는 객체의 경우 얕은 복사는 참조 값을 복사하는 한 단계까지만 하는 복사를 말하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.
```

### 참조에 의한 전달

객체를 가르키는 변수(원본)를 다른 변수(사본)에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 참조에 의한 전달이라 한다. 그래서 원본과 사본이 저장되는 메모리 주소는 다르지만 동일한 객체를 가리킨다. 이것이 두 개의 식별자가 하나의 객체를 공유함을 의미한다. 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
