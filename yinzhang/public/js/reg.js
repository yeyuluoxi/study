

$(()=>{
    let conf=message=>{//弹窗动画
        let $div=$(`<div>×${message}</div>`);
        $div.addClass("conf").appendTo("body").animate({"top":"20px"},500,function(){
            $(this).animate({"top":"20px"},1000,()=>{
                $(this).animate({"top":"-40px"},500,()=>$(this).remove());
            });
        })
        
    };


    $("#signin").click(()=>window.location.assign(`${url_port}/signin.html`));
    let $inputs=$("#reg .form>form>div>input"),pwd="";//验证码
    $inputs.each((index,elem)=>{
        if(index==5){
            $(elem).click(function(){
                //简单验证格式
                if(!$(".first input").hasClass("success")){
                    $(".first input").trigger("blur").trigger("focus");
                    return;
                }
                if(!$(".second input").hasClass("success")){
                    $(".second input:first-child").trigger("blur").trigger("focus");
                    return;
                }
                if(!$(".third input").hasClass("success")){
                    $(".third input").trigger("blur").trigger("focus");
                    return;
                }
                if(!$(".forth input").hasClass("success")){
                    $(".forth input").trigger("blur").trigger("focus");
                    return;
                }
                //验证密码是否一致 弹窗
                let testmsg="";
                let upwd=$(".third input").val();
                if($(".forth input").val()!==upwd){
                    testmsg="两次输入的密码不一致";
                };
                //验证验证码 弹窗
                if($(".second input:first-child").val()!==pwd){
                    testmsg="验证码失效";
                }
                if(testmsg){
                    conf(testmsg);
                    return;
                }
                //验证通过清除验证码
                pwd="";
                //验证是否已注册 弹窗
                let uname=$(".first input").val();
                $.ajax({
                    url:"/user/checkname",
                    data:{uname},
                    type:"post",
                    dataType:"json",
                    success:result=>{
                        //提交注册
                        if(result.code==200){
                            $.ajax({
                                url:"/user/reg",
                                type:"post",
                                data:{
                                    uname,
                                    upwd
                                },
                                dataType:"json",
                                success:res=>{
                                    if(res.code==200){
                                        window.location.assign(`${url_port}/signin.html`);
                                    }
                                }
                            })
                        }else{
                            conf("该号码已注册");
                        }
                    }
                })
            })
        }else if(index==2){
            $("#reg form>.second>input:nth-child(2)").click(function(){
                let $this=$(this);
                if($this.prop("disabled")){

                }else{
                    if($("#reg form>.first>input").hasClass("success")){
                        $this.removeClass("sent").addClass("sending").prop("disabled",true);
                        //生成验证码并发送
                        let counts=Math.floor(Math.random()*3+4);//验证码长度4-6
                        let arrpwd=[];//验证码数组
                        for(let i=1;i<=counts;i++){
                            arrpwd.push(Math.floor(Math.random()*10));
                        }
                        pwd=arrpwd.join("");
                        $this.val(`${pwd}(60s)`);
                        //倒计时
                        let reg=/(0s)/;
                        setTimeout(()=>pwd="",5*60*1000);//验证码有效期
                        let timecount=setInterval(()=>{
                            $this.val($this.val().replace(/(?<=\()\d+(?=s\))/,e=>--e));
                            if(reg.test($this.val())){
                                $this.val("获取验证码");
                                clearInterval(timecount);
                                $this.removeClass("sending").addClass("sent").prop("disabled",false);                                
                            };
                        },1000)
                    }else{
                        //手机号格式有误 弹窗
                        conf("请先输入正确的手机号码");
                    }
                }
                
            })
        }else{
            $(elem).focus(function(){
                let $this=$(this);
                if(!$this.hasClass("success")){
                    $this.addClass("fail");
                }
            });
            let reg=/^\w{6,8}$/,str="请输入6-8位的密码";
            if(index==0){
                reg=/^1[3-9]\d{9}$/;
                str="请输入正确的手机号码";
            }else if(index==1){
                reg=/^\d{4,6}$/;
                str="请输入4-6位的验证码";
            };
            $(elem).blur(function(){
                let $this=$(this);
                let msg=$this.val();
                if(reg.test(msg)){
                    $this.addClass("success").removeClass("fail");
                    $this.nextAll("div").html("");
                }else{
                    $this.addClass("fail").removeClass("success");
                    $this.nextAll("div").html(str);
                }
            })

        };
    })







})