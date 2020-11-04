$(()=>{
    
    //轮播图
    $.ajax({
        url:"/product/carousel",
        type:"get",
        dataType:"json",
        success:function(result){
            let $li="",licount=0;//图片数量
            result.reduce((prev,elem)=>{
                if(prev){
                    $li=$(`<li><img src="${elem.img}"></li>`).appendTo("#ul-imgs");
                    prev--;
                };
                $(`<li><img src="${elem.img}"></li>`).insertBefore($li);
                if(prev){
                    $(`<li class="active"></li>`).appendTo("#ul-idxs");
                prev--;
                }else{
                     $(`<li></li>`).appendTo("#ul-idxs");
                }
                licount++;
                return prev;
            },2);
            
            //
            let i=0;//图片下标
            let duration=500;//动画时间
            let interval=3000;//轮播时间间隔
            let $ulImgs=$("#ul-imgs");//图片父元素
            let $ulIdxs=$("#ul-idxs");//按钮父元素
            let $fir_li=$ulImgs.children(":first-child");
            let liwidth=parseInt($fir_li.css("width"));//变动宽度
            let $lis=$ulIdxs.children();//按钮
            let canClick=true;//初始状态允许点击
            let $btnLeft=$(".btn-left");//上一张
            let $btnRight=$(".btn-right");//下一张

            //根据图片数量修改样式
            $ulImgs.css({
                "width":`${licount+1}00%`,
                "min-width":`${(licount+1)*1200}px`
            });
            $("#ul-imgs>li").css("width",`${100/(licount+1)}%`);

            function moveTo(to){
                liwidth=parseInt($fir_li.css("width"));//更新变动宽度
                canClick=false;//动画时不能点击
                if(to==undefined){
                    to=i+1;
                }//继续向下一张
                
                if(i==0&&to==-1){
                    $ulImgs.css("left",-liwidth*licount+"px");
                    to=licount-1;
                };//从第一张向最后一张移动时,先将第一张换成最后一张
                i=to%licount;//移动到的图片下标
                $lis.each((index,elem)=>{
                    if(index==i){
                        $(elem).addClass("active");
                    }else{
                        $(elem).removeClass("active");
                    }
                });//移动按钮
                $ulImgs.animate({"left":-to*liwidth+"px"},duration,()=>{
                    if(to==licount){
                        $ulImgs.css("left",0);
                    }//如果移动到最后一张，换成第一张
                    canClick=true;//允许点击
                });//动画移动图片

            }
            //
            
            //初始动画
            let timer=setInterval(function(){
                moveTo()
            },interval);
            //下一张
            $btnRight.click(function(){
                move(1)
            });
            //上一张
            $btnLeft.click(function(){
                move(-1);
            });
            //点击箭头
            function move(n){
                clearInterval(timer);
                if(canClick){
                    canClick=false;
                    moveTo(i+n);
                    setTimeout(function(){
                        timer=setInterval(function(){
                            moveTo();
                        },interval);
                    },duration);
                }
            }
            
            //点击按钮
            $ulIdxs.on("click","li",function(){
                if(canClick){
                    var $li=$(this);
                    if($li.parent().attr("id")=="ul-idxs"){
                        if(!$li.hasClass("active")){
                            canClick=false;
                            clearInterval(timer);
                            i=$li.index();
                            console.log(i);
                            moveTo(i);
                            timer=setInterval(function(){
                                moveTo();
                            },interval);
                        }
                    }
                }
            });

        }
    })

    //分类导航
    $.ajax({
        url:"/product/type",
        type:"get",
        dataType:"json",
        success:function(result){
            let first={},second=[],third=[],ex=[];
            
            //将数据放入数组
            result.forEach(elem=>{
                let fn=elem.fname,sn=elem.sname,tn=elem.tname,fd=elem.fir,sd=elem.sec;
                first[fd]=fn;
                if(ex.indexOf(sd)==-1){
                    second.push({"sname":sn,"fir":fd,"sec":sd})
                }
                third.push({"tname":tn,"sec":sd});
                ex.push(sd);
            })

            let $ul=$(`<ul class="nav"></ul>`);
            for(let key in first){
                let $dul=second.reduce((prev,elem)=>{
                    if(elem.fir==key){
                        ($(`<li data-target3="${elem.sec}" class="f_14"><a>${elem.sname}</a></li>`)).hover(function(){
                            $(this).children("ul:last").toggleClass("hover");
                        }).appendTo(prev);
                    }
                    return prev;
                },$(`<ul data-target2="${key}" class="second"></ul>`));
                $(`<li data-target="${key}"><a>${first[key]}</a></li>`).append($dul).hover(function(){
                    $(this).children("ul.second:last").toggleClass("hover");
                }).appendTo($ul);
                let $li=$dul.children("li[data-target3]");
                $li.each(function(){
                    third.reduce((prev,elem)=>{
                        if(elem.sec==$(this).attr("data-target3")){
                            prev.append($(`<li class="f_14"><a>${elem.tname}</a></li>`));
                        }
                        return prev;
                    },$(`<ul class="third"></ul>`)).appendTo($(this));
                });
            }

            $ul.appendTo("#type");
            $("ul.third").on("click","a",function(){
                window.location.assign(`${url_port}/search.html?message=${$(this).html()}&type=3`);
            })
        }
    })

    //公司
    $.ajax({
        url:"/product/company",
        type:"get",
        dataType:"json",
        success:function(result){
            result.reduce((prev,elem)=>{
                $(`<div class=""><img src="${elem.cimg}"><div class="float_r">${elem.cname}</div></div>`).appendTo(prev);
                return prev;
            },$(`<div class="company d_flex between"></div>`)).appendTo("#company");
        }
    });

    //热销
    $.ajax({
        url:"/product/hot",
        type:"get",
        dataType:"json",
        success:function(result){
            result.reduce((prev,elem)=>{
                $(`<div class="point carbuy">
                        <div class="pm">
                            <img src=${elem.pic}>
                            <p class="color_grey3 hoverred comp">${elem.title}</p>
                            <div class="color_red f_14">¥:${elem.s_price.toFixed(2)}-${elem.l_price.toFixed(2)}<div class="float_r send">${elem.sale?"商家发货":"平台发货"}</div></div>
                            <div class="f_14 ell hoverred"><span class="color_white bg_red mr_2 p_2">店</span> ${elem.company}</div>
                        </div>
                    </div>`).click(()=>{details_f(elem.pid)}).appendTo(prev);
                
                return prev;
            },$(`<div class="d_flex between hotsale"></div>`)).appendTo("#hotsale");
        }
    });

    //首页产品
    $("#title .title>ul>li:gt(1)").each((index,elem)=>{
        let utype=$(elem).html();
        $(`<div>
            <div class="title">${utype}<span class="more">查看更多 ></span></div>
            <div class="main point" data-id="${index}">
                <div class="img float_l"><img src="../img/index/type${index+1}.png"></div>
            </div>
            </div>`).appendTo("#product");
        $.ajax({
            url:"/product/index",
            type:"get",
            data:{"type":utype},
            dataType:"json",
            success:function(result){
                result.reduce((prev,elem)=>{
                    $(`<div class="d_flex_4">
                        <div class="pm carbuy">
                            <img src=${elem.pic}>
                            <p class="color_grey3 hoverred comp">${elem.title}</p>
                            <div class="color_red f_14">¥:${elem.s_price.toFixed(2)}-${elem.l_price.toFixed(2)}<div class="float_r send">${elem.sale?"商家发货":"平台发货"}<div></div>
                        </div>
                    </div>`).click(()=>{details_f(elem.pid)}).appendTo(prev);
                    return prev;
                },$(`<div class="product d_flex"></div>`)).appendTo(`#product .main[data-id="${index}"]`);

            }
        })
    })

    
})