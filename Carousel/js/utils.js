utils = (function () {
    var flag = "getComputedStyle" in window;//true表示标准浏览器，false表示IE6、7、8

    function getCss(attr) {
        var val = null, reg = null;
        //IE6~8下，如果拿的是opacity的话，我们要让他拿filter
        //val = window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr];
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr == 'opacity') {
                val = this.currentStyle.filter;
                //匹配  filter:alpha(opacity=23.90);
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        //200px  "-0.5"  "-50px"   "5em"  "80deg"
        //这里不可以支持符合属性的样式
        reg = /^-?\d+(?:\.\d+)?(?:px|pt|rem|em|deg)?$/;//正则验证
        if (reg.test(val)) {
            val = parseFloat(val);
        }
        return val;
    }//获取元素的样式信息

    function jsonParse(jsonStr) {
        return flag ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');//在IE7-以下使用的是eval的方法
    }//JSON格式的对象转换为JSON格式的字符串

    function listToAry(ary) {
        if (flag) {
            return Array.prototype.slice.call(ary, 0);
        } else {
            //IE8以下
            var newAry = [];
            for (var i = 0; i < ary.length; i++) {
                newAry[newAry.length] = ary[i];
            }
            return newAry;
        }
    }//实现类数组转换为数组

    function win(attr, val) {
        if (typeof val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }//操作浏览器的样式信息

    function offset(element) {
        var parent = element.offsetParent;
        var l = null;
        var t = null;//这个变量必须要有，但是暂时不知道是什么值的情况下
        l += element.offsetLeft;
        t += element.offsetTop;
        while (parent) {
            if (!(/MSIE 8/.test(window.navigator.userAgent))) {//判断是否是ie8的情况下，因为ie8计算offsetLeft的时候包括了边框
                l += parent.clientWidth;
                t += parent.clientHeight;
            }
            l += parent.offsetWidth;
            t += parent.offsetTop;
            parent = parent.offsetParent;//循环的条件
        }
        return {
            left: l,
            top: t
        };
    } //获取盒子模型偏移量

    function Children(curEle, filEle) {
        if (!flag) {
            var allNode = curEle.childNodes;
            var ary = [];
            for (var i = 0, len = allNode.length; i < len; i++) {
                var curNode = allNode[i];
                if (curNode.nodeType === 1) {
                    ary[ary.length] = curNode;
                }
            }
            allNode = null;
        } else {
            ary = Array.prototype.slice.call(curEle.children);
        }
        if (typeof filEle === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLocaleLowerCase() !== filEle.toLocaleLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }//获取指定容器里的元素子节点

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }//获取当前元素的上一个哥哥节点

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {//判断表示nex存在并且节点类型不等于1表示没找到想要的，还要继续找
            nex = nex.previousSibling;
        }
        return nex;
    }//获取当前元素的下一个弟弟节点

    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }//获取所有的哥哥节点

    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }//获取所有的弟弟节点

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary;
    }//获取上一个哥哥和下一个弟弟

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }//获取所有的兄弟

    function index(curEle) {
        return this.prevAll(curEle).length;
    }//获取索引

    function firstChild(curEle) {
        var chs = this.Children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }//获取第一个元素子节点

    function lastChild(curEle) {
        var chs = this.Children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }//获取最后一个元素子节点

    function append(newEle, container) {
        container.appendChild(newEle);
    }//添加到指定容器的末尾

    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }//添加到指定容器的开头在第一个子元素的前面

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle)
    }//表示新元素添加到指定元素的前面

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle)
    }//新元素添加到指定元素的前面后面，在oldEle弟弟的前面
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }//验证是否有那个样式类名

    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);//先去除首尾空格再按空格拆分为数组
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }//增加样式

    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ")
            }
        }
    }//删除样式

    function getElementByClass(className, context) {
        context = context || document;
        if (flag) {
            return this.listToAry(context.getElementsByClassName(className));
        }
        var classAry = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        var allTag = context.getElementsByTagName("*");
        var ary = [];
        for (var i = 0, len = allTag.length; i < len; i++) {
            var curTag = allTag[i];
            var isOk = true;
            for (var k = 0; k < classAry.length; k++) {
                var curName = classAry[k];
                var reg = new RegExp("(^| +)" + curName + "( +|$)");
                if (!reg.test(curTag.className)) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                ary[ary.length] = curTag;
            }
        }
        return ary;
    }//获取元素的样式类名

    function setCss(attr, value) {
        if (value === "float") { //处理浮动
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }

        if (value === "opacity") {//设置透明度
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity" + value * 100 + ")";
            return;
        }

        var reg = null;
        reg = /^(width|height|bottom|top|left|right|((margin|padding)(Bottom|Top|Left|Right)?))$/;//在这个范围中可以不加单位
        if (reg.test(attr)) {
            if (!isNaN(value)) {//验证格式是否为纯数字
                value += "px";  //加单位
            }
        }
        this["style"][attr] = value;
    }//设置样式

    function setGroupCss(options) {
        /*if (Object.prototype.toString.call(options) !== "[object Object]"){
         return;//保证options为对象数据的类型的值
         }*/
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }//批量设置，第二个传对象

    function css(curEle) {
        var ary = Array.prototype.slice.call(arguments, 1);
        var aryTwo = arguments[1];//获取第二个参数

        if (typeof aryTwo !== "undefined") {//第二个参数是存在
            if (Object.prototype.toString.call(aryTwo) == "[object Object]") {
                //this.setGroupCss(curEle,aryTwo,aryThree);
                setGroupCss.apply(curEle, ary);
                return;
            }
            var aryThree = arguments[2];
            if (!aryThree) {//表示第一个参数有，第二个参数有，第三个参数没有，表示获取
                //return this.getCss(curEle,aryTwo);
                return getCss.apply(curEle, ary);
            }
            //表示第一个参数有，第二个参数有，第三个参数有，表示设置
            //this.setCss.apply(this,arguments);
            setCss.apply(curEle, ary);
        }
        //aryTwo = aryTwo || 0;   //第二个参数是对象

    }

    return {
        jsonParse: jsonParse,
        listToAry: listToAry,
        Children: Children,
        win: win,
        offset: offset,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementByClass: getElementByClass,
        css: css,
        getCss: getCss,
        setGroupCss: setGroupCss
    }
})();