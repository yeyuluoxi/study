<template>
    <div>
        <m-header></m-header>
        <div class="reg">
            <div class="title">
                我已注册,现在就<router-link to="/sign" class="signin">登录</router-link><router-link to="/" class="tour">游客</router-link>
            </div>
            <div class="main">
                <div class="top">
                    手机注册
                    <div class="three"></div>
                </div>
                <div class="bottom">
                    <div class="input" :class="{'ok':nameok,'no':!nameok&&namef}" >
                        <span>手机号码</span>
                        <input type="text" placeholder="请输入手机号码" v-model="uname" @blur="checkname">
                    </div>
                    <div class="input" :class="{'ok':verifyok,'no':!verifyok&&verifyf}" >
                        <span>验证码</span>
                        <input type="text" placeholder="验证码" v-model="verify" @blur="checkverify"><button class="conf" @click="createcode">获取验证码</button>
                    </div>
                    <div class="input" :class="{'ok':pwdok,'no':!pwdok&&pwdf}">
                        <span>设置登录密码</span>
                        <input :type="visible?'password':'text'" placeholder="设置登录密码" v-model="upwd" @blur="checkpwd"><button @click="visible=!visible" :class="{'visible':!visible}"><img v-if="visible" src="../assets/visi.png"><img v-else src="../assets/visiable.png"></button>
                    </div>
                    <div class="check">
                        <input type="checkbox" v-model="check">阅读并同意<span>《服务协议》</span>
                    </div>
                    <div class="button" @click="reg"><button>注册</button></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import {mapMutations} from "vuex"
import mHeader from "../components/header.vue"
export default {
    components:{mHeader},
    data(){
        return {
            check:false,
            visible:true,
            uname:"",
            upwd:"",
            verify:"",
            nameok:false,
            pwdok:false,
            verifyok:false,
            namef:false,
            pwdf:false,
            verifyf:false,
            code:"",
            busy:false
        }
    },
    methods:{
        ...mapMutations(["in","tip"]),
        createcode(){
            if(this.busy){
                this.tip({type:false,message:"验证码时间间隔1分钟"})
            }else{
                this.busy=true;
                let code=new Array(1,1,1,1);
                this.code=code.reduce(prev=>{
                    prev+=Math.floor(Math.random()*10);
                    return prev;
                },"")
                this.tip({type:true,message:"验证码:"+this.code});
                setTimeout(()=>{
                    this.busy=false;
                },60*1000);//验证码间隔
                setTimeout(()=>{
                    this.code="";
                },5*60*1000)//验证码有效期
            }
        },
        checkname(){
            this.uname=this.uname.trim();
            let reg=new RegExp("^1[3-9]\\d{9}$");
            if(reg.test(this.uname)){
                this.nameok=true;
                return true;
            }else{
                this.tip({type:false,message:"手机格式错误"})
                this.nameok=false;
                this.namef=true;
                return false;
            }
        },
        checkpwd(){
            this.upwd=this.upwd.trim();
            let leng=this.upwd.length;
            if(leng>=6&&leng<=18){
                this.pwdok=true;
                return true;
            }else{
                this.tip({type:false,message:"密码格式6~18个字符之间"})
                this.pwdok=false;
                this.pwdf=true;
                return false;
            }
        },
        checkverify(){
            this.verify=this.verify.trim();
            let reg=new RegExp("^\\d{4}$");
            if(reg.test(this.verify)){
                this.verifyok=true;
                return true;
            }else{
                this.tip({type:false,message:"验证码格式4位数字"})
                this.verifyok=false;
                this.verifyf=true;
                return false;
            }
        },
        reg(){
            if(this.checkname()&&this.checkpwd()&&this.checkverify()){
                if(!this.check){
                    this.tip({type:false,message:"请同意协议"});
                    return ;
                }
                if(this.verify==this.code){
                    this.code="";
                    this.axios.post("/user/reg",`uname=${this.uname}&upwd=${this.upwd}`).then(res=>{
                        if(res.data.code==200){
                            this.tip({type:true,"message":res.data.msg+",请登录"});
                            setTimeout(()=>{
                                this.$router.push("/sign");
                            },1000)
                        }else{
                            this.tip({type:false,"message":res.data.msg});
                        }
                    })
                }else{
                    this.tip({type:false,message:"验证码失效"});
                }
            }
            
        },
    }
}
</script>
<style scoped>
.reg{
    font-size:12px;
    color:#333;
    text-align:left;
    padding:0 10px;
}
.title{
    padding:20px 0;
}
.title a{
    border-radius: 2px;
    outline:0;
    display: inline-block;
    padding: 0.5em 1em;
    margin:0 5px;
}
.title .signin{
    color: #f77076;
    background-color: #ffe2e5;
    border-color: #facbd0;
}
.title .tour{
    color: #F37B1D;
    background-color: #ffe5be;
    border-color: #f8d093
}
.main{
    background: rgba(0,0,0,0.15);
    padding: 10px;
}
.top{
    text-align:center;
    color: #d2364c;
    border-bottom: 2px solid #d2364c;
    background-color: #fff1f5;
    height:42px;
    line-height:42px;
    position:relative;
}
.top .three{
    display:inline-block;
    width:0;
    border:5px solid #fff1f5;
    border-bottom-color:#d2364c;
    position:absolute;
    bottom:0;
    left:50%;
    margin-left:-5px;
}
.bottom{
    padding:10px;
    background-color:#fff;
}
.input{
    padding:5px 10px;
    margin-bottom:15px;
    position:relative;
}
.input>span{
    display:inline-block;
    font-weight:600;
    margin-bottom:5px;
}
.input>input{
    display:block;
    width:100%;
    padding:6px;
    border-radius:2px;
    font-size:12px;
    outline:0;
    border:1px solid #ccc;
}
.input>input:focus{
    background-color: #fefffe;
    border:1px solid #3bb4f2;
}
.input.ok>span{
    color:#5eb95e;
}
.input.ok>input{
    border-color:#5eb95e;
}
.input.no>span{
    color:#dd514c;
}
.input.no>input{
    border-color:#dd514c;
}
.input>button{
    position:absolute;
    right:9px;
    bottom:5px;
    border:1px solid #ccc;
    outline:0;
    border-radius: 2px;
    padding:5px 12px;
    font-size:12px;
}
.input>button.visible{
    background-color:#666;
    border-color:#666;
}
.check{
    padding-left:10px;
    height:20px;
    line-height:20px;
}
.check input{
    outline:0;
    line-height:20px;
    font-size:12px;
    margin-right:4px;
    position:relative;
    top:2px;
}
.check span{
    color:#d2364c;
}
.button{
    padding:15px 10px 5px;
}
.button button{
    width:100%;
    border-radius:2px;
    padding:6px 0;
    color: #d13b49;
    background-color: #ffcbd0;
    border:1px solid transparent;
    outline:0;
}
</style>