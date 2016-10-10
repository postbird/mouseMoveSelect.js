/** Created by postbird on 2016/6/18.  ...*/
/**
 *      @postbird
 *      1、本插件采用js编写，可直接将函数复制到个人js文件，减少get请求数
 *      2、author：powered by postbird
 *      3、email： ptbird@yeah.net
 *      4、site：http://www.ptbird.cn
 *      5、license : MIT
 * */
/**
 * 图片的html DOM如下所示 可以根据实际需求进行更改
 *
 *  <div class="photoitem">
 *       <img src="./images/1.jpg"width="100px" alt="" class="photo-img">
 *       <br><input type="checkbox" class="photo-selector">
 *  </div>
 */
//-----------------------------------------------
var bStartSelect = false;
window.cSelectedPhotoList=[];//存储选中的值的列表
document.onselectstart = function () {
    return false;
}
//鼠标按下--------表示移动选择开始
function MouseDown() {
    bStartSelect = true;
    console.log("start");
}
//鼠标放开--------表示移动选择结束
function MouseUp() {
    bStartSelect = false;
    console.log("end");
}
//设置div的鼠标监听事件-------也可以设置整个body进行监听
$(function () {
    $(".photo-well-div").mousedown(function () {
        MouseDown();
    }).mouseup(function () {
        MouseUp();
    });
})
//设置经过图片的容器div 的时候鼠标move事件（photo-item是容器div）
$(function () {
    $(".photo-item").mousemove(function () {
        if (bStartSelect) {
            SelectMe($(this));
        }
    });
})
//设置鼠标经过图片的时候（以防万一，设置经过图片 photo-img 是图片的类）
$(function () {
    $(".photo-img").mousemove(function () {
        if (bStartSelect) {
            SelectMe($(this).parent());
        }
    });
})
//设置选中图片（也就是选中checbox）
//找到没有选中的图片进行click操作
function SelectMe(photoDiv) {
    $(photoDiv).find(".photo-selector:not(:checked)").click();
    MouseSelected();
}
//-----------------------------------------------
//鼠标选中事件
function MouseSelected() {
    var tmpSelectedPhotoList=[];//每次选中都滞空后在进行选择
    var count=0;
    $(".photo-selector:checked").each(
        function (index, item) {
            tmpSelectedPhotoList[count]=$(item).attr("GUID");
            count++;
            //获取存储在checkbox 的attrGUID，或者获取attr的val值都可以
        }
    );
    cSelectedPhotoList=tmpSelectedPhotoList;
    setVarShow();//每次的选中都对DOM进行显示的操作
}
//清楚所有的选择
function ClearAllSelect() {
    $(".photo-selector").attr("checked", false);
    cSelectedPhotoList=[];
    setVarShow();
}
//全选功能
function SelectAllSelect() {
    ClearAllSelect();   //先清空在选中
    $(".photo-selector").click();
    MouseSelected();
}
//设置内容显示---使用两个全局变量的函数
function setVarShow(){
    $(".select-length").text(cSelectedPhotoList.length);
    $(".select-list").text(cSelectedPhotoList);
}