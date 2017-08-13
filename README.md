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

第一个就是 `concat()` ，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。还提供了三个基于子字符串创建字符串的方法：`slice()` 、`substr()` 和 `substring()` 。这三个方法都是返回被操作字符串的一个子字符串，`slice()` 和 `substring()` 的第二个参数指定的是子字符串最后一个字符后面的位置。而 `substr()` 的第二个参数指定的则是返回的字符个数。在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中， `slice()` 方法会将传入的负值与字符串的长度相加，`substr()` 方法将负的一个参数叫上字符串的长度，而将负的第二个参数转换为0.最后，`substring()` 方法会把所有的负值参数都转换为0.



> 支持作者请点击右上角的Star按钮
