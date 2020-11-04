$(()=>{
    let search=(message,page,type)=>{
        if(type==1){type=""}else{type="3"};
        if(!page){page=1;}
        $("#result .top span").html(message);
        $("#search .search input").val(message);

        //数量
        $.ajax({
            url:`/product/search${type}`,
            type:"get",
            data:{message},
            dataType:"json",
            success:result=>{
                let count=result[0]["count(pid)"];
                if(count){
                    let num=Math.ceil(count/10),str='';
                    for (let i=1;i<=num;i++){
                        str+=`<button>${i}</button>`;
                    };
                    $(`<div class="page f_13"><button class="prev"><</button>${str}<button class="next">></button></div>`).replaceAll("#product .page");
    
                    $(`.page button:nth-child(${page-0+1})`).addClass("active");
                    //按钮设置

                    $("div.page").on("click","button",function(){
                        page=page-0;
                        let ind=$(this).index();
                        if(num==1||ind==page){return;}
                        if(page==1&&ind>1){
                            if(ind==num+1){
                                search(message,page+1);
                                return;
                            }
                            search(message,ind);
                        }else if(page==num&&ind<num){
                            if(ind){
                                search(message,ind);
                                return;
                            }
                            search(message,page-1);
                        }else if(page<num&&page>1){
                            if(!ind){
                                search(message,page-1);
                            }else if(ind==num+1){
                                search(message,page+1);
                            }else{
                                search(message,ind);
                            }
                        }
                    })
                    
                    //当前页
                    $.ajax({
                        url:`/product/search/page${type}`,
                        type:"get",
                        data:{message,page,type},
                        dataType:"json",
                        success:result=>{
                            result.reduce((prev,elem)=>{
                                $(`<div class="point carbuy">
                                        <div class="pm">
                                            <img src=${elem.pic}>
                                            <p class="color_grey3 hoverred comp">${elem.title}</p>
                                            <div class="color_red f_14">¥:${elem.s_price.toFixed(2)}-${elem.l_price.toFixed(2)}<div class="float_r send">${elem.sale?"商家发货":"平台发货"}</div></div>
                                        </div>
                                    </div>`).click(()=>{details_f(elem.pid)}).appendTo(prev);
                                return prev;
                            },$(`<div class="result"></div>`)).replaceAll("#product #result .result");
                        }
                    });
                }else{
                    //该商品不存在
                    $("#product").html(`<img src="../img/log/noresults.jpg"><div>抱歉，搜索&nbsp;${message}&nbsp;无结果</div>`).css({
                        "height":"800px",
                        "padding-top":"40px",
                        "text-align":"center"

                    })


                }

            }
        });

    };
    search(url().get("message"),1,url().get("type"));
})


