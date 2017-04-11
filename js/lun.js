/**
 * Created by yelin on 2017/4/10 21:56
 */
function requestData() {
    var xhr = new XMLHttpRequest();
    var data = null;
    xhr.open('get', 'data/imgData.json', true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && /^2\d\d$/.test(String(this.status))) {
            data = this.responseText;
            data = utils.toJson(data);
            bindDom(data);
        }
    }
    xhr.send(null);

}

function bindDom(data) {
    var imgStr = "";
    var lisStr = "";
    var box1Height = box1.clientHeight;
    var box1Width  = box1.clientWidth;
    for (var i = 0; i < data.length; i++) {
        imgStr += "<img data-src =" + data[i].src + " />";
        lisStr+= i===0? "<li class='select'>"+"</li>":"<li></li>";
    }
    imgStr+="<img data-src="+data[0].src+" />";//在图片末尾追加第一张图片
    box2.innerHTML = imgStr;
    ul.innerHTML = lisStr;
    //在图片轮廓出来后，设置图片的高宽
    for(var i = 0;i<imgs.length;i++){
        utils.css(imgs[i],{height:box1Height,width:box1Width});
        (function(n){
            var imgTest = document.createElement("img");
            var src = imgs[n].getAttribute("data-src");
            imgTest.src = src;
            imgTest.onload = function(){
                console.log("加载成功");
                imgs[n].src = src;

            }
            imgTest.onerror =function(){
                console.log("加载出错");
            }
        })(i)
    }
    //设置图片盒子的宽度
    utils.css(box2,"width",imgs.length*box1Width)
    //绑定导航li
    bindLi();
    //自动执行
    var timer = setInterval(autoMove,3000);
    console.log(timer);
    box1.onmouseover = function(){
        utils.css(toLeft,"display","block");
        utils.css(toRight,"display","block");

        clearInterval(timer);
    }
    box1.onmouseout = function(){
        utils.css(toLeft,"display","none");
        utils.css(toRight,"display","none");

        timer = setInterval(autoMove,3000)

    }
    toLeft.onclick = function(){
        if(index==0){
            utils.css(box2,"left",-box1Width*(imgs.length-1));
            index = imgs.length-3;
            autoMove();
        }else{
            index = index-2;
            autoMove();
        }
    }
    toRight.onclick = function(){
        autoMove();
    }



}

function autoMove(){

    index++;
    if(index>=imgs.length){
        utils.css(box2,"left",0);
        index = 1;
    }
    var options = {
        curEle:box2,
        target:{
            left:index*(-box1Width)
        },
        duration:500
    }
    console.log(index);
    myAnimte(options);
    changeLi(index);
}

function changeLi(index){
    for(var i = 0;i<lis.length;i++){
        if(index===i){
            lis[i].className = "select";
        }
        else{
            lis[i].className = "";
        }
    }
    if(index === imgs.length-1){
        lis[0].className = "select";
    }
}

function bindLi(){
    for(var i =0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onclick = function(){
            index = this.index;
            index --;
            autoMove();
        }
    }
}



//全局变量
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var imgs = box2.getElementsByTagName("img");//获取box2下面所有轮播图片
var box1Width  = box1.clientWidth;

var box3 = document.getElementById("box3");
var ul = box3.getElementsByTagName("ul")[0];
var lis = ul.getElementsByTagName("li");//获取所有的li 标签

var toLeft = document.getElementById("toLeft");
var toRight = document.getElementById("toRight");

var index = 0;



requestData();

