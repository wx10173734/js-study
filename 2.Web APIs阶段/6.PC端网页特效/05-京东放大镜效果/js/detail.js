window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.bigImg');
    //1.当鼠标经过preview_img 显示和隐藏 mask遮挡层和big大盒子
    preview_img.addEventListener('mouseover', function (e) {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    //2.鼠标移动的时候,让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function (e) {
        //1.先算出鼠标在盒子中的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x);
        // console.log(y);
        //(2)减去盒子高度 300的一半 是150 就是mask最终left和top值了
        //(3)mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //(4)如果x坐标小于了0 就让他停在0的位置
        //遮挡层最大移动距离
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片的移动距离 = 遮挡层移动距离  * 大图片最大移动距离 / 遮挡层的最大移动距离
       //大图片最大移动距离
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        var bigImgX = maskX * bigMaxX /maskMaxX;
        var bigImgY = maskY * bigMaxY /maskMaxY;
        bigImg.style.left = -bigImgX + 'px';
        bigImg.style.top = -bigImgY + 'px';
    })

})
