let url_port=`http://127.0.0.1:7070/html`;
let details_f=pid=>{
    window.location.assign(`${url_port}/details.html?pid=${pid}`);
}
let url=()=>new URLSearchParams(location.search);
let shopcar_count=uname=>{
    $.ajax({
        url:"/product/shopcar/count",
        data:{uname},
        type:"get",
        dataType:"json",
        success:result=>{
            $("span.buycount").html(result[0]["count(sid)"]);
        }
    });
}

//确认弹窗
let m_confirm=(tip,fn,e)=>{
    $(`<div class="confirm"><div>
    <p>提示</p>
    <div class="message">${tip}</div>
    <button class="ok">确认</button><button class="fail">取消</button></div>
    </div>`).appendTo("body")

    let body_x=$("body").css("width").replace("px",""),body_y=$(window).height();
    let x=$(".confirm>div").css("width").replace("px",""),y=$(".confirm>div").css("height").replace("px","");
    $(".confirm>div").css({
        top:`${body_y/2-y/2-300}px`,
        left:`${body_x/2-x/2}px`
    }).animate({"top":`${body_y/2-y/2-200}px`},500);
    $(".confirm button.ok").click(()=>{
        $(".confirm").remove();
        fn(e);
    });
    $(".confirm button.fail").click(()=>{
        $(".confirm").remove();
    })
}

//提示弹窗
let tips=tip=>{
    $(`<div class="center">${tip}</div>`).appendTo("body");
    let body_x=$("body").css("width").replace("px",""),body_y=$(window).height();
    let x=$(".center").css("width").replace("px",""),y=$(".center").css("height").replace("px","");
    $(".center").css({
        top:`${body_y/2-y/2-200}px`,
        left:`${body_x/2-x/2}px`
    }).animate({"top":`${body_y/2-y/2-100}px`},500,function(){
        $(this).animate({"top":`${body_y/2-y/2-100}px`},1000,()=>{
            $(this).remove();
        })
    });
}


$(()=>{
    //登录状态
    //登录&退出
    
    //加载页面时，判断是否已登录
    let uname=$.cookie("uname")

    if(uname){
        $.ajax({
            url:"/user/signin",
            type:"post",
            dataType:"json",
            data:{
                uname,
                upwd:$.cookie("upwd")
            },
            success:result=>{
                if(result.code==200){
                    $("span#user_name").html(uname).removeClass("sign_in");
                    $("li.sign_in").html("退出登录");
                    //更新购物车状态
                    shopcar_count(uname);
                }
            }
        })
    }

    //购物车点击事件
    $("span.buycount").parent().click(()=>{
        if(uname){
            window.location.assign(`${url_port}/shopcar.html`);
            return ;
        }
        window.location.assign(`${url_port}/signin.html`);
    })
    
    $("li.sign_in").click(function(){
        if($(this).html()=="登录"){
            location.href=`${url_port}/signin.html`;//未登录时 点击跳转登录页面
        }else{//登录时 点击退出登录状态
            $.ajax({
                url:"/user/signout",
                type:"get",
                dataType:"json",
                data:{uname:$.cookie("uname")},
                success:result=>{
                    console.log(result);
                    if(result.code==200){
                        $.removeCookie("uname",{path:"/"});
                        $("span#user_name").html("访客");
                        $("li.sign_in").html("登录");
                        //跳转登录页面
                        window.location.assign(`${url_port}/signin.html`);
                    }
                }
            });
        }
    })

    
    $("#user_name").click(function(){
        if($(this).html()=="访客"){
            $("li.sign_in").trigger("click");
        }
    })


    //搜索
    $("#search .search button").click(()=>{
        let message=$("#search .search input").val();
        if(message){
            window.location.assign(`${url_port}/search.html?message=${message}&type=3`);
        }
    });

    //标题导航
    $("#title .title ul").on("click","li",function(){
        let ind=$(this).index();
        if(ind==1){
            window.location.assign(`${url_port}/index.html`);
        }else if(ind>1){
            window.location.assign(`${url_port}/search.html?message=${$(this).html()}&type=1`);
        }
    });

    
    $("#search ul").on("click","li",function(){
        $("#search .search input").val($(this).html()).next("button").trigger("click");
    })

    //enter
    $("#search .search input").keyup(function(e){
        if(e.keyCode==13){
            $(this).next("button").trigger("click");
        }
    })
    
});