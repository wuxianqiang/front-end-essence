var fs = require("fs");
//直接返回内部模块的导出对象
var counter1 = require('./util/conter');
var counter2 = require('./util/conter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
//所有模块在执行过程中只初始化一次。
//可以看到，conter.js并没有因为被require了两次而初始化两次。