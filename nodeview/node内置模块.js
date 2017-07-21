//mode模块
//内置模块（http）
//自定义模块(自己定义的模块)
//地三方模块（别人写的插件）我们需要使用别人的模块需要使用npm命令进行管理（mpn install 模块名称）
//导入内置模块
var http = require("http");
var fs = require("fs");
var url = require("url"); //url模块里面有个url.parse()用来解析url地址的




//创建一个服务
var server = http.createServer(function (request, response) {
    //当客户端向服务器端的当前服务发送请求，且当前服务创建成功后执行
    //request(请求),存放所有的客户端的请求信息，包括URL问好传参的方式传递给服务器
    ///response(响应),提共向客户端返回内容和数据的方法

    //request.url 存放客户端请求的资源文件目录和传递个服务端的数据
    // console.log(request.url)
    //浏览器地址栏输入http://localhost/index.html?name=zhangsan&age=4
    //服务器得到/index.html?name=zhangsan&age=4

    var urlObj = url.parse(request.url, true),
        pathN = urlObj.pathname, //得到客户端请求的路径
        query = url.query; //得到客户端传递过来的数据

    if (pathname == "/1.html") {
        //readFileSync同步读起指定文件的内容
        var con = fs.readFileSync("./1.html", "utf-8")
        //response.write向客户端返回内容
        response.write(con);
        //response.end告诉服务器响应结束（必须）
        response.end();
    }
});
//为这个服务监听一个端口80
server.listen(80, function () {
    //监听成功函数执行
    console.log("The server has been created successfully!")
});

//怎样向服务器发送请求：localhost:80或者使用IP地址