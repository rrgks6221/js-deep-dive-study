# 39장 DOM

> DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API를 제공하는 자료구조다.

### 1. 노드

#### 1.1 HTML 요소의 노드 객체

- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.
- HTML 요소는 중첩 관계를 갖는다. 때문에 계층적 구조를 띄며 이런 모든 노드 객체들로 트리 자료구조를 구성한다.
- 노드 객체들로 구성된 트리 자료구조를 DOM이라고 하며 DOM 트리라고 부르기도 한다.

#### 1.2 노드 객체의 타입

- 노드 객체는 총 12개의 노드 타입이 있다.
- 중요한 노드 타입 4가지 - 문서 노드: DOM 트리의 최상위에 존재하는 루트 노드, HTML 문서당 document 객체는 유일하다. - 요소 노드 - 어트리뷰트 노드 - 텍스트 노드

#### 1.3 노드 객체의 상속 구조

- DOM을 구성하는 노드 객체는 표준 빌트인 객체가 아닌 호스트 객체지만 자바스크립트 객체이기 때문에 프로토타입에 의한 상속 구조를 갖는다.
- 모든 노드 객체는 Object, EventTarget, Node 인터페이스를 상속받는다.
- 문서 노드는 Document, HTMLDocument 인터페이스를 상속받는다.
- 어트리뷰트 노드는 Attr, 텍스트 노드는 CharacterData 인터페이스를 상속받는다.
- 요소 노드는 Element 인터페이스를 상속받고 추가적으로 HTMLElement와 태그별로 세분화된 인터페이스를 상속받는다.(ex. div - HTMLDivElement)

### 2.요소 노드 취득

DOM은 요소 노드 취득을 위한 다양한 메서드를 제공한다.

#### 2.1 id를 이용한 요소 노드 취득

- Document.prototype.getElementById 메서드는 인수로 전달한 id 값을 갖는 하나의 요소 노드를 탐색하여 반환한다.
- 없으면 null을 반환한다.

#### 2.4 CSS 선택자를 이용한 요소 노드 취득

- Document.prototype/Element.prototype.querySeletor 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.
- CSS 선택자를 만족시키는 요소가 여러 개인 경우 첫 번째 요소만 반환한다.
- 대신 querySelectorAll 메서드를 사용하면 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다. 이때 반환하는 NodeList 객체는 유사 배열 객체이면서 이터러블이다.
- 없으면 null을 반환한다.

### 3. 노드 탐색

#### 3.1 공백 텍스트 노드

- HTML 문서의 공백 문자는 공백 텍스트 노드를 생성한다.

#### 3.2 자식 노드 탐색

| 프로퍼티                            | 설명                                                                                                      |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Node.prototype.childNodes           | 자식 노드를 모두 탐색하여 NodeList에 담아 반환한다. 요소 노드와 텍스트 노드가 포함될 수 있다.             |
| Element.prototype.children          | 자식 노드 중에서 요소 노드만 모두 탐색하여 HTMLCollection에 담아 반환한다. 텍스트 노드는 포함되지 않는다. |
| Node.prototype.firstChild           | 첫 번째 자식 노드를 반환한다.                                                                             |
| Node.prototype.lastChild            | 마지막 자식 노드를 반환한다.                                                                              |
| Element.prototype.firstElementChild | 첫 번째 자식 노드를 반환한다. 요소 노드만 반환한다.                                                       |
| Element.prototype.lastElementChild  | 마지막 자식 노드를 반환한다. 요소 노드만 반환한다.                                                        |

#### 3.3 자식 노드 존재 확인

- 자식 노드가 존재하는지 확인하려면 Node.prototype.hasChildNodes 메서드를 사용한다.
- 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.

### 4. 노드 정보 취득

| 프로퍼티                | 설명                                                       |
| ----------------------- | ---------------------------------------------------------- |
| Node.prototype.nodeType | 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환한다. |
| Node.prototype.nodeName | 노드의 이름을 문자열로 반환한다.                           |

### 5. 요소 노드의 텍스트 조작

#### 5.1 nodeValue

- 텍스트 노드의 텍스트를 반환한다.
- 요소 노드나 문서 노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.
- 요소 노드의 텍스트를 변경하려면 요소 노드의 텍스트를 탐색하(firsrChild 등)여 사용한다.

#### 5.2 textContent

- 요소 노드의 텍스트를 모두 취득한다. 이때 HTML 마크업은 모두 무시된다.
- nodeValue에 비해 가독성이 좋다.
- 유사한 동작을 하는 innerText 프로퍼티가 있지만 CSS에 의해 비표시되는 텍스트는 취득할 수 없고 textContent에 비해 느리다는 이유로 잘 사용하지 않는다.

### 6. DOM 조작

DOM 조작에 의해 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하므로 주의해서 다루어야 한다.

#### 6.1 innerHTML

- 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.
- 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 반영된다. 문자열에 포함된 HTML 마크업이 자식노드로 DOM에 반영된다.
- 간단하고 직관적이지만 XSS 공격에 취약하고 새로운 요소를 삽입하는 경우 위치를 지정할 수 없다는 단점이 있다.

#### 6.2 insertAdjacentHTML 메서드

- 기존 요소는 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- Element.prototype.insertAdjacentHTML(position, DOMString)의 첫 번째 인수 position에 전달할 수 있는 문자열은 ‘beforebegin’, ‘afterbegin’, ‘beforeend’, ‘afterend’의 4가지다.

#### 6.3 노드 생성과 추가

- 요소 노드 생성
  - Document.prototype.createElement(tagName) 메서드는 요소 노드를 생성하여 반환한다.
- 텍스트 노드 생성
  - Document.prototype.createTextNode(text) 메서드는 텍스트 노드를 생성하여 반환한다.
- 텍스트 노드를 요소 노드의 자식 노드로 추가
  - Node.prototype.appendChild(childNode) 메서드는 인수로 전달한 노드를 호출한 노드의 마지막 자식 노드로 추가한다.
- 요소 노드를 DOM에 추가

#### 6.9 노드 삭제

- Node.prototype.removeChild(child) 메서드는 인수로 전달한 노드를 DOM에서 삭제한다. 인수로 전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드이어야 한다.

### 7. 어트리뷰트

#### 7.1 어트리뷰트 노드와 attributes 프로퍼티

- 글로벌 어트리뷰트와 이벤트 핸들러 어트리뷰트는 모든 HTML 요소에 사용할 수 있지만 특정 HTML 요소에만 한정적으로 사용 가능한 어트리뷰트도 있다.(input 요소의 value, checked 등)
- HTML 문서가 파싱될 때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결된다.
- 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장된다.

#### 7.2 HTML 어트리뷰트 조작

- Element.prototype.getAttribute(attributeName) 메서드를 사용하여 요소 노드의 HTML 어트리뷰트 값을 참조할 수 있다.
- Element.prototype.setAttribute(attributeName, attributeValue) 메서드를 사용하여 요소 노드의 HTML 어트리뷰트 값을 변경할 수 있다.
- Element.prototype.hasAttribute(attributeName) 메서드를 사용하여 특정 HTML 어트리뷰트가 존재하는지 확인할 수 있다.
- Element.prototype.removeAttribute(attributeName) 메서드를 사용하여 특정 HTML 어트리뷰트를 삭제할 수 있다.

### 8. 스타일

#### 8.1 인라인 스타일 조작

- HTMLElement.prototype.style 프로퍼티는 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경한다.
- style 프로퍼티를 참조하면 CSSStyleDeclaration 객체를 반환한다. 이 객체의 프로퍼티는 CSS 프로퍼티와 대응되며 카멜 케이스를 따른다.
- 케밥 케이스를 따르는 CSS 프로퍼티를 그대로 사용하려면 대괄호 표기법을 사용하여 접근한다.
- 단위 지정이 필요한 프로퍼티는 반드시 단위를 지정해야 한다.(px, % 등)

#### 8.2 클래스 조작

- className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환한다. className 프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경한다.
- classList 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환한다. 이 객체는 유사 배열 객체이면서 이터러블로 add, remove 등의 메서드를 제공한다.
