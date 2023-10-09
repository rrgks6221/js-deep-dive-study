# 35장 스프레드-문법

> for ... of 문으로 순회할 수 있는 이터러블에 한정하여 하나로 뭉쳐있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만드는 문법

- 스프레드 문법의 결과물은 값으로 사용할 수 없다.

```js
const arr = ...[1, 2, 3] // SyntaxError: Unexpected token ...
```

## 배열 리터럴 내부에서의 사용

### 배열 결합(concat)

```js
const arrUsedConcat = [1, 2].concat(3, 4);
const arrUsedSpread = [...[1, 2], ...[3, 4]];
```

### 배열내에 다른 배열의 값 추가(splice)

```js
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1); // [1, 2, 3, 4]
```

### 배열 복사(slice)

```js
const origin = [1, 2];

const copyUsedSlice = origin.slice();
const copyUsedSPread = [...origin];
// 두 방법 다 얕은 복사 하여 새로운 복사본 생성
```
