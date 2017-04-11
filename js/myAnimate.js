/**
 * Created by yelin on 2017/4/10 21:18
 */
(function(){
    //运动公式
    var fomular = {
        //获取经过了一段时间后的当前状态
        linear:function(time,begin,change,duration){
            return change/duration*time+begin;
        }
    }
    function move(options){//curEle,target,duration,effect,callback要运动的元素 目标状态 运行持续时间 运动公式 回调函数
        var curEle  = options.curEle;
        var target = options.target;
        var duration = options.duration;
        var effect = options.effect || fomular.linear;//获取运动方式 可能为数字，可能是数组,可能是undefined
        var callback = options.callback;//获取回调函数,有可能是undefined

        //判断当前元素是够在运动，如果在运动则清理之前的定时器
        curEle.timer?clearInterval(curEle.timer):null;

        //处理effect
        if(typeof effect === "number"){
            switch(effect){
                case 0:
                    effect = fomular.linear;
                    break;
                case 1:
                    effect = fomular.linear;
            }
        }else if(effect instanceof Array){
            effect = fomular[effect[0]][effect[1]];
        }

        //处理target
        var begin = {};
        var change = {};
        for(var key in target){
            if(target.hasOwnProperty(key)){
                begin[key] = utils.css(curEle,key);
                change[key] = target[key] - begin[key];
            }
        }

        var time = null;//初始时间
        curEle.timer = setInterval(function(){

            if(time>=duration){//运动了多长时间
                utils.css(curEle,target);
                typeof callback === "function"?callback():null;
                clearInterval(curEle.timer);
                return;
            }

            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curStatus = effect(time,begin[key],change[key],duration);
                    utils.css(curEle,key,curStatus);
                }
            }
            time+=10;
        },10)

    }
    window.myAnimte = move;

})()