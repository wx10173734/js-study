$(function () {
    //1.全选 全不选功能
    // 就是把全选按钮的状态赋值给 三个小的按钮(j-checkbox)就可以了
    $(".checkall").change(function () {
        var flag = $(this).prop("checked");
        $(".j-checkbox,.checkall").prop("checked", flag);
        if ($(this).prop("checked")){
            //让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        }else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    //2.如果小复选框被选中的个数等于3 就应该把全选按钮选上,否则全选按钮不选
    $(".j-checkbox").change(function () {
        // if (被选中的小的复选框的个数 === 3){
        //     就要选中全选按钮
        // }else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length)
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")){
            //让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        //当前商品的价格p
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        //小计模块
        var price = (p * n).toFixed(2);
        // toFixed(2) 可以保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //当前商品的价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        //小计模块
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });

    //4. 用户修改文本框的值 计算 小计模块
    $(".itxt").change(function () {
        //先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val();
        //当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+price);
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0;//计算总件数
        var money = 0;//计算总价钱
        $(".itxt").each(function (i,ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i,ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥"+money.toFixed(2));
    }
    //6.删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action").click(function () {
        //删除的是当前的商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function () {
        //删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })

})
