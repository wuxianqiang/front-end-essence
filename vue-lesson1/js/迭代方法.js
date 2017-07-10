//1.filter , 对数组的每一项运行给定函数，返回该函数返回true的项组成数组
// var ary = [1,2,3,4];
// var a = ary.filter(function(item){
//     return item > 2;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//[ 3, 4 ]

// var ary = [1,2,3,4];
// var a = ary.filter(function(item){
//     return 5;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//[ 1, 2, 3, 4 ]

//2.map , 对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组
// var ary = [1,2,3,4];
// var a = ary.map(function(item){
//     return item > 2;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//[ false, false, true, true ]
// var ary = [1,2,3,4];
// var a = ary.map(function(item){
//     return 5;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//[ 5, 5, 5, 5 ]返回函数每次调用的结果组成数组

//3.every , 对数组的每一项运行给定函数, 如果该函数的每一项返回true，则返回true
// var ary = [1,2,3,4];
// var a = ary.every(function(item){
//     return 5;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//true
// var ary = [1,2,3,4];
// var a = ary.every(function(item){
//     return item > 2;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//false如果该函数的每一项返回true，则返回true

//4.forEach, 对数组的每一项运行给定函数, 这个方法没有返回值
// var ary = [1,2,3,4];
// var a = ary.forEach(function(item){
//     return 5;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//undefined没用返回值

//5.some， 对数组的每一项运行给定函数， 如果函数对任意一项返回true，则返回true
// var ary = [1,2,3,4];
// var a = ary.some(function(item){
//     return 5;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//true

// var ary = [1,2,3,4];
// var a = ary.some(function(item){
//     return item > 2;
// })
// console.log(ary);//[ 1, 2, 3, 4 ]
// console.log(a);//true 如果函数对任意一项返回true，则返回true