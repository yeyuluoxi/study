<template>
    <div class="foot">
        <div class="address">
            <p class="phone"><img src="../assets/phone.png" alt="">13396891168</p>
            <p><img src="../assets/position.png" alt=""> 义乌市江东东路1516号双枪内衣厂2幢2楼（青口工业区）</p>
        </div>
        <div class="bottom">
            <p>Powered by <span class="blue">Shop</span><span class="red">XO</span> v1.8.1</p>
            <p><img src="../assets/beian.png" alt="">备案/许可证浙ICP备15047010号-1</p>
            <p><img src="../assets/beiang.png" alt="">浙公安备案：33078202000919</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"footest"
}
</script>
<style scoped>
.foot{
    background-color:#303030;
    padding-bottom:60px;
}
.address{
    font-size:14px;
    color:#e2e2e2;
    text-align:left;
    margin:0 0 10px;
    padding:20px 0 10px;
    border-top: 1px solid #383838;
    border-bottom: 1px solid #383838;
}
.address>p{
    line-height:24px;
}
.address p.phone{
    color:#ff6700;
}
.address img{
    padding:0 5px;
}
.bottom{
    font-size:12px;
    color:#b1b1b1;
}
.bottom>p{
    margin:5px 0;
}
.bottom>p:first-child{
    color:#999;
}
.bottom .blue{
    color:#026ed9;
}
.bottom .red{
    color:#e6000e;
}
</style>