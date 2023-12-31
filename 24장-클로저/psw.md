# 24장 클로저

# 24.1 렉시컬 스코프

렉시컬 스코프(정적 스코프)의 의미는 함수가 어디서 정의 되었는지에 따라 상위 스코프를 결정하는 방식을 말한다.

# 24.2 함수 객체의 내부 슬롯 [[Environment]]

렉시컬 스코프가 가능하려면 함수는 어디에서 호출 되던지 상관 없이 자신이 선언된 스코프의 환경을 기억하여야 한다. 이를 저장 해 두는 게 내부 슬롯 [[Environment]] 이다.

# 24.3 클로저와 렉시컬 환경

함수의 생명 주기가 반드시 렉시컬 환경의 생명 주기와 같지는 않다. 중첩 함수의 경우 [[Environment]] 에 렉시컬 환경을 참조 하고 있다면 함수가 생명 주기가 끝나 제거되어도 렉시컬 환경은 참조되어 살아 있는 것이다.

클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적 이다.

# 24.4 클로저의 활용 / 24.5 캡술화와 정보 은닉

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용된다. 상태를 은닉하고 지정된 함수만 상태 변경을 허용한다.

캡슐화는 객체의 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나로 묶은 것을 뜻한다.
