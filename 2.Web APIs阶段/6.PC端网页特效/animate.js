function animate(obj, target, callback) {
    // console.log(callback); callback = function(){} 调用的时候callback();
    //当我们不断点击按钮,这个元素的速度会越来越快,因为开启了太多的定时器
    //解决方案就是 让我们元素只有一个定时器执行
    //先清楚以前的定时器,只保留当前一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长值写到定时器里面
        //步长值改为整数 不要出现小数的问题
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            // if (callback){
            //     //回调函数写到定时器结束里面
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}
