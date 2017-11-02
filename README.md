# Web前端精髓

![前端](https://raw.githubusercontent.com/wuxianqiang/learning-course/master/logo3.jpg)

Web前端技术由html、css和javascript三大部分构成，是一个庞大而复杂的技术体系，其复杂程度不低于任何一门后端语言。而我们在学习它的时候往往是先从某一个点切入，然后不断地接触和学习新的知识点，因此对于初学者很难理清楚整个体系的脉络结构。所以，这篇文章对前端知识进行了归纳，仅供参考。

## 目录
- [JavaScript基础](#javascript基础)
- [String类型](#string类型)
- [Array类型](#array类型)
- [Object类型](#object类型)
- [DOM文档对象模型](#dom文档对象模型)
- [canvas绘图](#canvas绘图)
- [前端案例](https://github.com/wuxianqiang/project)

### 资料

* [下载JavaScript知识结构图](https://github.com/wuxianqiang/learning-course/releases)
* [现代的JavaScript语法清单](https://github.com/mbeaudru/modern-js-cheatsheet)
* [ES6新特性](http://es6-features.org/#Constants)
* [学习正则](https://github.com/zeeshanu/learn-regex/blob/master/README-cn.md)
* [Vue语法清单](https://vuejs-tips.github.io/cheatsheet/)
* [3D动画](https://desandro.github.io/3dtransforms/)
* [head文档](https://github.com/joshbuchea/HEAD/blob/master/README.md)
* [前端面试问题](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
* [GitHub秘籍](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md)
* [每个程序员应该知道...](https://github.com/mr-mig/every-programmer-should-know)
* [构建单页Web应用](https://github.com/xufei/blog/issues/5)

## JavaScript基础

### 预解释

所有的语言都是面向对象开发的: 包括类的继承，封装，多态。继承：子类继承父类的属性和方法，多态：包括重载和重写。
* 在JavaScript中带 `var` 关键字或 `function` 关键字的又要进行预解释。
* 预解释的时候不管你条件是否成立，带 var 的都要提前声明。
* 预解释的时候只预解释等号左边的，右边的值不参与预解释。
* 自执行函数在全局作用域下是不进行预解释的。
* 预解释的时候，如果名字已经生命过了，就不会重新声明，但会重新赋值。
* 函数体中 `return` 下面的代码虽然不执行，但要进行预解释， `return` 后面的都是跟着我们的返回值，所以不进行预解释。

### 关于内存释放和作用域销毁

1. 当函数执行返回一个引用数据类型的值，并且在函数的外面被其他东西接收了，这种情况一般不销毁。

```js
function fn(){
    return function (){  }
}
var f = fn();
```

2. 在一个私有作于域中给DOM元素的事件绑定方法，一般情况不销毁。

```js
~function (){
    div.onclick = function (){  }
}
```

3. 函数执行一次然后把返回值值执行一次，当返回值执行完成后才把它销毁。

```js
function fn(){
    return function (){  }
}
fn()()
```
### for-in循环

`for-in` 循环再遍历的时候，默认的话可以把自己私有的和它所属类的原型上拓展的属性和方法都可以遍历到，但是一般情况下只要遍历私有的属性，解决方法：

```js
for (var key in object) {
    if (object.hasOwnProperty(key)) {
        
    }
}
```

### 继承 (重点)

* 原型继承

```js
function A(){
    this.x = 100;
}
A.prototype.getX = function (){
    console.log(this.x);
}
function B(){
    this.y = 200;
}
B.prototype = new A;
B.prototype.constructor = B;
```

* call继承

```js
function A(){
    this.x = 100;
}
function B(){
    A.call(this);
}
```

* 冒充对象继承

```js
function A() {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x);
};
function B() {
    var temp = new A;
    for (var key in temp) {
        this[key] = temp[key]; 
    }
    temp = null;
}
```

* 寄生组合式继承

```js
function A() {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this);
};
function B() {
    A.call(this);
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
```
### 其他

使用 `instanceof` 检测某个类是否属于这个类的实例，只有在原型链上就会返回 `true`
* 函数的多面性，包括普通函数，类，对象。普通函数，它本身就是一个普通函数，执行的时候会形成自己的作用域。类，它有自己的实例，也有一个叫做prototype的属性是自己的原型，它的实例都指向自己的原型。普通对象，它作为对象可以有一些自己的属性和方法。

```js
function Fn(){
    var num = 1;
    this.x = 10;
}
Fn.prototype.getX = function (){
    console.log(this.x);
}
Fn();
var f = new Fn;
Fn.y = 100;
```
* 所有的函数都有prototype原型对象，每个对象都自带一个__proto__的属性(面向对象)

### 数值转换

有3个函数可以把非数值转换为数值：`Number()`、`parseInt()` 和 `parseFloat()`。第一个函数，即转型函数 `Number()` 可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。`parseInt()` 提供第二个参数，转换时使用的基数（即多少进制）。多数情况下，我们要解析的都是十进制数值，因此始终将10作为第二个参数是非常必要的

**[⬆ back to top](#readme)**

## String类型

String对象的方法也可以在所有基本的字符串值中访问到，其中，继承的 `valueOf()`、 `toLocaleString()` 和 `toString()` 方法，都是返回对象所表示的基本字符串值。String类型的每个实例都有 `length` 属性，表示字符串中包含多少个字符。

### 字符方法

两个用于访问字符串中特定位置的方法是：`charAt()` 和 `charCodeAt()` 。这两个方法都接受一个参数，即基于0的字符位置。ECMA5可以使用方括号加数字索引来访问字符串中特定字符。

### 字符串操作方法

第一个就是 `concat()` ，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。还提供了三个基于子字符串创建字符串的方法：`slice()` 、`substr()` 和 `substring()` 。这三个方法都是返回被操作字符串的一个子字符串，`slice()` 和 `substring()` 的第二个参数指定的是子字符串最后一个字符后面的位置。而 `substr()` 的第二个参数指定的则是返回的字符个数。在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中， `slice()` 方法会将传入的负值与字符串的长度相加，`substr()` 方法将负的一个参数叫上字符串的长度，而将负的第二个参数转换为0，最后，`substring()` 方法会把所有的负值参数都转换为0。

### 字符串位置方法

有两个可以从字符串中查找子字符串的方法：`indexOf()` 和 `lastIndexOf()` 。这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回 -1 ）。这两个方法的区别在于： `indexOf()` 方法从字符串的开头向后搜索子字符串，而 `lastIndexOf()` 方法是从字符串的末尾向前搜索子字符串。这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索。换句话说， `indexOf()` 会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而 `lastIndexOf()` 则会从指定的位置向前搜索，忽略该位置之后的所有字符。

### trim() 方法

ECMAScript5为所有字符串定义了  `trim()` 方法。这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。由于 trim() 返回的是字符串的副本，所以原始字符串中的前置及后缀空格会保持不变。支持这个方法的浏览器有IE9+、Firefox  3.5+、Safari  5+、Opera  10.5+和Chrome。此外，Firefox 3.5+、Safari 5+和Chrome 8+还支持非标准的 `trimLeft()` 和 `trimRight()` 方法，分别用于删除字符串开头和末尾的空格。

### 字符串大小写转换方法

接下来我们要介绍的是一组与大小写转换有关的方法。ECMAScript中涉及字符串大小写转换的方法有4个：`toLowerCase()` 、 `toLocaleLowerCase()` 、 `toUpperCase()` 和 `toLocaleUpperCase()` 。其中， `toLowerCase()` 和 `toUpperCase()` 是两个经典的方法，借鉴自 `java.lang.String` 中的同名方法。而 `toLocaleLowerCase()` 和 `toLocaleUpperCase()` 方法则是针对特定地区的实现。对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 `Unicode` 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换。

### 字符串的模式匹配方法

String 类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是 `match()` ，在字符串上调用这个方法，本质上与调用 `RegExp` 的 `exec()` 方法相同。 `match()` 方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。

另一个用于查找模式的方法是 `search()` 。这个方法的唯一参数与 `match()` 方法的参数相同：由字符串或 RegExp 对象指定的一个正则表达式。 `search()` 方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回 -1 。而且， `search()` 方法始终是从字符串开头向后查找模式。

为了简化替换子字符串的操作，ECMAScript提供了 `replace()` 方法。这个方法接受两个参数：第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g ）标志

最后一个与模式匹配有关的方法是 `split()` ，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是一个 RegExp 对象（这个方法不会将字符串看成正则表达式）。 `split()` 方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过给定大小。

###  localeCompare() 方法

与操作字符串有关的最后一个方法是 `localeCompare()` ，这个方法比较两个字符串，并返回下列值中的一个：

* 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是 -1 ，具体的值要视实现而定）；
* 如果字符串等于字符串参数，则返回 0 ；
* 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1 ，具体的值同样要视实现而定）。

###  fromCharCode() 方法

另外， String 构造函数本身还有一个静态方法： `fromCharCode()` 。这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 `charCodeAt()` 执行的是相反的操作。

### ES6方法

* ES6 提供了`codePointAt`方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
* ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of` 循环遍历。
* ES6 有一个提案，提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。
* ES6 提供字符串实例的 `normalize()` 方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
* 传统上，JavaScript只有 `indexOf` 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

```
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
```
* `repeat` 方法返回一个新字符串，表示将原字符串重复n次。
* ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()` 用于头部补全，`padEnd()` 用于尾部补全。

**[⬆ back to top](#readme)**

## Array类型

### 转换方法

数组继承的 `toLocaleString()` 、 `toString()` 和 `valueOf()` 方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用 join() 方法，则可以使用不同的分隔符来构建这个字符串。 `join()` 方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。

### 栈方法

`push()` 方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而 `pop()` 方法则从数组末尾移除最后一项，减少数组的 `length` 值，然后返回移除的项。

### 队列方法

由于 `push()` 是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。实现这一操作的数组方法就是 `shift()` ，它能够移除数组中的第一个项并返回该项，同时将数组长度减1。

ECMAScript还为数组提供了一个 `unshift()` 方法。顾名思义， `unshift()` 与 `shift()` 的用途相反：它能在数组前端添加任意个项并返回新数组的长度。

### 重排方法

`reverse()` 方法会对反转数组项的顺序。
在默认情况下， `sort()` 方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序， `sort()` 方法会调用每个数组项的`toString()` 转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， `sort()` 方法比较的也是字符串。

因此 `sort()` 方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。这两个方法都会改变原有数组，返回排序后的数组。

### 操作方法

`concat()` 方法可以基于当前数组中的所有项创建一个新数组。具体来说，这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 `concat()` 方法传递参数的情况下，它只是复制当前数组并返回副本。如果传递给 `concat()` 方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾。

下一个方法是 `slice()` ，它能够基于当前数组中的一或多个项创建一个新数组。 `slice()` 方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， `slice()` 方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。注意， `slice()` 方法不会影响原始数组。

如果 `slice()` 方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。例如，在一个包含5项的数组上调用 `slice(-2,-1)` 与调用 `slice(3,4)` 得到的结果相同。如果结束位置小于起始位置，则返回空数组。

下面我们来介绍 `splice()` 方法，这个方法恐怕要算是最强大的数组方法了，它有很多种用法。 `splice()` 的主要用途是向数组的中部插入项，但使用这种方法的方式则有如下3种。

* 删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。例如， `splice(0,2)` 会删除数组中的前两项。
* 插入：可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如， `splice(2,0,“red”,“green”)` 会从当前数组的位置2开始插入字符串 `“red”` 和 `“green”` 。
* 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如， `splice  (2,1,“red”,“green”)` 会删除当前数组位置2的项，然后再从位置2开始插入字符串 `“red”` 和 `“green”` 。

### 位置方法

ECMAScript 5为数组实例添加了两个位置方法： `indexOf()` 和 `lastIndexOf()` 。这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， `indexOf()` 方法从数组的开头（位置0）开始向后查找， `lastIndexOf()` 方法则从数组的末尾开始向前查找。

*使用 indexOf() 和 lastIndexOf() 方法查找特定项在数组中的位置非常简单，支持它们的浏览器包括IE9+、Firefox 2+、Safari 3+、Opera 9.5+和Chrome。*

### 迭代方法

ECMAScript 5为数组定义了5个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。传入这些
方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响访问的返回值。以下是这5个迭代方法的作用。

* `every()` ：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true 。
* `filter()` ：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
* `forEach()` ：对数组中的每一项运行给定函数。这个方法没有返回值。
* `map()` ：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
* `some()` ：对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true 。
*这些数组方法通过执行不同的操作，可以大大方便处理数组的任务。支持这些迭代方法的浏览器有IE9+、Firefox 2+、Safari 3+、Opera 9.5+和Chrome。

### 归并方法

ECMAScript 5还新增了两个缩小数组的方法： `reduce()` 和 `reduceRight()` 。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中， `reduce()` 方法从数组的第一项开始，逐个遍历到最后。而 `reduceRight()` 则从数组的最后一项开始，向前遍历到第一项。

### ES6方法

* 扩展运算符（spread）是三个点（...）。它好比 `rest` 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
* `Array.from` 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
* `Array.of` 方法用于将一组值，转换为数组。
* 数组实例的 `find` 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回 `undefined` 。
* 数组实例的 `findIndex` 方法的用法与 `find` 方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
* `fill` 方法使用给定值，填充一个数组。
* ES6 提供三个新的方法——`entries()`，`keys()` 和 `values()`——用于遍历数组。它们都返回一个遍历器对象，可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。
* `Array.prototype.includes` 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 `includes` 方法类似。ES2016 引入了该方法。
* 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

### 归纳

|数组方法|是否会修改原先数组|是否有返回值|返回的内容是|
|-|-|-|-|
|join()|否|是:white_check_mark:|生成后的字符串|
|reverse()|是:white_check_mark:|是:white_check_mark:|排序后的新数组|
|sort()|是:white_check_mark:|是:white_check_mark:|排序后的新数组|
|concat()|否|是:white_check_mark:|拼接后的新数组|
|slice()|否|是:white_check_mark:|截取后的新数组|
|splice()|是:white_check_mark:|是:white_check_mark:|删除项的新数组|
|push()|是:white_check_mark:|是:white_check_mark:|增加后数组长度|
|pop()|是:white_check_mark:|是:white_check_mark:|被删除的那一项|
|unshift()|是:white_check_mark:|是:white_check_mark:|增加后数组长度|
|shift()|是:white_check_mark:|是:white_check_mark:|被删除的那一项|
|every()|否|是:white_check_mark:|返回一个布尔值|
|some()|否|是:white_check_mark:|返回一个布尔值|
|filter()|否|是:white_check_mark:|返回一个数组|
|map()|否|是:white_check_mark:|返回一个数组|
|forEach()|否|否|undefined|

**[⬆ back to top](#readme)**

## Object类型

### 基础知识

对象最常见的用法是创建（create）、设置（set）、查找（query）、删除（delete）、检测（test）和枚举（enumerate）它的属性。
ECMAScript 5定义了一个名为 `Object.create()` 的方法，它创建一个新对象，其中第一个参数是这个对象的原型。`Object.create()` 提供第二个可选参数，用以对对象的属性进行进一步描述。`Object.create()` 是一个静态函数，而不是提供给某个对象调用的方法。使用它的方法很简单，只须传入所需的原型对象即可：

### 检测属性

JavaScript对象可以看做属性的集合，我们经常会检测集合中成员的所属关系——判断某个属性是否存在于某个对象中。可以通过 `in` 运算符、`hasOwnPreperty()` 和 `propertyIsEnumerable()` 方法来完成这个工作，甚至仅通过属性查询也可以做到这一点。

`in` 运算符的左侧是属性名（字符串），右侧是对象。如果对象的自有属性或继承属性中包含这个属性则返回 `true`

对象的 `hasOwnProperty()` 方法用来检测给定的名字是否是对象的自有属性。对于继承属性它将返回 `false`

`propertyIsEnumerable()` 是 `hasOwnProperty()` 的增强版，只有检测到是自有属性且这个属性的可枚举性（enumerable attribute）为true时它才返回true。

### 属性的特性

通过调用 `Object.getOwnPropertyDescriptor()` 可以获得某个对象特定属性的属性描述符。`Object.getOwnPropertyDescriptor()` 只能得到自有属性的描
述符。

要想设置属性的特性，或者想让新建属性具有某种特性，则需要调用 `Object.definePeoperty()`，传入要修改的对象、要创建或修改的属性的名称以及属性描述符对象

如果要同时修改或创建多个属性，则需要使用 `Object.defineProperties()`。第一个参数是要修改的对象，第二个参数是一个映射表，它包含要新建或修改的属性的名称，以及它们的属性描述符。

### 原型属性

在ECMAScript 5中，将对象作为参数传入 `Object.getPrototypeOf()` 可以查询它的原型。在ECMAScript 3中，则没有与之等价的函数，但经常使用表达式
`o.constructor.prototype` 来检测一个对象的原型。通过 `new` 表达式创建的对象，通常继承一个 `constructor` 属性，这个属性指代创建这个对象的构造函数。

### 实例方法

`Constructor` ：保存着用于创建当前对象的函数。

`hasOwnProperty(propertyName)` ：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名（ `propertyName` ）必须以字符串形式指定（例如： `o.hasOwnProperty(“name”)` ）。

`isPrototypeOf(object)` ：用于检查传入的对象是否是另一个对象的原型。

`propertyIsEnumerable(propertyName)` ：用于检查给定的属性是否能够使用 `for-in` 语句（本章后面将会讨论）来枚举。与 `hasOwnProperty()` 方法一样，作为参数的属性名必须以字符串形式指定。

`toLocaleString()` ：返回对象的字符串表示，该字符串与执行环境的地区对应。

`toString()` ：返回对象的字符串表示。

`valueOf()` ：返回对象的字符串、数值或布尔值表示。通常与 `toString()` 方法的返回值相同。

### 其他

* `delete`是一元操作符，它用来删除对象属性或者数组元素。

### ES6方法

* ES6 允许直接写入变量和函数，作为对象的属性和方法。
* ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is` 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
* `Object.assign` 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
* `__proto__` 属性（前后各两个下划线），用来读取或设置当前对象的 `prototype` 对象。目前，所有浏览器（包括 IE11）都部署了这个属性。
* `Object.setPrototypeOf` 方法的作用与 `__proto__` 相同，用来设置一个对象的 `prototype` 对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
* `Object.getPrototypeOf()` 该方法与 `Object.setPrototypeOf` 方法配套，用于读取一个对象的原型对象。
* `Object.values` 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
* `Object.entries` 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
* 扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

**[⬆ back to top](#readme)**

## DOM文档对象模型

### 节点类型

每个节点都有一个 `nodeType` 属性，用于表明节点的类型。要了解节点的具体信息，可以使用 `nodeName` 和 `nodeValue` 这两个属性。

### 节点关系

每个节点都有一个 `childNodes` 属性，其中保存着一个 `NodeList` 对象。 `NodeList` 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意，虽然可以通过方括号语法来访问 `NodeList` 的值，而且这个对象也有 `length` 属性，但它并不是 `Array` 的实例。 `NodeList` 对象的独特之处在于，它实际上是基于 DOM 结构动态执行查询的结果，因此 DOM 结构的变化能够自动反映在 `NodeList` 对象中。我们常说， `NodeList` 是有生命、有呼吸的对象，而不是在我们第一次访问它们的某个瞬间拍摄下来的一张快照。

每个节点都有一个 `parentNode` 属性，该属性指向文档树中的父节点。包含在 `childNodes` 列表中的所有节点都具有相同的父节点，因此它们的 `parentNode` 属性。

通过使用列表中每个节点的 `previousSibling` 和 `nextSibling` 属性，可以访问同一列表中的其他节点。列表中第一个节点的 `previousSibling` 属性值为 `null` ，而列表中最后一个节点的 `nextSibling` 属性的值同样也为 `null`。

父节点的 `firstChild` 和 `lastChild` 属性分别指向其 `childNodes` 列表中的第一个和最后一个节点。在只有一个子节点的情况下， `firstChild` 和`lastChild` 指向同一个节点。

另外， `hasChildNodes()` 也是一个非常有用的方法，这个方法在节点包含一或多个子节点的情况下返回 `true` ；应该说，这是比查询 `childNodes` 列表的 length 属性更简单的方法。

所有节点都有的最后一个属性是 `ownerDocument` ，该属性指向表示整个文档的文档节点。

### 节点操作

最常用的方法是 `appendChild()` ，用于向 `childNodes` 列表的末尾添加一个节点。添加节点后， `childNodes` 的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。更新完成后， `appendChild()` 返回新增的节点。如果传入到 appendChild() 中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。即使可以将DOM树看成是由一系列指针连接起来的，但任何DOM节点也不能同时出现在文档中的多个位置上。(DOM映射)

如果需要把节点放在 `childNodes` 列表中某个特定的位置上，而不是放在末尾，那么可以使用 `insertBefore()` 方法。这个方法接受两个参数：要插入的节点和作为参照的节点。插入节点后，被插入的节点会变成参照节点的前一个同胞节点（ `previousSibling` ），同时被方法返回。如果参照节点是 `null` ，则 `insertBefore()` 与 `appendChild()` 执行相同的操作。

前面介绍的 `appendChild()` 和 `insertBefore()` 方法都只插入节点，不会移除节点。而下面要介绍的 `replaceChild()` 方法接受的两个参数是：要插入的节点和要替换的节点。要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置。

如果只想移除而非替换节点，可以使用 `removeChild()` 方法。这个方法接受一个参数，即要移除的节点。被移除的节点将成为方法的返回值。

前面介绍的四个方法操作的都是某个节点的子节点，也就是说，要使用这几个方法必须先取得父节点（使用 `parentNode` 属性）。另外，并不是所有类型的节点都有子节点，如果在不支持子节点的节点上调用了这些方法，将会导致错误发生。

### 其他方法

有两个方法是所有类型的节点都有的。第一个就是 `cloneNode()` ，用于创建调用这个方法的节点的一个完全相同的副本。 `cloneNode()` 方法接受一个布尔值参数，表示是否执行深复制。在参数为 `true` 的情况下，执行深复制，也就是复制节点及其整个子节点树；在参数为 `false` 的情况下，执行浅复制，即只复制节点本身。复制后返回的节点副本属于文档所有，但并没有为它指定父节点。因此，这个节点副本就成为了一个“孤儿”，除非通过 `appendChild()` 、 `insertBefore()` 或 `replaceChild()` 将它添加到文档中。

我们要介绍的最后一个方法是 `normalize()` ，这个方法唯一的作用就是处理文档树中的文本节点。由于解析器的实现或 DOM 操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点的情况。当在某个节点上调用这个方法时，就会在该节点的后代节点中查找上述两种情况。如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点。

### DOM扩展

* `querySelector()` 方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 `null` 。**（不存在DOM映射）**
* `querySelectorAll()` 方法接收的参数与 `querySelector()` 方法一样，都是一个CSS选择符，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个 `NodeList` 的实例。**（不存在DOM映射）**
* 具体来说，返回的值实际上是带有所有属性和方法的 NodeList ，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用 NodeList 对象通常会引起的大多数性能问题。
* Selectors API Level 2规范为 Element 类型新增了一个方法 `matchesSelector()` 。这个方法接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回 `true` ；否则，返回 `false` 。看例子。在取得某个元素引用的情况下，使用这个方法能够方便地检测它是否会被 `querySelector()` 或 `querySelectorAll()` 方法返回。
* 元素遍历
```
childElementCount ：返回子元素（不包括文本节点和注释）的个数。
firstElementChild ：指向第一个子元素； firstChild 的元素版。
lastElementChild ：指向最后一个子元素； lastChild 的元素版。
previousElementSibling ：指向前一个同辈元素； previousSibling 的元素版。
nextElementSibling ：指向后一个同辈元素； nextSibling 的元素版。
```

### Document类型
JavaScript通过 Document 类型表示文档。在浏览器中， `document` 对象是 `HTMLDocument` （继承自 Document 类型）的一个实例，表示整个HTML页面。而且， `document` 对象是 `window` 对象的一个属性，因此可以将其作为全局对象来访问。
```js
document的原型链
HTMLDocument->Document->Node->EventTarget->Object
```
文档的子节点

* 文档的子节点，第一个就是 `documentElement` 属性，该属性始终指向HTML页面中的`<html>`。
* 作为 `HTMLDocument` 的实例，`document` 对象还有一个 `body` 属性，直接指向`<body>`元素。
* 所以浏览器都支持 `document.documentElement` 和 `document.body` 属性。

文档信息

* 作为 `HTMLDocument` 的一个实例， `document` 对象还有一些标准的 Document 对象所没有的属性。这些属性提供了 `document` 对象所表现的网页的一些信息。其中第一个属性就是 `title` ，包含着 `<title>` 元素中的文本——显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改 `title` 属性的值不会改变 `<title>` 元素。
* 接下来要介绍的3个属性都与对网页的请求有关，它们是 `URL` 、 `domain` 和 `referrer` 。 `URL` 属性中包含页面完整的 `URL`（即地址栏中显示的URL）， domain 属性中只包含页面的域名，而 `referrer` 属性中则保存着链接到当前页面的那个页面的 `URL` 。在没有来源页面的情况下， `referrer` 属性中可能会包含空字符串。所有这些信息都存在于请求的HTTP头部，只不过是通过这些属性让我们能够在JavaScrip中访问它们而已。

查找元素

* 取得元素的操作可以使用 `document` 对象的几个方法来完成。其中， Document 类型为此提供了两个方法： `getElementById()` 和 `getElementsByTagName()` 。 `getElementById()` 只返回文档中第一次出现的元素。IE7及较低版本还为此方法添加了一个有意思的“怪癖”： `name` 特性与给定ID匹配的表单元素（ `<input>` 、 `<textarea>` 、 `<button>` 及 `<select>` ）也会被该方法返回。如果有哪个表单元素的 `name` 特性等于指定的ID，而且该元素在文档中位于带有给定ID的元素前面，那么IE就会返回那个表单元素。另一个常用于取得元素引用的方法是 `getElementsByTagName()` 。这个方法接受一个参数，即要取得元素的标签名，而返回的是包含零或多个元素的 `NodeList` 。在HTML文档中，这个方法会返回一个 `HTMLCollection` 对象，作为一个“动态”集合，该对象与 `NodeList` 非常类似。
* 第三个方法，也是只有 `HTMLDocument` 类型才有的方法，是 `getElementsByName()` 。顾名思义，这个方法会返回带有给定 `name` 特性的所有元素。最常使用 `getElementsByName()` 方法的情况是取得单选按钮；为了确保发送给浏览器的值正确无误，所有单选按钮必须具有相同的 `name` 特性

### Element类型
 Element 类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。所有HTML元素都由 `HTMLElement` 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。 `HTMLElement` 类型直接继承自 `Element` 并添加了一些属性。
 ```js
a元素的原型链
HTMLAnchorElement->HTMLElement->Element->Node->EventTarget->Object
body元素的原型链
HTMLBodyElement->HTMLElement->Element->Node->EventTarget->Object
 ```
 HTML5还在Element对象上定义了 `dataset` 属性。该属性指代一个对象，它的各个属性对应于去掉前缀的 `data-` 属性。因此 `dataset.x` 应该保存 `data-x` 属性的值。带连字符的属性对应于驼峰命名法属性名：`data-jquery-test` 属性就变成 `dataset.jqueryTest` 属性。
 
HTML元素

* `id` ，元素在文档中的唯一标识符。
* `title` ，有关元素的附加说明信息，一般通过工具提示条显示出来。
* `lang` ，元素内容的语言代码，很少使用。
* `dir` ，语言的方向，值为 “ltr” （left-to-right，从左至右）或 “rtl” （right-to-left，从右至左），也很少使用。
* `className` ，与元素的 `class` 特性对应，即为元素指定的CSS类。没有将这个属性命名为 class ，是因为 class 是ECMAScript的保留字
* 每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。操作特性的DOM方法主要有三个，分别是 `getAttribute()` 、 `setAttribute()` 和 `removeAttribute()` 。这三个方法可以针对任何特性使用，包括那些以 HTMLElement类型属性的形式定义的特性。
 
 创建元素
 
 * 使用 `document.createElement()` 方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在HTML文档中不区分大小写，而在XML（包括XHTML）文档中，则是区分大小写的。在新元素上设置这些特性只是给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用 `appendChild()` 、 `insertBefore()` 或 `replaceChild()` 方法。
 
 元素的子节点
 
 * 元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的 `childNodes` 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同。
 
 **[⬆ back to top](#readme)**
 
 ## BOM浏览器对象模型
 
 Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL。Location对象的href属性是一个字符串，后者包含URL的完整文本。
 
 Location对象的 `hash` 和 `search` 属性比较有趣。如果有的话，`hash` 属性返回 URL 中的“片段标识符”部分。`search` 属性也类似，它返回的是问号之后的URL，这部分通常是某种类型的查询字符串。
 
 Location对象的 `assign()` 方法可以使窗口载入并显示你指定的URL中的文档。`replace()` 方法也类似，但它在载入新文档之前会从浏览历史中把当前文档删除。
 
 除了 `assgin()` 和 `replace()` 方法，Location对象还定义了 `reload()` 方法，后者可以让浏览器重新载入当前文档。
 
 Window对象的history属性引用的是该窗口的History对象。History对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示。History对象的length属性表示浏览历史列表中的元素数量，但出于安全的因素，脚本不能访问已保存的URL。（如果允许，则任意脚本都可以窥探你的浏览历史。）
 
 History对象的back()和forward()方法与浏览器的“后退”和“前进”按钮一样：它们使浏览器在浏览历史中前后跳转一格。第三个方法——go()接受一个整数参数，可以在历史列表中向前（正参数）或向后（负参数）跳过任意多个页。
 
  **[⬆ back to top](#readme)**
 
 ## canvas绘图
 使用2D绘图上下文提供的方法，可以绘制简单的2D图形，比如矩形、弧线和路径。2D上下文的坐标开始于 `<canvas>` 元素的左上角，原点坐标是 `(0,0)`。所有坐标值都基于这个原点计算，x值越大表示越靠右，y值越大表示越靠下。默认情况下， `width` 和 `height` 表示水平和垂直两个方向上可用的像素数目。

### 填充和描边

2D上下文的两种基本绘图操作是填充和描边。填充，就是用指定的样式（颜色、渐变或图像）填充图形；描边，就是只在图形的边缘画线。大多数2D上下文操作都会细分为填充和描边两个操作，而操作的结果取决于两个属性： `fillStyle` 和 `strokeStyle` 。

### 绘制矩形

矩形是唯一一种可以直接在2D上下文中绘制的形状。与矩形有关的方法包括 `fillRect()` 、 `strokeRect()` 和 `clearRect()` 。这三个方法都能接收4个参数：矩形的x坐标、矩形的y坐标、矩形宽度和矩形高度。这些参数的单位都是像素。

### 描边线条的宽度

描边线条的宽度由 `lineWidth` 属性控制，该属性的值可以是任意整数。另外，通过 `lineCap` 属性可以控制线条末端的形状是平头、圆头还是方头（ `“butt”` 、 `“round”` 或 `“square”` ），通过 `lineJoin`属性可以控制线条相交的方式是圆交、斜交还是斜接（ `“round”` 、 `“bevel”` 或 `“miter”` ）。

### 绘制路径

2D绘制上下文支持很多在画布上绘制路径的方法。通过路径可以创造出复杂的形状和线条。要绘制路径，首先必须调用 `beginPath()` 方法，表示要开始绘制新路径。然后，再通过调用下列方法来实际地绘制路径。

* `arc(x, y, radius, startAngle, endAngle, counterclockwise)` ：以 `(x,y)` 为圆心绘制一条弧线，弧线半径为 `radius` ，起始和结束角度（用弧度表示）分别为 `startAngle` 和 `endAngle` 。最后一个参数表示 `startAngle` 和 `endAngle` 是否按逆时针方向计算，值为 `false` 表示按顺时针方向计算。
* `arcTo(x1, y1, x2, y2, radius)` ：从上一点开始绘制一条弧线，到 `(x2,y2)` 为止，并且以给定的半径 `radius` 穿过 `(x1,y1)` 。
* `bezierCurveTo(c1x, c1y, c2x, c2y, x, y)` ：从上一点开始绘制一条曲线，到 (x,y) 为止，并且以 (c1x,c1y) 和 (c2x,c2y) 为控制点。
* `lineTo(x, y)` ：从上一点开始绘制一条直线，到 `(x,y)` 为止。
* `moveTo(x, y)` ：将绘图游标移动到 `(x,y)` ，不画线。
* `quadraticCurveTo(cx, cy, x, y)` ：从上一点开始绘制一条二次曲线，到 `(x,y)`为止，并且以 `(cx,cy)` 作为控制点。
* rect(x, y, width, height) ：从点 `(x,y)` 开始绘制一个矩形，宽度和高度分别由 `width` 和 `height` 指定。这个方法绘制的是矩形路径，而不是 `strokeRect()` 和 `fillRect()` 所绘制的独立的形状。
* 创建了路径后，接下来有几种可能的选择。如果想绘制一条连接到路径起点的线条，可以调用 `closePath()` 。如果路径已经完成，你想用 `fillStyle` 填充它，可以调用 `fill()` 方法。另外，还可以调用 `stroke()` 方法对路径描边，描边使用的是 `strokeStyle` 。最后还可以调用 `clip()` ，这个方法可以在路径上创建一个剪切区域。

**[⬆ back to top](#readme)**

## 最后

### 喜欢的小伙伴们请点一下右上脚star按钮:star:收藏请点Fork按钮。
