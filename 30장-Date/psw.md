# 30장 Date

## 본문 요약

# 30.1 Date 생성자 함수

### 30.1.1 new Date()

Date 생성자 함수를 인수 없이 new와 호출하게 되면 Date객체가 아닌 현재 날짜와 시간을 담은 문자열을 반환한다.

### 30.1.2 new Date(milliseconds)

인수로 밀리초를 주면 1970년 1월 1일 00:00:00를 기점으로 인수로 받은 밀리초 만큼 경과한 시간의 Date객체를 반환한다.

### 30.1.3 new Date(year,month[,day,hour,minute,second,millisecond])

인수로 연,월,일,시,분,초,밀리초중 필요한 것을 받고 받지 않은 인수는 0이나 1로 초기화한다.

인수로 받은 시간에 해당하는 Date객체를 반환한다.

# 30.2 Date메서드

### 30.2.1 Date.now

1970년 1월 1일 00:00:00부터 현재까지 몇 밀리초가 경과했는지 숫자로 리턴한다.

### 30.2.2 Date.parse

1970년 1월 1일 00:00:00부터 입력받은 인수까지 몇 밀리초가 경과했는지 숫자로 리턴한다.

### 30.2.3 Date.UTC

Date.parse와 같지만 입력 받는 인수의 형태가 다르다.

### 30.2.4 Date.prototype.get ~~~

Date객체의 년도,월, 일을 가져온다.

### 30.2.5 Date.prototype.set ~~~

Date객체의 년도,월, 일을 인수로 설정한다.

### 30.2.6 Dateprototype. ~~~ String

해당 Date객체를 문자열로 반환한다. 메서드 마다 반환하는 방식이 다르다.
