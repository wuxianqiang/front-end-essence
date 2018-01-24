# 前端精髓

![logo](https://raw.githubusercontent.com/wuxianqiang/learning-course/master/logo.jpg)

对于那些希望学习JavaScript和已经开始使用JavaScript的程序员来说，如果想让自己对JavaScript语言和Web平台的理解和掌握再上一个台阶，可以通过阅读这篇文章，会让你的JavaScript编程基本更加夯实。

### 资料


* [Modern JavaScript Cheatsheet](https://github.com/mbeaudru/modern-js-cheatsheet)
* [ECMAScript6 New Features](http://es6-features.org/#Constants)
* [ES2015 Cheatsheet](https://devhints.io/es6?utm_source=qq&utm_medium=social)
* [Learn RegExp](https://github.com/zeeshanu/learn-regex/blob/master/README-cn.md)
* [JavaScript Regex Cheatsheet](https://www.debuggex.com/cheatsheet/regex/javascript)
* [Vue Cheatsheet](https://vuejs-tips.github.io/cheatsheet/)
* [Vuex Cheatsheet](https://vuejs-tips.github.io/vuex-cheatsheet/)
* [Flex Cheatsheet](https://yoksel.github.io/flex-cheatsheet/)
* [Every Programmer Should Know](https://github.com/mr-mig/every-programmer-should-know)
* [Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
* [Intro to CSS 3D Transforms](https://desandro.github.io/3dtransforms/)
* [HEAD](https://github.com/joshbuchea/HEAD/blob/master/README.md)
* [GitHub Cheat Sheet](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md)



## 目录

- [JavaScript基础](#javascript基础)
- [String类型](#string类型)
- [Array类型](#array类型)
- [Object类型](#object类型)
- [DOM文档对象模型](#dom文档对象模型)
- [BOM浏览器对象模型](#bom浏览器对象模型)
- [canvas绘图](#canvas绘图)

## JavaScript基础

### 基本概念

1. 引擎：负责整个JavaScript编译及执行的过程
2. 编译器：负责语法分析和代码生成
3. 作用域：负责收集并维护所有声明的标识符组成一系列的查询系统，确定当前执行的代码对标识符的访问权限（根据名称查找变量的一套规则）

### 变量提升

变量赋值会执行两个操作，首先编译器会在当前作用域中声明一个变量，然后运行时引擎会在作用域中查找该变量，如果能找到会对它赋值

1. 在全局作用域中用`var`来定义变量的时候，变量会提前声明。
2. 在全局作用域中用函数声明来定义函数的时候，函数会提前声明和定义。
3. 在块级作用域中用`var`和用函数声明来定义的时候都会提前声明但不会提前定义。（常见的块级作用域：`if`语句，`for-in`循环）
4. 在函数的`return`语句中下面代码中如果有`var`会提前声明，有`function`会提前声明和定义，但是`return`本身这条语句如果`var`和`funvtion`是不会的。
5. 回调函数不会提前声明和定义，自执行函数不会提前声明和定义。

### 重复声明

`var`关键定义变量的时候，如果变量名一样，变量会重新复值，也就相当于修改了之前的变量值。如果使用`let`和`const`重复声明同一个变量是会报错的。用函数声明来定义函数的时候，如果函数名是一样的，那么只会保留后面的函数，因为JavaScript中没有重载。
```js
let a = 10;
console.log(a);
let a = 12; //报错
console.log(a);
```

### 变量作用域

JavaScript变量是无类型的，变量可以被赋予任何类型的值，同样一个变量也可以重新赋予不同类型的值。使用var关键字来声明变量。JavaScript采用词法作用域。不在任何函数内声明的变量称做全局变量，它在JavaScript程序中的任何地方都是可见的。在函数内声明的变量具有函数作用域，并且只在函数内可见。

变量的作用域是程序源代码中定义这个变量的区域。

```js
var a = 10;
(function (){
    var a = 12;
})()
console.log(a) //10
```

### 函数作用域

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数范围内使用（嵌套的作用域也可以使用）
```js
function foo(a){
  var b = 2;
  function bar(){
  };
  var c = 3;d
}
```

### for-in循环

使用`for-in`循环遍历对象的时候，遍历出来的顺序是先遍历属性名是数字的，然后再按照对象的顺序依次遍历。但是，如果表示要遍历对象的属性值为 `null` 或 `undefined` ， `for-in` 语句会抛出错误。ECMAScript 5更正了这一行为；对这种情况不再抛出错误，而只是不执行循环体。为了保证最大限度的兼容性，建议在使用 `for-in` 循环之前，先检测确认该对象的值不是 `null` 或 `undefined` 。

### 检测数据类型

1. 使用`typeof`操作符检测数据类型的时候，有7种结果：undefined，string，number，boolean，symbol，object，function，对于基本数据类型可以准确判断，返回值一个字符串。
2. 对于检测数组可以直接使用`Array.isArray()`，返回值是一个布尔值。
3. 使用`instanceof`操作符可以检测某个类是否是指定类的实例，这个操作符是根据原型链来判断的，返回值是一个布尔值。
4. 使用对象原型中的`toString`方法，可以准确判断各种数据类型，返回值是一个字符串。
5. `Object.getPrototypeOf()` 返回的对象的原型。
6. `isPrototypeOf()` 用于检查传入的对象是否是另一个对象的原型，返回值是一个字符串。
7. 使用`typeof`检测一个不存在的变量并且不会报错叫做“暂时性死区”


### 数值转换

有3个函数可以把非数值转换为数值：`Number()`、`parseInt()` 和 `parseFloat()`。第一个函数，即转型函数 `Number()` 可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。`parseInt()` 提供第二个参数，转换时使用的基数（即多少进制）。多数情况下，我们要解析的都是十进制数值，因此始终将10作为第二个参数是非常必要的。`parseFloat()`不支持传入第二个参数。这三个方法的返回值有两种情况，`NaN`和普通数字。在使用`isNaN()`方法的时候，如果传入的参数不是数字，默认会调用`Number()`方法进行转换。

**转换规则**

|方法名称|空字符串|null|undefined|NaN|true|false|不传参|普通对象|
|-|-|-|-|-|-|-|-|-|
|Number()|0|0|NaN|NaN|1|0|0|NaN|
|parseInt()|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|
|parseFloat()|NaN|NaN|NaN|NaN|NaN|NaN|NaN|NaN|

**[⬆ back to top](#readme)**

## String类型

JavaScript的内置功能之一就是字符串连接。如果将加号(+)运算符用于数字，表示两数相加。但将它作用于字符串，则表示字符串连接，将第二个字符串拼接在第一个之后。

String类型的每个实例都有 `length` 属性，表示字符串中包含多少个字符，但是String类型的length是只读的，字符串也是一个类似数组的集合，可以使用索引来获取指定的字符，但是不能使用数组中的方法。字符串也可以使用`for-of`循环，也可以进行解构赋值操作，因为字符在ES6中部署了interactor接口，所以也可以使用`for-of` 循环遍历

### 字符查找方法

两个用于访问字符串中特定位置的方法是：`charAt()` 和 `charCodeAt()` 。这两个方法都接受一个参数，即基于0的字符位置。`charAt()`方法通过传入一个数字来获取指定位置的字符，传入负数和传入一个大于字符长度的数字会返回一个空字符串，不传入参数默认返回第一个字符。`charCodeAt()`是通过传入一个数字来获取指定位置的字符编码，传入负数和传入一个大于字符长度的数字会返回一个NaN，不传入参数默认返回第一个字符编码。ES6新增了一个方法，`codePointAt`方法和`charCodeAt()`类似，唯一优化的地方是可以处理码点大于0xFFFF的字符。

### 字符截取方法

第一个就是 `concat()` （该方法数组也有），用于将一或多个字符串拼接起来，返回拼接得到的新字符串。 `concat()` 方法参数可以是任意多个，参数类型也可以是任何数据类型，因为 `concat()` 方法就相当于字符串拼接一样。还提供了三个基于子字符串创建字符串的方法：`slice()` 、`substr()` 和 `substring()` 。这三个方法都是返回被操作字符串的一个子字符串，`slice()` 和 `substring()` 的第二个参数指定的是子字符串最后一个字符后面的位置。而 `substr()` 的第二个参数指定的则是返回的字符个数。在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中， `slice()` 方法会将传入的负值与字符串的长度相加，`substr()` 方法将负的一个参数加上字符串的长度，而将负的第二个参数转换为0，最后，`substring()` 方法会把所有的负值参数都转换为0。

### 字符位置方法

有两个可以从字符串中查找子字符串的方法：`indexOf()` 和 `lastIndexOf()` 。这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回 -1 ）。这两个方法的区别在于： `indexOf()` 方法从字符串的开头向后搜索子字符串，而 `lastIndexOf()` 方法是从字符串的末尾向前搜索子字符串。这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索。换句话说， `indexOf()` 会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而 `lastIndexOf()` 则会从指定的位置向前搜索，忽略该位置之后的所有字符。第二个参数为负数时没任何作用，这两个方法在数组中也存在，但是数组的这两个方法传入的第二个参数是支持负数的。

### 字符去除空格

ECMAScript5为所有字符串定义了  `trim()` 方法。这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。由于 trim() 返回的是字符串的副本，所以原始字符串中的前置及后缀空格会保持不变。支持这个方法的浏览器有IE9+、Firefox  3.5+、Safari  5+、Opera  10.5+和Chrome。此外，Firefox 3.5+、Safari 5+和Chrome 8+还支持非标准的 `trimLeft()` 和 `trimRight()` 方法，分别用于删除字符串开头和末尾的空格。

### 字符大小写转换

接下来我们要介绍的是一组与大小写转换有关的方法。ECMAScript中涉及字符串大小写转换的方法有4个：`toLowerCase()` 、 `toLocaleLowerCase()` 、 `toUpperCase()` 和 `toLocaleUpperCase()` 。其中， `toLowerCase()` 和 `toUpperCase()` 是两个经典的方法，借鉴自 `java.lang.String` 中的同名方法。而 `toLocaleLowerCase()` 和 `toLocaleUpperCase()` 方法则是针对特定地区的实现。对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 `Unicode` 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换。

### 字符模式匹配

String 类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是 `match()` ，在字符串上调用这个方法，本质上与调用 `RegExp` 的 `exec()` 方法相同。 `match()` 方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。

另一个用于查找模式的方法是 `search()` 。这个方法的唯一参数与 `match()` 方法的参数相同：由字符串或 RegExp 对象指定的一个正则表达式。 `search()` 方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回 -1 。而且， `search()` 方法始终是从字符串开头向后查找模式。

为了简化替换子字符串的操作，ECMAScript提供了 `replace()` 方法。这个方法接受两个参数：第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g ）标志

最后一个与模式匹配有关的方法是 `split()` ，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是一个 RegExp 对象（这个方法不会将字符串看成正则表达式）。 `split()` 方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过给定大小。

### 字符比较的方法

与操作字符串比较有关的一个方法是 `localeCompare()` ，这个方法比较两个字符串，并返回下列值中的一个：

* 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是 -1 ，具体的值要视实现而定）；
* 如果字符串等于字符串参数，则返回 0 ；
* 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1 ，具体的值同样要视实现而定）。

### 字符编码的方法

另外， String 构造函数本身还有一个静态方法： `fromCharCode()` 。这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 `charCodeAt()` 执行的是相反的操作。ES6 提供了`String.fromCodePoint`方法，可以识别大于0xFFFF的字符，弥补了`String.fromCharCode`方法的不足，使用时和`charCodeAt()`类似。

### 判断包含字符

这个方法是ES6新增的，使用的时候和字符串的 `indexOf` 方法类似，但唯一不同的是返回值，使用 `includes` 方法时如果原字符串中包含指定的字符返回 `true`，反之则返回 `false`，而 `indexOf` 在判断是否包含指定字符的时，返回的是字符索引，反之则返回 `-1`。同样使用这个方法的时候还支持传入第二个参数表示开始查找的索引位置，但是传入负数否无效，如果第一个参数传入的不是字符串，默认会调用 `toString()` 把传参转为字符串的形式，而且字符串中可以包含多个字符。

### 字符开头结尾判断

1. `startWidth()`这个方法是ES6新增的，判断字符串是不是以指定的字符开头，返回值是一个布尔类型的值， true/false。
2. `endsWidth()`这个方法是ES6新增的，判断字符串是不是以指定的字符结尾，返回值是一个布尔类型的值， true/false。

### 重复字符的方法

`repeat()`这个方法是ES6新增的，该方法接收一个数字作为参数来指定字符串的重复次数，并把字符串返回。

### padStart()/padEnd()

这两个方法是ES7新增的，这两个方法接收都接收两个参数，第一个参数指定字符串的长度，第二个参数表示当原字符串没有达到指定的字符长度时，将会用第二个传入的参数往开头或者结尾来补齐字符来达到指定长度。

### 其他

* 模板字符串，格式是`${}`大括号里面放变量名。。
* ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of` 循环遍历。


**[⬆ back to top](#readme)**

## Array类型

### 创建数组

使用数组直接量是创建数组最简单的方法，在方括号中将数组元素用逗号隔开即可。调用构造函数Array()是创建数组的另一种方法，调用时没有参数，该方法创建一个没有任何元素的空数组，调用时有一个数值参数，它指定长度，当预先知道所需元素个数时，这种形式的Array()构造函数可以用来预分配一个数组空间。注意，数组中没有存储值。还可以显式指定两个或多个数组元素或者数组的一个非数值元素，以这种形式，构造函数的参数将会成为新数组的元素。

### 元素的添加和删除

添加数组元素最简单的方法：为新索引赋值，也可以使用push()方法在数组末尾增加一个或多个元素，在数组尾部压入一个元素与给数组 `length` 赋值是一样的。可以使用 `unshift()` 方法在数组的首部插入一个元素，并且将其他元素依次移到更高的索引处。可以像删除对象属性一样使用 `delete` 运算符来删除数组元素,删除数组元素与为其赋undefined值是类似的（但有一些微妙的区别）。注意，对一个数组元素使用 `delete` 不会修改数组的 `length` 属性，也不会将元素从高索引处移下来填充已删除属性留下的空白。如果从数组中删除一个元素，它就变成稀疏数组。也可以简单地设置 `length` 属性为一个新的期望长度来删除数组尾部的元素。数组有pop()方法（它和push()一起使用），后者一次使减少长度1并返回被删除元素的值。还有一个 `shift()` 方法（它和 `unshift()` 一起使用），从数组头部删除一个元素。和 `delete` 不同的是 `shift()` 方法将所有元素下移到比当前索引低1的地方。最后，`splice()` 是一个通用的方法来插入、删除或替换数组元素。它会根据需要修改 `length` 属性并移动元素到更高或较低的索引处。

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

ECMAScript 5为数组定义了5个迭代方法和ES6新增了2个。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响访问的返回值。以下是这7个迭代方法的作用。

* `every()` ：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true 。
* `filter()` ：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
* `forEach()` ：对数组中的每一项运行给定函数。这个方法没有返回值。
* `map()` ：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
* `some()` ：对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true 。
* `find()`: 从数组中的第一项开始运行给定函数，只要函数返回false会继续执行，一旦函数返回true就停止执行，并返回数组当前项。
* `findIndex()`: 从数组中的第一项开始运行给定函数，只要函数返回false会继续执行，一旦函数返回true就停止执行，并返回数组当前项的索引。

### 归并方法

ECMAScript 5还新增了两个缩小数组的方法： `reduce()` 和 `reduceRight()` 。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。其中， `reduce()` 方法从数组的第一项开始，逐个遍历到最后。而 `reduceRight()` 则从数组的最后一项开始，向前遍历到第一项。

### 静态方法

`Array.from()` 这个方法是ES6新增的，这个方法是将类数组转换为数组，接收一个类数组或数组作为参数，并返回真实的数组，值得注意的是这是一个静态方法，并不在数组的原型对象上。`Array.of()` 这个方法是ES6新增的，就是把传入的数字转换为数组并返回，如果传入多个数字用逗号隔开。


### includes() 方法

这个方法是ES6新增的，这个方法和字符串中的includes()方法类似，但是唯一不同的是，数组中的includes方法中的第二个参数支持负数，而字符中的不可以。

### 其他

* ES6 提供三个新的方法——`entries()`，`keys()` 和 `values()`——用于遍历数组。它们都返回一个遍历器对象，可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。



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

我们知道，对象属性是由名字、值和一组特性（attribute）构成的。在ECMAScript5中，属性值可以用一个或两个方法替代，这两个方法就是 `getter` 和 `setter`。由 `getter` 和 `setter` 定义的属性称做“存取器属性”（accessor property），它不同于“数据属性”（data property），数据属性只有一个简单的值。

当程序查询存取器属性的值时，JavaScript调用getter方法（无参数）。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript调用 `setter` 方法，将赋值表达式右侧的值当做参数传入 `setter`。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 `setter` 方法的返回值。

数据属性的4个特性分别是它的值（value）、可写性（writable）、可枚举性（enumerable）和可配置性（configurable）。存取器属性不具有值（value）特性和可写性，它们的可写性是由setter方法存在与否决定的。因此存取器属性的4个特性是读取（get）、写入（set）、可枚举性和可配置性。

对象最常见的用法是创建（create）、设置（set）、查找（query）、删除（delete）、检测（test）和枚举（enumerate）它的属性。

ECMAScript 5定义了一个名为 `Object.create()` 的方法，它创建一个新对象，其中第一个参数是这个对象的原型。`Object.create()` 提供第二个可选参数，用以对对象的属性进行进一步描述。`Object.create()` 是一个静态函数，而不是提供给某个对象调用的方法。使用它的方法很简单，只须传入所需的原型对象即可。

对象的原型（prototype）属性是用来继承属性的，`__proto__` 的属性是用来查询和设置对象的原型。在JavaScript中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。

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

### 可扩展性

对象的可扩展性用以表示是否可以给对象添加新属性。

ECMAScript 5定义了用来查询和设置对象可扩展性的函数。通过将对象传入 `Object.isExtensible()`，来判断该对象是否是可扩展的。如果想将对象转换为不可扩展的，需要调用 `Object.preventExtensions()`，将待转换的对象作为参数传进去。注意，一旦将对象转换为不可扩展的，就无法再将其转换回可扩展的了。同样需要注意的是，`preventExtensions()` 只影响到对象本身的可扩展性。如果给一个不可扩展的对象的原型添加属性，这个不可扩展的对象同样会继承这些新属性。

可扩展属性的目的是将对象“锁定”，以避免外界的干扰。对象的可扩展性通常和属性的可配值性与可写性配合使用，ECMAScript 5定义的一些函数可以更方便地设置多种属性。`Object.seal()` 和 `Object.preventExtensions()` 类似，除了能够将对象设置为不可扩展的，还可以将对象的所有自有属性都设置为不可配置的。也就是说，不能给这个对象添加新属性，而且它已有的属性也不能删除或配置，不过它已有的可写属性依然可以设置。对于那些已经封闭（sealed）起来的对象是不能解封的。可以使用 `Object.isSealed()` 来检测对象是否封闭。

`Object.freeze()` 将更严格地锁定对象——“冻结”（frozen）。除了将对象设置为不可扩展的和将其属性设置为不可配置的之外，还可以将它自有的所有数据属性设置为只读（如果对象的存取器属性具有setter方法，存取器属性将不受影响，仍可以通过给属性赋值调用它们）。使用 `Object.isFrozen()` 来检测对象是否冻结。

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

### 归纳

|方法名称|是否可以给对象增加属性|是否可以删除现有属性|是否可以修改现有属性|检测方法|
|-|-|-|-|-|
|preventExtensible()|否|是:white_check_mark:|是:white_check_mark:|isExtensible()|
|seal()|否|否|是:white_check_mark:|isSeal()|
|freeze()|否|否|否|isFreeze()|

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

`querySelector()` 方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 `null` 。

`querySelectorAll()` 方法接收的参数与 `querySelector()` 方法一样，都是一个CSS选择符，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个 `NodeList` 的实例。

具体来说，返回的值实际上是带有所有属性和方法的 NodeList ，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用 NodeList 对象通常会引起的大多数性能问题。

Selectors API Level 2规范为 Element 类型新增了一个方法 `matchesSelector()` 。这个方法接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回 `true` ；否则，返回 `false` 。看例子。在取得某个元素引用的情况下，使用这个方法能够方便地检测它是否会被 `querySelector()` 或 `querySelectorAll()` 方法返回。

```
childElementCount ：返回子元素（不包括文本节点和注释）的个数。
firstElementChild ：指向第一个子元素； firstChild 的元素版。
lastElementChild ：指向最后一个子元素； lastChild 的元素版。
previousElementSibling ：指向前一个同辈元素； previousSibling 的元素版。
nextElementSibling ：指向后一个同辈元素； nextSibling 的元素版。
```

### Document类型
JavaScript通过 Document 类型表示文档。在浏览器中， `document` 对象是 `HTMLDocument` （继承自 Document 类型）的一个实例，表示整个HTML页面。而且， `document` 对象是 `window` 对象的一个属性，因此可以将其作为全局对象来访问。

Document类型代表一个HTML或XML文档，Element类型代表该文档中的一个元素。HTMLDocument和HTMLElement子类只是针对于HTML文档和元素。

```js
document的原型链
HTMLDocument->Document->Node->EventTarget->Object
```

文档的子节点，第一个就是 `documentElement` 属性，该属性始终指向HTML页面中的`<html>`。作为 `HTMLDocument` 的实例，`document` 对象还有一个 `body` 属性，直接指向`<body>`元素。所以浏览器都支持 `document.documentElement` 和 `document.body` 属性。

作为 `HTMLDocument` 的一个实例， `document` 对象还有一些标准的 Document 对象所没有的属性。这些属性提供了 `document` 对象所表现的网页的一些信息。其中第一个属性就是 `title` ，包含着 `<title>` 元素中的文本——显示在浏览器窗口的标题栏或标签页上。通过这个属性可以取得当前页面的标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。修改 `title` 属性的值不会改变 `<title>` 元素。

接下来要介绍的3个属性都与对网页的请求有关，它们是 `URL` 、 `domain` 和 `referrer` 。 `URL` 属性中包含页面完整的 `URL`（即地址栏中显示的URL）， domain 属性中只包含页面的域名，而 `referrer` 属性中则保存着链接到当前页面的那个页面的 `URL` 。在没有来源页面的情况下， `referrer` 属性中可能会包含空字符串。所有这些信息都存在于请求的HTTP头部，只不过是通过这些属性让我们能够在JavaScrip中访问它们而已。

取得元素的操作可以使用 `document` 对象的几个方法来完成。其中， Document 类型为此提供了两个方法： `getElementById()` 和 `getElementsByTagName()` 。 `getElementById()` 只返回文档中第一次出现的元素。IE7及较低版本还为此方法添加了一个有意思的“怪癖”： `name` 特性与给定ID匹配的表单元素（ `<input>` 、 `<textarea>` 、 `<button>` 及 `<select>` ）也会被该方法返回。如果有哪个表单元素的 `name` 特性等于指定的ID，而且该元素在文档中位于带有给定ID的元素前面，那么IE就会返回那个表单元素。另一个常用于取得元素引用的方法是 `getElementsByTagName()` 。这个方法接受一个参数，即要取得元素的标签名，而返回的是包含零或多个元素的 `NodeList` 。

第三个方法，也是只有 `HTMLDocument` 类型才有的方法，是 `getElementsByName()` 。顾名思义，这个方法会返回带有给定 `name` 特性的所有元素。最常使用 `getElementsByName()` 方法的情况是取得单选按钮；为了确保发送给浏览器的值正确无误，所有单选按钮必须具有相同的 `name` 特性

### Element类型

 Element 类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。所有HTML元素都由 `HTMLElement` 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。 `HTMLElement` 类型直接继承自 `Element` 并添加了一些属性。
 
表示HTML文档元素的 `HTMLElement` 对象定义了读/写属性，它们映射了元素的 `HTML` 属性。`HTMLElement` 定义了通用的 `HTML` 属性（如id、标题lang和dir）的属性，以及事件处理程序属性（如onclick）。特定的 `Element` 子类型为其元素定义了特定的属性。例如，查询一张图片的URL，可以使用表示`＜img＞`元素的 `HTMLElement` 对象的 `src` 属性。

HTMLElement和其子类型定义了一些属性，它们对应于元素的标准HTML属性。Element类型还定义了 `getAttribute()` 和 `setAttribute()` 方法来查询和设置非标准的HTML属性，也可用来查询和设置XML文档中元素上的属性。
 
 ```js
a元素的原型链
HTMLAnchorElement->HTMLElement->Element->Node->EventTarget->Object
body元素的原型链
HTMLBodyElement->HTMLElement->Element->Node->EventTarget->Object
 ```
 
HTML5还在Element对象上定义了 `dataset` 属性。该属性指代一个对象，它的各个属性对应于去掉前缀的 `data-` 属性。因此 `dataset.x` 应该保存 `data-x` 属性的值。带连字符的属性对应于驼峰命名法属性名：`data-jquery-test` 属性就变成 `dataset.jqueryTest` 属性。
 
使用 `document.createElement()` 方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在HTML文档中不区分大小写，而在XML（包括XHTML）文档中，则是区分大小写的。在新元素上设置这些特性只是给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用 `appendChild()` 、 `insertBefore()` 或 `replaceChild()` 方法。
 
 元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的 `childNodes` 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同。
 
 读取Element的 `innerHTML` 属性作为字符串标记返回那个元素的内容。HTML5还标准化了 `outerHTML` 属性。当查询 `outerHTML` 时，返回的HTML或XML标记的字符串包含被查询元素的开头和结尾标签。当设置元素的 `outerHTML` 时，元素本身被新的内容所替换。只有 `Element` 节点定义了 `outerHTML` 属性，Document节点则无。IE引入的另一个特性是 `insertAdjacentHTML()` 方法，它将在HTML5中标准化，它将任意的HTML标记字符串插入到指定的元素“相邻”的位置。标记是该方法的第二个参数，并且“相邻”的精确含义依赖于第一个参数的值。第一个参数为具有以下值之一的字符串："beforebegin"、"afterbegin"、"beforeend"和"afterend"。
 
 归纳
 
|方法名称|HTML文档能否使用|HTML元素能否使用|返回的内容是|是否存在DOM映射|
|-|-|-|-|-|
|getElementById()|能:white_check_mark:|否|Element对象|是:white_check_mark:|
|getElementByName()|能:white_check_mark:|否|NodeList对象|是:white_check_mark:|
|getElementByTagName()|能:white_check_mark:|能:white_check_mark:|NodeList对象|是:white_check_mark:|
|getElementByClassName()|能:white_check_mark:|能:white_check_mark:|NodeList对象|是:white_check_mark:|
|querySelectorAll()|能:white_check_mark:|能:white_check_mark:|NodeList对象|否|
|querySelector()|能:white_check_mark:|能:white_check_mark:|NodeList对象|否|
 
### window对象
 
 Window对象的 `pageXOffset` 和 `pageYOffset` 属性在所有的浏览器中提供这些值，除了IE 8及更早的版本以外。IE（和所有现代浏览器）也可以通过 `scrollLeft` 和 `scrollTop` 属性来获得滚动条的位置。令人迷惑的是，正常情况下通过查询文档的根节点（`document.documentElement`）来获取这些属性值，但在怪异模式下，必须在文档的`＜body＞`元素（`document.body`）上查询它们。
 
 判定一个元素的尺寸和位置最简单的方法是调用它的 `getBoundingClientRect()` 方法。该方法是在IE 5中引入的，而现在当前的所有浏览器都实现了。它不需要参数，返回一个有left、right、top和bottom属性的对象。left和top属性表示元素的左上角的X和Y坐标，right和bottom属性表示元素的右下角的X和Y坐标。在很多浏览器（和W3C标准）中，getBoundingClientRect()返回的对象还包含width和height属性，但是在原始的IE中未实现。它们只是调用方法时文档视觉状态的静态快
照，在用户滚动或改变浏览器窗口大小时不会更新它们。

Window对象的 `scrollTop()` 方法（和其同义词 `scroll()`）接受一个点的X和Y坐标（文档坐标），并作为滚动条的偏移量设置它们。Window的 `scrollBy()` 方法和 `scroll()` 和 `scrollTo()` 类似，但是它的参数是相对的，并在当前滚动条的偏移量上增加。
 
**[⬆ back to top](#readme)**
  
 ## BOM浏览器对象模型
 
 Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL。Location对象的href属性是一个字符串，后者包含URL的完整文本。
 
 Location对象的 `hash` 和 `search` 属性比较有趣。如果有的话，`hash` 属性返回 URL 中的“片段标识符”部分。`search` 属性也类似，它返回的是问号之后的URL，这部分通常是某种类型的查询字符串。
 
 Location对象的 `assign()` 方法可以使窗口载入并显示你指定的URL中的文档。`replace()` 方法也类似，但它在载入新文档之前会从浏览历史中把当前文档删除。
 
 除了 `assgin()` 和 `replace()` 方法，Location对象还定义了 `reload()` 方法，后者可以让浏览器重新载入当前文档。
 
 Window对象的 `history` 属性引用的是该窗口的 `History` 对象。`History` 对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示。`History` 对象的`length` 属性表示浏览历史列表中的元素数量，但出于安全的因素，脚本不能访问已保存的 `URL`。（如果允许，则任意脚本都可以窥探你的浏览历史。）
 
 History对象的 `back()` 和 `forward()` 方法与浏览器的“后退”和“前进”按钮一样：它们使浏览器在浏览历史中前后跳转一格。第三个方法——go()接受一个整数参数，可以在历史列表中向前（正参数）或向后（负参数）跳过任意多个页。
 
**[⬆ back to top](#readme)**
  
## RegExp对象
  
正则表达式是通过RegExp对象来表示的。除了 `RegExp()` 构造函数之外，RegExp对象还支持三个方法和一些属性。`RegExp()` 构造函数带有两个字符串参数，其中第二个参数是可选的，`RegExp()` 用以创建新的RegExp对象。第一个参数包含正则表达式的主体部分，也就是正则表达式直接量中两条斜线之间的文本。需要注意的是，不论是字符串直接量还是正则表达式，都使用“`\`”字符作为转义字符的前缀，因此当给 `RegExp()` 传入一个字符串表述的正则表达式时，必须将“`\`”替换成“`\\`”。`RegExp()` 的第二个参数是可选的，如果提供第二个参数，它就指定正则表达式的修饰符。不过只能传入修饰符g、i、m或者它们的组合。

`RegExp()` 构造函数非常有用，特别是在需要动态创建正则表达式的时候，这种情况往往没办法通过写死在代码中的正则表达式直接量来实现。例如，如果待检索的字符串是由用户输入的，就必须使用 `RegExp()` 构造函数，在程序运行时创建正则表达式
 
每个RegExp对象都包含5个属性。属性source是一个只读的字符串，包含正则表达式的文本。属性global是一个只读的布尔值，用以说明这个正则表达式是否带有修饰符g。属性ignoreCase也是一个只读的布尔值，用以说明正则表达式是否带有修饰符i。属性multiline是一个只读的布尔值，用以说明正则表达式是否带有修饰符m。最后一个属性lastIndex，它是一个可读/写的整数。如果匹配模式带有g修饰符，这个属性存储在整个字符串中下一次检索的开始位置，这个属性会被 `exec()` 和 `test()` 方法用到。
 
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

## 总结
### 脚本化CSS
内联样式：脚本化CSS最直截了当的方法就是更改单独的文档元素的style属性。类似大多数HTML属性，style也是元素对象的属性，它可以在JavaScript中操作。但是style属性不同寻常：它的值不是字符串，而是一个CSSStyleDeclaration对象。该style对象的JavaScript属性代表了HTML代码中通过style指定的CSS属性。

查询计算出的样式：元素的style属性代表了元素的内联样式，它覆盖所有的样式表，它是设置CSS属性值来改变元素的视觉表现最好的地方。但是，它在查询元素实际应用的样式时用处不大。为此，你想要使用计算样式。元素的计算样式是一组属性值，它由浏览器通过把内联样式结合所有链接样式表中所有可应用的样式规则后导出（或计算）得到的：它就是一组在显示元素时实际使用的属性值。类似内联样式，计算样式也是用一个CSSStyleDeclaration对象来表示的，区别是，计算样式是只读的。虽然不能设置这些样式，但为元素计算出的CSSStyleDeclaration对象确切地决定了浏览器在渲染元素时使用的样式属性值。用浏览器窗口对象的getComputedStyle()方法来获得一个元素的计算样式。

CSS类：通过内联style属性脚本化CSS样式的一个可选方案是脚本化HTML的class属性值。改变元素的class就改变了应用于元素的一组样式表选择器，它能在同一时刻改变多个CSS属性。

## 最后

### 喜欢的小伙伴们请点一下右上脚star按钮:star:，就可以收藏这篇文章啦！，如果你有更好的前端知识需要和我一起分享，请点fork按钮，提交你的资料吧！如果想在第一时间获取我的更新，并且每次更新会有提醒，请点watch按钮。
