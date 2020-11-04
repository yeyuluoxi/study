<template>
    <div class="order">
        <div class="title"><span><img src="../../assets/center/order.png"> 我的订单</span>查看全部订单&nbsp;></div>
        <div class="list">
            <ul class="flex">
                <li><img src="../../assets/center/waittopay.png"><p>待付款</p></li>
                <li><img src="../../assets/center/waittosend.png"><p>待发货</p></li>
                <li><img src="../../assets/center/sending.png"><p>待收货</p></li>
                <li><img src="../../assets/center/commonts.png"><p>待评价</p></li>
                <li><img src="../../assets/center/back.png"><p>退款/售后</p></li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.order{
    font-size:0.75rem;
    color:#888;
}
.title{
    text-align:right;
    padding:0.75rem 0.5rem;
    border-bottom: 1px solid #f1f1f1;
}
.title span{
    float:left;
}
.title img{
    width:0.75rem;
}
.list{
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #f1f1f1;
    padding: 0.75rem 0 0.25rem;
}
.list ul{
    justify-content: space-around;
}
ul>li img{
    width:20px;
}
</style>