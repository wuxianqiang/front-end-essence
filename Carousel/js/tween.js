(function () {
    var myCartoon = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };
    //实现多方向的运动动画，curEle要运动的元素,target目标位置，如{left：1000，right：1000}包含每个方向的目标位置,duration规定时间的运动动画，动画运动的总时间
    function move(curEle, target, duration,callBack) {
        //进来之前把其他动画结束了
        window.clearInterval(curEle.myWay);

        //begin起始值、总距离change
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);//动画运动只改变属性值，属性名是不变
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.myWay = window.setInterval(function () {
            time += 10;
            //到达时间，结束动画，为目标值
            if ( time >= duration){
                //批量设置
                utils.css(curEle,target);
                window.clearInterval(curEle.myWay);
                //typeof callBack === "function"?callBack():null;
                callBack && callBack.call(curEle);

                return;
            }
            for (var key in target){
                if (target.hasOwnProperty(key)){
                    var curPos = myCartoon.Linear(time,begin[key],change[key],duration);
                    utils.css(curEle,key,curPos)//设置样式
                }
            }
        },10)
    }
    window.kaTong = move;
}());