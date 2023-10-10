# 37장 Set과-Map

## Set

- 수학적 집합을 구현하기 위한 자료구조
- 배열과 달리 동일한 값 중복 포함 불가, 요소 순서 의미 없음, 인덱스로 접근 불가
- Set 생성자 함수는 이터러블을 인수로 받아 Set 객체를 생성한다.

```js
const set = new Set();
console.log(set); // Set(0) {}

const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {'h', 'e', 'l', 'o'}
```

### 요소 개수 확인

- setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티

```js
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3

set.size = 10; // 무시됨.
console.log(size); // 3
```

### 요소 추가

- NaN 과 NaN 을 같다고 평가하여 중복 추가 허용하지 않는다.
- +0과 -0 을 같다고 평가하여 중복 추가 허용하지 않는다.

```js
const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}

set.add(2).add(3); // method chaining 가능
console.log(set); // Set(3) {1, 2, 3}

set.add(NaN).add(NaN);
console.log(set); // Set(4) {1, 2, 3, NaN}

set.add(+0).add(-0);
console.log(set); // Set(5) {1, 2, 3, NaN, 0}
```

### 요소 존재 여부 확인

```js
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

### 요소 삭제

- 추가처럼 메소드 체이닝 불가

```js
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(1);
console.log(set); // Set(1) {3}

set.delete(0); // 무시됨
console.log(set); // Set(1) {3}
```

### 요소 일괄 삭제

```js
const set = new Set([1, 2, 3]);

set.clear(); // undefined 반환
console.log(set); // Set(0) {}
```

### 요소 순회

- Set.prototype.forEach 사용
- Array.prototype.forEach 와 유사하게 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체(옵션)을 인수로 전달한다.
- 콜백 함수는 3개의 인수를 전달 받는다.
  1. 현재 순회 중인 요소 값
  2. 현재 순회 중인 요소 값
  3. 현재 순회 중인 Set 객체 자체
- 첫 번째 인수, 두 번째 인수는 같은 값이다. 이유는 Array.prototype.forEach 메서드와 인터페이스를 통일하기 위함이며 다른 의미는 없다.
- Set 객체는 순서에 의미가 없어 배열과 같이 인덱스를 갖지 않는다.
- 순서에 의미를 갖지 않지만 Set 객체를 순회하는 순서는 요소가 추가된 순서를 따른다.
- 이터러블이기에 for...of 문으로 순회 가능, 스프레드 문법, 배열 디스트럭처링 대상 가능

```js
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/

console.log(Symbol.iterator in set); // true

for (const value of set) {
  console.log(value); // 1 2 3
}

console.log([...set]); // [1, 2, 3]

const [a, ...rest] = set;
console.log(a, rest); // 1, [2, 3]
```

### 집합 연산

- Set 객체를 통해 교집합, 합집합, 차집합 등을 구현할 수 있다.

```js
// ex. 교집합-1
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) result.add(value);
  }

  return result;
};

// ex. 교집합-2
Set.prototype.intersection = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};

// ex. 합집합-1
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }

  return result;
};

// ex. 합집합-2
Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};

// ex. 차집합-1
Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }

  return result;
};

// ex. 차집합-2
Set.prototype.difference = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};

// ex. 상위 집합 확인-1
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    if (!this.has(value)) return false;
  }

  return true;
};

// ex. 상위 집합 확인-2
Set.prototype.isSuperset = function (subset) {
  const supersetArr = [...this];
  return [...subset].every((v) => supersetArr.includes(v));
};
```

##. Map
|구분| 객체| Map 객체|
|---|---|----|
|키로 사용할 수 있는 값| 문자열 또는 심벌 값| 객체를 포함한 모든 값|
|이터러블| X | O|
|요소 개수 확인| Object.keys(obj).length| map.size|

```js
// Map 생성, 인수로는 이터러블이 들어감.
const map = new Map();
console.log(map); // Map(0) {}

const map1 = new Map([['k1', 'v1'], ['k2', 'v2']);
console.log(map1); // Map(2) {"k1" => "v1", "k2" => "v2"}

// key 중복 X
const map2 = new Map([['k1', 'v1'], ['k1', 'v2']);
console.log(map2); // Map(1) {"k1" => "v2"}

// 요소 개수 확인
// getter 만 존재하는 접근자 프로퍼티
const { size } = new Map([['k1', 'v1'], ['k2', 'v2']);
console.log(size); // 2

// 요소 추가
const map3 = new Map();
map3.set('k1', 'v1');
console.log(map3); // Map(1) {"k1" => "v1"}

// set 메서드는 새로운 요소가 추가된 Map 객체를 반환하여 메소드 체이닝이 가능함.
map3
  .set('k2', 'v2')
  .set('k3', 'v3');
console.log(map3); // Map(3) {"k1" => "v1", "k2" => "v2", "k3" => "v3"}

// 중복된 키를 가질 수 없어 중복된 키를 갖는 요소 추가시 덮어씀.
// NaN, +0, -0 도 Set과 같다.
const map4 = new Map();
map4.set(NaN, 'v1').set(NaN, 'v2');
console.log(map4); // Map(1) { NaN => 'v2' }

map4.set(+0, 'v1').set(-0, 'v2');
console.log(map4); // Map(2) { NaN => 'v2', 0 => 'v2' }

// Map 객체는 키 타입에 제한이 없다.
const map5 = new Map();

const lee = { name: 'lee' };
const kim = { name: 'kim' };

map5.set(lee, 'subin').set(kim, 'babo');
console.log(map5); // Map(2) { {name: 'lee'} => 'subin', {name: 'kim'} => 'babo'}

// 요소 취득, 존재하지 않는 key의 경우 undefined 반환
console.log(map.get(lee)); // subin
console.log(map.get('key')); // undefined

// 요소 존재 확인
console.log(map5.has(lee)); // true
console.log(map5.has('key')); // false

// 요소 삭제, 존재하지 않는 key 삭제시 무시됨, 삭제 성공 여부 불리언 값 반환
map5.delete(kim);
console.log(map5); // Map(1) { {name: 'lee'} => 'subin' }

map5.delete('keyA');
console.log(map5); // Map(1) { {name: 'lee'} => 'subin' }

// 요소 일괄 삭제, 언제나 undefined 반환
const map6 = new Map([[lee, 'king'], [kim, 'queen']]);
map6.clear();
console.log(map); // Map(0) {}

// 요소 순회
// Set 과 유사함.
const map7 = new Map([[lee, 'king'], [kim, 'queen']]);
map7.forEach((v, k, map) => console.log(v, k, map));

/*
king {name: 'lee'} Map(2) {
  ...
}
queen {name: 'kim'} Map(2) {
  ...
}
*/

for (const entry of map7) {
  console.log(entry); // [{name: 'lee'}, 'king'] [{name: 'kim'}, 'queen']
}

console.log([...map7]);
// [{name: 'lee'}, 'king'] [{name: 'kim'}, 'queen']

const [a, b] = map;
console.log(a, b); // [{name: 'lee'}, 'king'] [{name: 'kim'}, 'queen']

// keys, values, entries
for (const key of map.keys()) {
  console.log(key); // {name: 'lee'} {name: 'kim'}
}
for (const value of map.values()) {
  console.log(key); // king queen
}
for (const entry of map.entries()) {
  console.log(entry); // [{name: 'lee'}, 'king'] [{name: 'kim'}, 'queen']
}
```
