var http = require("http"),
    fs = require("fs"),
    url = require("url");
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var parseN = urlObj.pathname;
    var query = urlObj.query;
    var reg = /\.(HTML|CSS|JS|JSON|TXT|ICO)/i;
    if (reg.test(parseN)) {
        var suffix = reg.exec(parseN)[1].toUpperCase();
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
            var con = fs.readFileSync("." + parseN, "utf-8");
            response.writeHead(200, {
                "content-type": suffixMIME + ";charset=utf-8;"
            });
            response.end(con);
        } catch (e) {
            response.writeHead(404, {
                "content-type": "text/plain;charset=utf-8;"
            })
            response.end("not find")
        }
    }
    //API接口文档处理
    //首先把所有的用户信息都得到
    var obj = null;
    var customID = null;
    var con = null;
    con = fs.readFileSync("./json/custom.json", "utf-8"); //得到JSON格式的字符串
    con.length === 0 ? con = "[]" : null; //防止文件里面内容为空时使用JSON,parse报错
    con = JSON.parse(con); //JSON格式的字符串转换为JSON的对象
    //下面是5个API接口，使用的是文件存储，但是一般使用数据库来存储数据的后两个接口都是POST
    //1、获取所有的客户信息/getList
    if (parseN === "/getList") {
        obj = {
            //没有数据情况下
            code: 1,
            msg: "没有任何客户信息",
            data: null
        };
        if (con.length > 0) {
            obj = {
                //有数据情况
                code: 0,
                msg: "成功",
                data: con
            }
        }
        response.writeHead(200, {
            "content-type": "application/json;charset=utf-8;"
        });
        response.end(JSON.stringify(obj));
        return;
    }

    if (parseN === "/addInfo") {
        //获取用户请求主体中传递进来的数据
        var str = "";
        //data表示正在接受客户端请求主体里面的内容，内容是一点接受，chunk表示每次接受的内容
        request.on("data", function (chunk) {
            str += chunk;
        });
        //end表示接受完毕了
        request.on("end", function () {
            //客户端什么内容都没写
            if (str.length === 0) {
                response.writeHead(200, {
                    "content-type": "application/json;charset=utf-8;"
                });
                response.end(JSON.stringify({
                    code: 1,
                    msg: "增加失败"
                }));
                return;
            }
            //为客户增加唯一的ID
            var data = JSON.parse(str);
            if (con.length === 0) {
                data["id"] = 0;

            } else {
                data["id"] = parseFloat(con[con.length - 1]["id"]) + 1;
            }
            con.push(data);
            fs.writeFileSync("./json/custom.json", JSON.stringify(con), "utf-8");
            response.end(JSON.stringify({
                code: 0,
                msg: "增加成功"
            }));
        });
        return;

    }

    //请求的地址不存在
    response.writeHead(404, {
        "content-type": "text/plain;charset=utf-8;"
    });
    response.end("请求的数据接口不存在");
})
server1.listen(80, function () {
    console.log("Service created!")
})