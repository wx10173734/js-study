$(function() {
    //当我们点击了 li 此时不需要执行 页面滚动里面的 li 的背景选择 添加current
    //节流阀 互斥锁
    var flag = true;
    //1.显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();
    function toggleTool(){
        if ($(document).scrollTop() >= toolTop){
            $(".fixedtool").fadeIn();
        }else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function () {
        toggleTool();

        if (flag){
            // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
            $(".floor .w").each(function (i,ele) {
                if ($(document).scrollTop() >= $(ele).offset().top){
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");

                }
            });
        }
    });

    //2.点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function () {
        flag = false;
        console.log($(this).index());
        var index = $(this).index();
        //当我们每次点击li 需要计算出页面需要去往的位置
        //选出对应索引号的内容区的盒子 计算它的.offset().top;
        var current = $(".floor .w").eq(index).offset().top;
        $("html,body").stop().animate({
            scrollTop:current
        },function () {
            flag = true;
        });

        //点击之后,让当前的小li 添加current类名,兄弟移除current类名
        $(this).addClass("current").siblings().removeClass("current");

    });



})
