# 37장 Set과-Map

## Set 객체

> 중복되지 않는 유일한 값들의 집합

- 배열과의 차이

1. 동일한 값을 중복하여 포함할 수 없다.
1. 요소 순서에 의미가 없다.
1. 인덱스로 요소에 접근할 수 없다.

```js
const set = new Set([1, 1, 2, 2]); // 인수 전달하지 않으면 빈 Set 객체 생성
// 이터러블을 인수로 전달받아 생성한다. (중복된 값은 저장X)
console.log(set); //Set(2) {1, 2}

set.size = 2; // setter 없이 getter 만 존재

set.add(3); // 요소 추가, 새로운 요소가 추가된 Set 객체 반환, 중복 요소 추가시 무시된다
console.log(set); // Set(3) {1, 2, 3}

console.log(set.has(3)); // true 요소 존재 여부 확인

set.delete(2);
console.log(set); // Set(2) {1, 3} 존재하지 않는 요소 삭제시 무시, 삭제 성공여부 boolean 값 반환

set.clear(); // 요소 일괄 삭제 undefined 반환
console.log(set); // Set(0) {}
```

- NaN === NaN -> false , 추가 허용
- 0 === -0 -> true

### 요소 순회

- Set.prototype.forEach 메서드로 순회
  - forEach((현재 순회중인 요소, 현재 순회중인 요소, this) => {})
- 이터러블 이기 때문에 for ... of 문 또한 사용 가능

## Map 객체

> 키와 값의 쌍으로 이루어진 컬렉션

- 객체와의 차이

1. 키로 객체를 포함한 모든값을 사용 할 수 있다.
1. 이터러블 이다.
1. size 프로퍼티로 요소 개수 확인

```js
const map = new Map([
  ["key1", "valuel"],
  ["key2", "value2"],
]); // 키와 값의 쌍으로 이루어진 이터러블을 인수로 받는다
console.log(map); // Map(2) {"key1" => "valuel", "key2" => "value2"}
// Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다.
//따라서 Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없다.

//요소 추가
map.set("key3", "value3"); // map 객체 반환
consoel.log(map); // Map(3) {"key1" => "valuel", "key2" => "value2", key3 => "value3"}

//요소 취득
map.get("key1"); // 'value1'
//요소 존재 여부 확인
map.has("key1"); // true
// 삭제 -> delete , 일괄 삭제 clear
```

### 요소 순회

- Map.prototype.forEach 메서드로 순회
  - forEach((현재 순회중인 요소값, 현재 순회중인 요소키, this) => {})
- 이터러블 이기 때문에 for ... of 문 또한 사용 가능
