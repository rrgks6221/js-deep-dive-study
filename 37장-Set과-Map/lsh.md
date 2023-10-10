# 37장 Set과-Map

## 37.1 Set

> Set 객체는 중복되지 않는 유일한 값들의 집합이다.
> 배열과 유사하지만 다음과 같은 차이가 있다.

| 구분                           | 배열 | Set 객체 |
| ------------------------------ | ---- | -------- |
| 요소 값의 중복을 허용한다.     | O    | X        |
| 요소 순서에 의미가 있다.       | O    | X        |
| 인덱스로 요소에 접근할 수있다. | O    | X        |

### 37.1.1 Set 객체의 생성

- Set은 생성자 함수로 생성한다.
- 인수를 전달하지 않으면 빈 Set 객체가 생성된다.
- 이터러블을 인수로 전달받아 Set 객체를 생성한다.
- 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.
- 주로 중복요소를 제거할 때 많이 사용한다.

```js
const set1 = new Set();
console.log(set1); // Set(0) {}

const set2 = new Set([1, 1, 1]);
console.log(set2); // Set(1) {1}

const set3 = new Set([1, 2, 3]);
console.log(set3); // Set(3) {1,2,3}

const set4 = new Set('hello');
console.log(set4); // Set(5) {'h', 'e', 'l', 'l', 'o'}

const uniq = [new Set([1, 2, 3, 1, 1, 2, 1, 3])];
console.log(uniq); // [1,2,3]
```

### 37.1.2 요소 개수 확인

> `Set`의 요소 개수는 `Set.prototype.size` 프로퍼티를 사용한다.

```js
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

### 37.1.3 요소 추가

- `Set`의 요소를 추가할 때는 `Set.prototype.add` 메서드를 사용한다.
- `Set.prototype.add` 메서드는 `Set` 객체를 반환하기 때문에 `method chaining`이 가능하다.
- `NaN`을 같다고 평가한다. 이는 일치비교연산자(===)와 다르게 평가한다.
- `Set`객체는 JS 의 모든 값을 요소로 지정할 수 있다.

```js
const set = new Set();
set.add(1);

// chaining
set.add(2).add(3).add(4);

// NaN
console.log(NaN === NaN); // false
// 두개의 NaN 을 같다고 평가하여 중복되지 않는다.
set.add(NaN).add(NaN);

// 모든 데이터타입을 요소로 지정 가능하다.
set.add(1).add('a').add(true)...
```

### 37.1.4 요소 존재 확인

- `Set`객체에 특정 요소가 존재하는지는 `Set.prototype.has` 메서드를 사용한다.

### 37.1.5 요소 삭제

- `Set`객체에 특정 요소 삭제는 `Set.prototype.delete` 메서드를 사용한다.

### 37.1.6 요소 일괄 삭제

- `Set`객체에 모든 요소 삭제는 `Set.prototype.clear` 메서드를 사용한다.

### 37.1.7 요소 순회

- `Set.prototype.forEach` 메서드로 `Set`객체의 요소를 순회할 수 있다.
  - index가 없기 때문에 `Array.prototype.forEach`와 인터페이스를 같게하기 위해서 1, 2 번째 인자에 같은 현재 순회중인 요소의 값이 들어온다.
- `Set`은 이터러블이기 때문에 이터러블의 특징을 이용하여 순회 가능하다.

### 37.1.8 집합 연산

- `Set`객체를 이용하여 수학적 집합을 구현하기 용이하다.
  - 교집합, 합집합, 차집합, 부분집합, 상위집합 등
- 일반적으로 어플리케이션 레벨에선 라이브러리를 사용한다.

## 37.2 Map

> `Map`객체는 키와 값의 쌍으로 이루어진 컬렉션이다
> `Object`와 유사하지만 아래와 같은 차이가 있다.

| 구분                   | Object                  | Map      |
| ---------------------- | ----------------------- | -------- |
| 키로 사용할 수 있는 값 | 문자열 또는 심벌        | 모든 값  |
| 이터러블               | X                       | O        |
| 요소 개수 확인         | Object.keys(obj).length | map.size |

### 37.2.1 Map 객체의 생성

- `Map`은 생성자 함수로 생성한다.
- 생성자함수에 인수를 전달하지 않으면 빈 `Map`객체가 생성된다
- 생성자함수의 인수는 키와 값의 쌍으로 이루어진 이터러블이어야한다.
- `Map`객체는 중복된 키를 갖는 요소가 존재할 수 없다.
- `Map`객체에 중복된 요소가 추가된다면 덮어쓴다.

```js
// 빈 객체
const map1 = new Map();

// 일반적인 생성
const map2 = new Map([
  [1, 2],
  [2, 3],
  [2, 4],
]);
console.log(map2); // Map(2) { 1 => 2, 2 => 4 }

// String
// 일반적인 string 타입은 에러가 반환된다.
// string 타입은 프로터티에 접근할때만 래퍼객체가 생성되어 이터러블이 되기 때문이다.
const map3 = new Map('as');
// 생성자함수 string
// 생성자함수 string 은 String 객체를 반환하기 때문에 이터러블이다.
const map4 = new Map(new String('as'));
```

### 37.2.2 요소 개수 확인

> `Map`객체의 요소 개수를 확인할 때는 `Map.prototype.size`를 사용한다.

### 37.2.3 요소 추가

- `Map`의 요소를 추가할 때는 `Map.prototype.add` 메서드를 사용한다.
- `Map.prototype.add` 메서드는 `Map` 객체를 반환하기 때문에 `method chaining`이 가능하다.
- 중복된 키를 갖는 요소를 추가하면 값이 덮어써진다.
- `NaN`을 같다고 평가한다. 이는 일치비교연산자(===)와 다르게 평가한다.
- `Map`객체는 JS 의 모든 값을 키로 지정할 수 있다.
  - `String`, `Symbol` 타입만 허용하는 `Object` 와 가장 큰 차이점이다.

### 37.2.4 요소 취득

> `Map`객체의 요소를 취득 할때는 `Map.prototype.get`을 사용한다.

### 37.2.5 요소 존재 여부 확인

> `Map`객체의 요소의 존재여부를 확인하려면 `Map.prototype.has`를 사용한다.

### 37.2.6 요소 삭제

> `Map`객체의 요소를 삭제하려면 `Map.prototype.delete`를 사용한다.

### 37.2.7 요소 일괄 삭제

> `Map`객체의 요소를 일괄적으로 삭제하려면 `Map.prototype.clear`를 사용한다.

### 37.1.7 요소 순회

- `Map.prototype.forEach` 메서드로 `Map`객체의 요소를 순회할 수 있다.
  - index가 없기 때문에 `Array.prototype.forEach`와 인터페이스를 같게하기 위해서 1, 2 번째 인자에 같은 현재 순회중인 요소의 값이 들어온다.
- `Map`은 이터러블이기 때문에 이터러블의 특징을 이용하여 순회 가능하다.

`Map` 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.

| Map 메서드            | 설명                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------- |
| Map.prototype.keys    | Map 객체의 요소키를 값으로 같은 이터러블이면서 동시에 이터레이터인 객체를 반환한다.   |
| Map.prototype.values  | Map 객체의 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.   |
| Map.prototype.entires | Map 객체의 요소키와 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환한다. |

### Object VS Map

Object가 익숙치 않은 많은 JS 개발자들이 Object를 선호하여 String이나 Symbol 타입을 키로 지정하지 않는경우를 제외하고는 Object를 사용할텐데 역할과 설계가 다르기때문에 상황에 알맞게 올바른 자료구조를 사용해야한다.

[Map vs Object](https://kellis.tistory.com/129)
