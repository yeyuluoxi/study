$(()=>{


    let shopcar_f=uname=>{
        $.ajax({
            url:"/product/shopcar",
            data:{uname},
            type:"get",
            dataType:"json",
            success:result=>{
                $(`span.buycount`).html(result.length);
                result.reduce((prev,elem)=>{
                    $(`<div class="car">
                    <div class="company f_14">
                    <span>${elem.company}</span>
                    <span>${elem.sale?"商家":"平台"}发货</span>
                    </div>
                    <div class="product">
                    <div><input type="checkbox"  class="el-checkbox"></div>
                    <div class="picture"><img src="${elem.pic}"></div>
                    <div><p>${elem.title}</p><p>${elem.title}</p></div>
                    <div class="admi"><button class="minus">-</button><input data-sid="${elem.pid}" type="text" value="${elem.buy}"><button class="add">+</button></div>
                    <div>≥1</div>
                    <div class="lastcount">${elem.lastcount}</div>
                    <div class="price">¥<span>${elem.s_price}</span></div>
                    <div class="total">¥<span>${(elem.s_price*elem.buy).toFixed(2)}</span></div>
                    <div class="delete" data-sid="${elem.sid}"><img src="../img/product/delete.png"></div>
                    </div></div>`).appendTo(prev);
                    
                    return prev;                      

                },$(`<div></div>`)).appendTo(".result_car");

                //删除
                let del=e=>{
                    $.ajax({
                        url:"/product/delete",
                        dataType:"json",
                        type:"get",
                        data:{sid:e.attr("data-sid")},
                        success:result=>{
                            if(result.code==200){
                                shopcar_count($.cookie("uname"));
                                e.parent().parent().remove();
                            }
                        }
                    })
                }


                //删除单个
                $(".delete").click(function(){
                    //弹窗
                    m_confirm("确定删除此产品?",del,$(this))

                });

                //更改数量
                let update_f=(e)=>{
                    let buy=e.val(),reg=/^\d+$/;
                    if(buy==""||buy==0||!reg.test(buy.trim())){
                        buy=1;
                    }
                    let last=e.parent().nextAll(".lastcount").html();
                    buy-=0;
                    if(buy>last){
                        buy=1;
                    }
                    $.ajax({
                        url:"/product/update",
                        data:{
                            buy,
                            shid:e.attr("data-sid")
                        },
                        type:"get",
                        dataType:"json",
                        success:result=>{
                            if(result.code==200){
                                e.val(buy);
                                let price=e.parent().nextAll(".price").children("span").html();
                                let total=buy*price;
                                e.parent().nextAll(".total").children("span").html(total.toFixed(2));
                            }
                        }
                    })
                }

                //减
                $(".minus").click(function(){
                    let $buy=$(this).next("input");
                    let num=$buy.val()-0;
                    if(num-1){
                        $buy.val(num-1);
                        update_f($buy);
                    }
                })

                //加
                $(".add").click(function(){
                    let $buy=$(this).prev("input");
                    let num=$buy.val()-0;
                    let last=$(this).parent().nextAll(".lastcount").html();
                    if(num-last){
                        $buy.val(num+1);;
                        update_f($buy);
                    }
                })

                //输入
                $(".minus+input").blur(function(){
                    update_f($(this));
                })

                let $boxs=$(".el-checkbox");
                let leng=$boxs.length;

                //底部总计更新
                let recompute=delpay=>{
                    let $bottom=$(".operator");
                    let count=0,least=0,total=0;
                    let give=()=>{
                        $bottom.find("#checkall+label span").html(count);
                        $bottom.find(".count span").html(count);
                        $bottom.find(".least span").html(0-least);
                        $bottom.find(".total span").html((0-total).toFixed(2));
                    };
                    give();
                    let $cars=$(".car .el-checkbox");
                    $cars.each((index,elem)=>{
                        if($(elem).prop("checked")){
                            count++;
                            least-=$(elem).parent().nextAll(".admi").children("input").val();
                            total-=$(elem).parent().nextAll(".total").children("span").html()
                        }
                    });

                    //删除多个
                    if(delpay){
                        $cars.each((index,elem)=>{
                            if($(elem).prop("checked")){
                                del($(elem).parent().nextAll(".delete"));
                            }
                        });
                        return ;
                    }

                    let $first=$($boxs[0]),$last=$($boxs[leng-1]);
                    if($cars.length-count){//未全选时取消全选按钮
                        $first.prop("checked",false);
                        $last.prop("checked",false);
                    }else if($cars.length){
                        $first.prop("checked",true);
                        $last.prop("checked",true);
                    }

                    give();
                    
                    
                }
                
                //全选
                $boxs.each((index,elem)=>{
                    if(!index||(index+1)==leng){
                        $(elem).click(()=>{
                            $boxs.prop("checked",$(elem).prop("checked"))
                            recompute();
                        })
                    }else{
                        $(elem).click(()=>{
                            recompute();
                        })
                    }
                })

                //批量删除
                $("span.batch").click(()=>{
                    let count=0;
                    $(".car .el-checkbox").each((index,elem)=>{
                        if($(elem).prop("checked")){
                            count++;
                        }
                    });
                    if(count){
                        m_confirm("确定删除此产品?",recompute,1)
                    }else{
                        tips("请选择商品");
                    }
                })

                //结算
                $("button.gopay").click(()=>{
                    let count=0;
                    $(".car .el-checkbox").each((index,elem)=>{
                        if($(elem).prop("checked")){
                            count++;
                        }
                    });
                    if(count){
                        m_confirm(`支付${$("#shopcar .operator .total span").html()}元`,recompute,1)
                    }else{
                        tips("请选择商品");
                    }
                })

            }

        })
    }
    

    let uname=$.cookie("uname");
    if(uname){
        shopcar_f(uname);
    }
})