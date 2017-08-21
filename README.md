# Web前端精髓

前端与移动开发 The front-end development [博客|Hexo](https://wuxianqiang.github.io/) [博客|CSDN](http://blog.csdn.net/wu_xianqiang) [博客|博客园](http://www.cnblogs.com/wuxianqiang/) [知乎|专栏](https://zhuanlan.zhihu.com/webqianduan)

## 目录

### 资料

1. [GitHub秘籍](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#markdown-%E6%96%87%E4%BB%B6%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE)
2. [七天学会NodeJS](http://nqdeng.github.io/7-days-nodejs/)
3. [构建单页Web应用](https://github.com/xufei/blog/issues/5)
4. [Webpack](https://webpack.github.io/)
5. [Vue](https://cn.vuejs.org/)
6. [Bootstrap](https://getbootstrap.com/)
7. [ES6](http://es6.ruanyifeng.com/)
8. [Less](http://lesscss.org/)
9. [IcoMoon](https://icomoon.io/)

### JavaScript

----------------------------------------------------------------------------------

#### 预解释

> 所有的语言都是面向对象开发的: 包括类的继承，封装，多态。继承：子类继承父类的属性和方法，多态：包括重载和重写。
> 在JavaScript中带 `var` 关键字或 `function` 关键字的又要进行预解释。

    1. 预解释的时候不管你条件是否成立，带 `var` 的都要提前声明。
    2. 预解释的时候只预解释等号左边的，右边的值不参与预解释。
    3. 自执行函数在全局作用域下是不进行预解释的。
    4. 预解释的时候，如果名字已经生命过了，就不会重新声明，但会重新赋值。
    5. 函数体中 `return` 下面的代码虽然不执行，但要进行预解释， `return` 后面的都是跟着我们的返回值，所以不进行预解释。
    
----------------------------------------------------------------------------------

#### 关于内存释放和作于域销毁

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

3. 函数执行一次然后把返回值值执行一次，当放回值执行完成后才把它销毁。

```js
function fn(){
    return function (){  }
}
fn()()
```

1. `for-in` 循环再遍历的时候，默认的话可以把自己私有的和它所属类的原型上拓展的属性和方法都可以遍历到，但是一般情况下只要遍历私有的属性，解决方法：

```js
for (var key in object) {
    if (object.hasOwnProperty(key)) {
        
    }
}
```
2. ECMAScript5 中新增 `Object.create()` 创建一个拥有指定原型和若干指定属性的对象。
3. 对未初始化的变量执行 `typeof` 操作符会返回 `undefined` 值，而对未声明的变量执行 `typeof` 操作符同样也会返回 `undefined` 值。
4. 位于 `null` 和 `undefined` 之间的相等 `==` 总是返回 `true` 

----------------------------------------------------------------------------------

3. 原型链继承 (重点)

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

4. call继承

```js
function A(){
    this.x = 100;
}
function B(){
    A.call(this);
}
```

5. 冒充对象继承

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

6. 寄生组合式继承

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

7. 使用 `instanceof` 检测某个类是否属于这个类的实例，只有在原型链上就会返回 **true**
8. 函数的多面性，包括普通函数，类，对象

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

--------------------------------------------------------------------

#### this问题

```js
function mycall(){
    //假设已经更改了this
    this();
}
Function.prototype.call = mycall;
fn1.call.call(fn2); //fn1.call只是找到了call
mycall.call(fn2);   //然后改变this再执行，this变成了fn2
fn1.call.call.call(fn2);    //fn1.call.call只是找到了call
```
------------------------------------------------------------------------

#### 数值转换，

有3个函数可以把非数值转换为数值：`Number()`、`parseInt()` 和 `parseFloat()`。第一个函数，即转型函数 `Number()` 可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。`parseInt()` 提供第二个参数，转换时使用的基数（即多少进制）。**多数情况下，我们要解析的都是十进制数值，因此始终将10作为第二个参数是非常必要的**

-----------------------------------------------------------------------------------

#### String

String对象的方法也可以在所有基本的字符串值中访问到，其中，继承的 `valueOf()`、 `toLocaleString()` 和 `toString()` 方法，都是返回对象所表示的基本字符串值。
String类型的每个实例都有 `length` 属性，表示字符串中包含多少个字符。

1. 字符串方法

两个用于访问字符串中特定位置的方法是：`charAt()` 和 `charCodeAt()` 。这两个方法都接受一个参数，即基于0的字符位置。ECMA5可以使用方括号加数字索引来访问字符串中特定字符（不兼容）。

2. 字符串操作方法

第一个就是 `concat()` ，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。还提供了三个基于子字符串创建字符串的方法：`slice()` 、`substr()` 和 `substring()` 。这三个方法都是返回被操作字符串的一个子字符串，`slice()` 和 `substring()` 的第二个参数指定的是子字符串最后一个字符后面的位置。而 `substr()` 的第二个参数指定的则是返回的字符个数。在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中， `slice()` 方法会将传入的负值与字符串的长度相加，`substr()` 方法将负的一个参数叫上字符串的长度，而将负的第二个参数转换为0，最后，`substring()` 方法会把所有的负值参数都转换为0。

3. 字符串位置方法

有两个可以从字符串中查找子字符串的方法：`indexOf()` 和 `lastIndexOf()` 。这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回 -1 ）。这两个方法的区别在于： `indexOf()` 方法从字符串的开头向后搜索子字符串，而 `lastIndexOf()` 方法是从字符串的末尾向前搜索子字符串。这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索。换句话说， `indexOf()` 会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而 `lastIndexOf()` 则会从指定的位置向前搜索，忽略该位置之后的所有字符。

4. trim() 方法

ECMAScript5为所有字符串定义了  `trim()` 方法。这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。

5. 字符串大小写转换方法

接下来我们要介绍的是一组与大小写转换有关的方法。ECMAScript中涉及字符串大小写转换的方法有4个：`toLowerCase()` 、 `toLocaleLowerCase()` 、 `toUpperCase()` 和 `toLocaleUpperCase()` 。其中， `toLowerCase()` 和 `toUpperCase()` 是两个经典的方法，借鉴自 `java.lang.String` 中的同名方法。而 `toLocaleLowerCase()` 和 `toLocaleUpperCase()` 方法则是针对特定地区的实现。对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 `Unicode` 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换。

6. 字符串的模式匹配方法

String 类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是 `match()` ，在字符串上调用这个方法，本质上与调用 `RegExp` 的 `exec()` 方法相同。 `match()` 方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。

另一个用于查找模式的方法是 `search()` 。这个方法的唯一参数与 `match()` 方法的参数相同：由字符串或 RegExp 对象指定的一个正则表达式。 `search()` 方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回 -1 。而且， `search()` 方法始终是从字符串开头向后查找模式。

为了简化替换子字符串的操作，ECMAScript提供了 `replace()` 方法。这个方法接受两个参数：第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g ）标志

7.  localeCompare() 方法

与操作字符串有关的最后一个方法是 `localeCompare()` ，这个方法比较两个字符串，并返回下列值中的一个：

* 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是 -1 ，具体的值要视实现而定）；
* 如果字符串等于字符串参数，则返回 0 ；
* 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1 ，具体的值同样要视实现而定）。

8.  fromCharCode() 方法

另外， String 构造函数本身还有一个静态方法： `fromCharCode()` 。这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 `charCodeAt()` 执行的是相反的操作。

9. 其他

* ES6 提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
* ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
* ES6 有一个提案，提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。
* ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
* 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

```
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
```
* repeat方法返回一个新字符串，表示将原字符串重复n次。
* ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
------------------------------------------------------------
#### Array

1. `push()` 方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而 `pop()` 方法则从数组末尾移除最后一项，减少数组的 `length` 值，然后返回移除的项。
2. 由于 `push()` 是向数组末端添加项的方法，因此要模拟队列只需一个从数组前端取得项的方法。实现这一操作的数组方法就是 `shift()` ，它能够移除数组中的第一个项并返回该项，同时将数组长度减1。
3. ECMAScript还为数组提供了一个 `unshift()` 方法。顾名思义， `unshift()` 与 `shift()` 的用途相反：它能在数组前端添加任意个项并返回新数组的长度。
4.  `reverse()` 方法会对反转数组项的顺序。
5. 在默认情况下， `sort()` 方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序， `sort()` 方法会调用每个数组项的 `toString()` 转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， `sort()` 方法比较的也是字符串。
6. 因此 sort() 方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。

> 支持作者请点击右上角的Star按钮
