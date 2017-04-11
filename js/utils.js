/**
 * Created by yelin on 2017/4/10 20:44
 */
var utils = (function () {
    function toJson(data) {
        return "JSON" in window ? JSON.parse(data) : eval('(' + data + ')');
    }

    function getCss(curEle, attr) {
        var result = null;
        var reg = null;
        if ("getComputedStyle" in window) {
            result = window.getComputedStyle(curEle, null)[attr];
        } else {//ie6-8
            if (attr === "opacity") {
                result = curEle.currentStyle["filter"];//alpha(opacity=30);
                reg = /^alpha\(opacity=(.+)\)$/;
                result = reg.test(result) ? reg.exec(result)[1] / 100 : 1;
            } else {
                result = curEle.currentStyle[attr];
            }
        }
        //准备去掉获取到的属性的单位
        reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|rem|em)?$/
        if (reg.test(result)) {
            if (isNaN(reg)) {
                result = parseFloat(result);
            }
        }
        return result;
    }

    function setCss(curEle, attr, val) {
        if (attr === "opacity") {
            curEle.style.filter = "alpha(opacity=" + val * 100 + ")";
            curEle.style.opacity = val;
            return;
        }
        if (attr === "float") {
            curEle.style["cssFloat"] = val;
            curEle.style["styleFloat"] = val;
            return;
        }
        var reg = /^(width|height|fontsize|(margin|padding)?(left|right|top|bottom))$/i;
        //如果是需要带单位的属性类型
        if (reg.test(attr)) {
            if (!isNaN(val)) {//如果是一个数字
                val = val + "px";
            }
        }
        curEle.style[attr] = val;
    }

    function setGroupCss(curEle, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                setCss(curEle, key, obj[key]);
            }
        }
    }

    function css() {
        var length = arguments.length;
        var curEle = arguments[0]
        //三个参数的情况
        if (length === 3) {
            setCss(curEle, arguments[1], arguments[2]);
            return;
        }
        if (typeof arguments[1] === "object") {
            setGroupCss(curEle,arguments[1]);
            return;
        }
        return getCss(curEle,arguments[1]);
    }
    return{
        css:css,
        toJson:toJson
    }
})()