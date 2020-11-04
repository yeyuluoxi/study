$(()=>{
    $("#reg").click(()=>window.location.assign(`${url_port}/reg.html`));
    $(".sign #signin #sign").click(()=>{
        let $input=$(".sign #signin input");
        let count=0,msg=[];
        $input.each((index,elem)=>{
            if(!$(elem).val()){
                count+=index+1;
            }
            msg.push($(elem).val());
        })
        if(!count){
            $.ajax({
                url:"/user/signin",
                data:{
                    uname:msg[0],
                    upwd:msg[1]
                },
                type:"post",
                dataType:"json",
                success:result=>{
                    if(result.code==200){
                        $.cookie("uname",msg[0],{path:"/"});
                        $.cookie("upwd",msg[1],{path:"/"});
                        window.location.replace(`${url_port}/index.html`);
                    }else{
                        $("#result").html(`×${result.msg}`);
                    };
                }
            })
        }else if(count===2){
            $("#result").html(`×请输入密码`);
        }else{
            $("#result").html(`×请输入账号`);
        }
    })
})



