(function () {
    var banner = document.getElementById("banner"),bannerInner = utils.firstChild(banner);

    var bannerTip = utils.Children(banner,"ul")[0];
    var oLis = bannerTip.getElementsByTagName("li");
    var imgList =bannerInner.getElementsByTagName("img");
    var mark = document.getElementById("mark");
    var bannerLeft = utils.Children(mark)[0];
    var bannerRight = utils.Children(mark)[1];

    var jsonDate = null;//储存我们请求过来的数据
    var count = null; //用来存储多少张图片的
    //1\读取数据
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?_=" + Math.random(),false);//?_= Math.random()表示清除缓存，false表示同步编程，上面代码错了下面就不在执行
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonDate = JSON.parse(xhr.responseText);
                console.log(jsonDate);
            }
        };
        xhr.send(null);
    }();
    
    //2\按照字符串的方式绑定数据
    ~function () {
        //绑定轮播图部分数据
        var str = '';
        if (jsonDate){
            for (var i = 0; i < jsonDate.length; i++){
                var curDate = jsonDate[i];
                str += '<div><img src=""trueImg="' + curDate["img"] + '"/></div>';
        }
        //在最后再添加一张图片来实现无缝滚动，次方法和跑马灯一样的；
            str += '<div><img src=""trueImg="' + jsonDate[0]["img"] + '"/></div>';
        }
    bannerInner.innerHTML = str;
        count = jsonDate.length + 1;
        utils.css(bannerInner,"width",count *790);//多放了一张宽度也要加上
//绑定焦点部分
        str = '';
        if (jsonDate){
            for (var i = 0; i < jsonDate.length; i++){
                var curDate = jsonDate[i];
                i === 0 ? str += "<li class='bg'></li>" : str += "<li></li>";
            }
        }
bannerTip.innerHTML = str;
    }();
    
    //3\图片的延迟加载
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++){
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = oImg.src;
                    curImg.style.display = "block";
                    kaTong(curImg,{opacity:1},500);
                    oImg = null;
                }
            }(i);

        }
    }
    window.setTimeout(lazyImg,500);
    
    //3\实现自动轮播
    var step = 0; //step记录的是步长。记录当前是第几张图片
    var interval = 2000; //播放速度
    var autoTime = window.setInterval(autoMove,interval);
    function autoMove() {
        if (step >= count-1){
            // 移动到最后一张的时候立马变成第一张
            step = 0;
            bannerInner.style.left = 0;//left变成0时继续滚动
            //utils.css(bannerInner,"left",0)

        }
        step ++ ;
        kaTong(bannerInner,{left:-step*790},500);
        changeTip();
    }

    //4\实现焦点对齐
    function changeTip() {
        var tempStep  = step >= oLis.length ? 0 : step;
        for (var i = 0; i < oLis.length;i++){
            var curLi = oLis[i];
            i === tempStep? utils.addClass(curLi,"bg"):utils.removeClass(curLi,"bg");
        }
    }

    //5\停止自动轮播
    banner.onmouseover = function () {
        window.clearInterval(autoTime);
        mark.style.display = mark.style.display = "block";
    };
    banner.onmouseout = function () {
        autoTime = window.setInterval(autoMove,interval);
        mark.style.display = mark.style.display = "none";
    };

    //6\单击焦点切换 效果
    ~function () {
        for (var i = 0,len = oLis.length; i < len; i++){
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip();
                kaTong(bannerInner,{left:-step*790},500);
            }
        }
    }();
//单击左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0){
            step = count - 1;
            utils.css(bannerInner,"left",-step * 790);
        }
        step --;
        kaTong(bannerInner,{left:-step*790},500);
        changeTip();
    }
}());
