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

### JavaScript

----------------------------------------------------------------------------------

#### 预解释

> 在JavaScript中带 `var` 关键字或 `function` 关键字的又要进行预解释。

    1. 预解释的时候不管你条件是否成立，带 `var` 的都要提前声明。
    2. 预解释的时候只预解释等号左边的，右边的值不参与预解释。
    3. 自执行函数在全局作用域下是不进行预解释的。
    4. 预解释的时候，如果名字已经生命过了，就不会重新声明，但会重新赋值。
    5. 函数体中 `return` 下面的代码虽然不执行，但要进行预解释， `return` 后面的都是跟着我们的返回值，所以不进行预解释。

#### 预解释

1. `for-in` 循环再遍历的时候，默认的话可以把自己私有的和它所属类的原型上拓展的属性和方法都可以遍历到，但是一般情况下只要遍历私有的属性，解决方法：

```js
for (var key in object) {
    if (object.hasOwnProperty(key)) {
        
    }
}
```
2. ECMAScript5 中新增 `Object。create()` 创建一个拥有指定原型和若干指定属性的对象。

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

> 支持作者请点击右上角的Star按钮
