$(function () {
    //1.全选 全不选功能
    // 就是把全选按钮的状态赋值给 三个小的按钮(j-checkbox)就可以了
    $(".checkall").change(function () {
        var flag = $(this).prop("checked");
       $(".j-checkbox,.checkall").prop("checked",flag);
    });

    //2.如果小复选框被选中的个数等于3 就应该把全选按钮选上,否则全选按钮不选
    $(".j-checkbox").change(function () {
        // if (被选中的小的复选框的个数 === 3){
        //     就要选中全选按钮
        // }else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length)
        if ($(".j-checkbox:checked").length ===  $(".j-checkbox").length){
            $(".checkall").prop("checked",true);
        }else {
            $(".checkall").prop("checked",false);
        }
    })
})
