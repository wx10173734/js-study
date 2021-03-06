window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;
    //2.鼠标经过focus 显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清楚定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        },2000)
    });
    //3.动态生成小圆圈有几张图片,就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性
        li.setAttribute('index', i);
        //把li插入到ol中
        ol.appendChild(li);
        //4.小圆圈的排他思想,我们可以直接唉生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function () {
            //把所有小li清空current
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //当前的小li设置current
            this.className = 'current';
            //5.点击小圆圈滚动图片
            //ul的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //当我们点击了某个小li 就拿到当前li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就要把这个li的索引号 给num
            num = index;
            //当我们点击了某个小li 就要把这个li的索引号 给circle
            circle = num;
            animate(ul, -index * focusWidth);


        })
    }
    //把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';

    //6.克隆第一张图片li放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    //7.点击右侧按钮 图片滚动1张
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    //flag节流阀
    var flag = true;
    //右侧按钮实现
    arrow_r.addEventListener('click', function () {
       if (flag){
           flag = false;//关闭节流阀
           //如果走到了最后复制的一张图片,此时我们的ul要快速复原left改为0
           console.log(num);
           if (num == ul.children.length - 1) {
               ul.style.left = '0';
               num = 0;
           }
           num++;
           animate(ul, -num * focusWidth,function () {
                flag = true;//打开节流阀
           });

           circle++;
           //如果circle == 4说明走到最后我们的克隆的这张图片了 我们就复原
           if (circle == ol.children.length) {
               circle = 0;
           }
           //调用函数
           circleChange();
       }
    });
    //9.左侧按钮做法
    arrow_l.addEventListener('click', function () {
      if (flag){
          flag = false;
          //如果走到了最后复制的一张图片,此时我们的ul要快速复原left改为0
          console.log(num);
          if (num == 0) {
              num = ul.children.length - 1;
              ul.style.left = -num * focusWidth + 'px';

          }
          num--;
          animate(ul, -num * focusWidth,function () {
                flag = true;
          });
          circle--;
          //如果circle < 0 说明第一张图片,则小圆圈改为第四个小圆圈(3)
          if (circle < 0) {
              circle = ol.children.length - 1;
          }
          // circle = circle < 0 ? ol.children.length - 1 : circle;
          //调用函数
          circleChange();
      }
    });
    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    //10.自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    },2000)
})
