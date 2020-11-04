$(()=>{
    let details_f=pid=>{
        $.ajax({
            url:"/product/details",
            data:{pid},
            dataType:"json",
            type:"get",
            success:result=>{
                result=result[0];
                $("#details .top p").html(result.title);
                let $price=$("#details .price");
                $price.find("div:first span:first-child").html(`${result.s_price.toFixed(2)}-${result.l_price.toFixed(2)}元`).next("span").html(`${result.sale?"商家":"平台"}发货`);
                $price.find(".title1 div:first-child").html(`${result.title}`).next("div").html(result.s_price).nextAll(":last-child").html(result.lastcount);
                $("#details .message .intr img").attr("src",result.intr);
                $("#details .company p").html(result.company);

                //图片列表
                let imgarr=result.mpic.split("|");
                imgarr.reduce((prev,elem)=>{
                    $(`<div><img src="${elem}"></div>`).appendTo(prev);
                    return prev;
                },$(`<div class="clear"></div>`)).appendTo(".list_p");
                $("#details .main img").attr("src",imgarr[0]);

                //点击前后图片
                let pics=imgarr.length,ind=0,$pic=$("#details .main+div .list_p>div");
                let wid=($pic.css("width").replace("px",""))/4;

                $("#details .main+div .list_p+div").click(()=>{
                    if(pics>4&&ind<(pics-4)){
                        let posit=$pic.css("margin-left").replace("px","")-0;
                        $("#details .main+div .list_p>div").animate({"margin-left":`${posit-wid}px`},300);
                        ind++;
                    }
                })
                $("#details .main+div>div:first-child").click(()=>{
                    if(ind){
                        let posit=$pic.css("margin-left").replace("px","")-0;
                        $("#details .main+div .list_p>div").animate({"margin-left":`${posit+wid}px`},300);
                        ind--;
                    }
                })

                //大图更换
                $(".list_p").on("click","img",function(){
                    $("#details .main img").attr("src",$(this).attr("src"));
                })

                $.ajax({
                    url:"/product/company/pic",
                    data:{cname:result.company},
                    dataType:"json",
                    type:"get",
                    success:result_p=>{
                        $("#details .company img").attr("src",result_p[0].cimg);
                    }
                })
            }
        })
    }

    details_f(url().get("pid"));

    let recoun=()=>{
        let value=$(".minus").next("input").val()-0;
        $("#details .top .bottom div:first-child span").each((index,elem)=>{
            switch(index){
                case 0:
                    value?$(elem).html("1"):$(elem).html("0");
                    break;
                case 1:
                    $(elem).html(value);
                    break;
                case 2:
                    let price=$("#details .title1>div:nth-child(2)").html();
                    $(elem).html((price*value).toFixed(2));
                    break;
            }
        })
    }

    $(".minus").click(function(){
        let $count=$(this).next("input");
        if($count.val()-0){
            $count.val($count.val()-1);
            recoun();
            return ;
        }
        //提示
        tips("数量不能小于起订量");
    })
    $(".add").click(function(){
        let $count=$(this).prev("input");
        if(($count.val()-0)<$(".lastcount").html()){
            $count.val($count.val()-0+1);
            recoun();
            return ;
        }
        //提示
        tips("数量不能大于可售数量");
    })

    $(".minus").next("input").keyup(function(){
        let value=$(this).val();
        if(value!=""&&value!=0){
            let reg=/^\d*$/;
            if(!reg.test(value.trim())){
                $(this).val(0);
            }
        }
        value-=0;
        if(value>$(".lastcount").html()){
            $(this).val(0);
        }
        recoun();
    });

    $("#details .bottom>div:nth-child(2) button").click(()=>{
        let uname=$.cookie("uname");
        if(!uname){
            window.location.assign(`${url_port}/signin.html`);
            return ;
        }
        let value=$(".minus").next("input").val()-0;
        if(value){
            //加入购物车
            $.ajax({
                url:"/product/insert",
                type:"get",
                dataType:"json",
                data:{
                    username:uname,
                    shid:url().get("pid"),
                    buy:value
                },
                success:result=>{
                    if(result.code==200){
                        window.location.assign(`${url_port}/shopcar.html`);
                        return ;
                    }
                }
            });
        }else{
            //提示
            tips("数量不能小于起订量");
        }

    })


})