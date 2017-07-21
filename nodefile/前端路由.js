//导入模块
var http = require("http"),
    fs = require("fs"),
    url = require("url");
//创建一个服务
var server1 = http.createServer(function (request, response) {
    //解析url地址
    var urlObj = url.parse(request.url, true);
    var parseN = urlObj.pathname;
    var query = urlObj.query;
    //客户端请求的资源文件不存在，要做容错处理，防止报错，服务终止
    //处理静态资源文件请求
    //前端路由，根据客户端请求文件的东西不一样返回不同的东西
    var reg = /\.(HTML|CSS|JS|JSON|TXT|ICO)/i;
    if (reg.test(parseN)) {
        var suffix = reg.exec(parseN)[1].toUpperCase();
        //每一种资源文件都有一种MIME类型
        var suffixMIME = "text/plain";
        switch (suffix) {
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "JSON":
                suffixMIME = "application/json";
                break;
            case "ICO":
                suffixMIME = "application/octet-stream";
                break;
        }
        try {
            //读取到的文件目录和代码都是字符串类型的
            var con = fs.readFileSync("." + parseN, "utf-8");
            //重写响应头信息，告诉客户端浏览器我们返回内容是什么MIME类型
            response.writeHead(200, {
                "content-type": suffixMIME + ";charset=utf-8;"
            });
            response.end(con);
        } catch (e) {
            //重写响应头信息
            response.writeHead(404, {
                "content-type": "text/plain;charset=utf-8;"
            })
            response.end("not find")
        }
    }


    // try {
    //     var con = fs.readFileSync("." + parseN, "utf-8");
    //     response.end(con);
    // } catch (e) {
    //     response.end("not find")
    // }

    // if(parseN === "/index.html"){
    //     //读取文件返回文件就结束
    //     var con = fs.readFileSync("./index.html","utf-8");
    //     response.end(con);
    //     return;
    // }
    // if(parseN === "/css/index.css"){
    //     con = fs.readFileSync("./css/index.css","utf-8");
    //     response.end(con);
    //     return;
    // }
    // if(parseN === "/js/index.js"){
    //     con = fs.readFileSync("./js/index.js","utf-8");
    //     response.end(con);
    //     return;
    // }
})
//监听一个端口
server1.listen(80, function () {
    console.log("Service created!")
})