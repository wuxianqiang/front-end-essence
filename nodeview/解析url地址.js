var url = require("url");
var str = "http://localhost/index.html?name=zhangsan&age=4";
//console.log(url.parse(str));
/*
Url {
  protocol: 'http:',传输协议
  slashes: true,
  auth: null,
  host: 'localhost',域名+端口号（默认80）
  port: null,
  hostname: 'localhost',
  hash: null,哈希值
  search: '?name=zhangsan&age=4',问好+传递进来的数据
  query: 'name=zhangsan&age=4',传递进来的数据没有问好
  pathname: '/index.html',请求文件的路径级名称
  path: '/index.html?name=zhangsan&age=4',路径名称+传递进来的数据
  href: 'http://localhost/index.html?name=zhangsan&age=4' 原来URL地址
}
  */
  //传递第二个参数true默认false
  console.log(url.parse(str,true));
  /*
  Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost',
  port: null,
  hostname: 'localhost',
  hash: null,
  search: '?name=zhangsan&age=4',
  query: { name: 'zhangsan', age: '4' },传递进来的数据以键值对的方式呈现
  pathname: '/index.html',
  path: '/index.html?name=zhangsan&age=4',
  href: 'http://localhost/index.html?name=zhangsan&age=4' }
  */