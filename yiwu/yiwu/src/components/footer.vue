<template>
    <div class="footer">
        <ul>
            <li>行业新闻</li>
            <li v-for="(k,i) of news" :key="i">{{k}}</li>
        </ul>
        <ul>
            <li>批发市场</li>
            <li v-for="(k,i) of news" :key="i">{{k}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            news:["2元店持续发展","10元店的6条生意经","2元店持续发展","10元店的6条生意经","2元店持续发展","10元店的6条生意经","2元店持续发展","10元店的6条生意经"],
            markets:["襄樊市鞋帽批发市场","贵阳市西鞋城","襄樊市鞋帽批发市场","贵阳市西鞋城","襄樊市鞋帽批发市场","贵阳市西鞋城","襄樊市鞋帽批发市场","贵阳市西鞋城"]
        }
    }
}
</script>
<style scoped>
.footer{
    display:flex;
    border-top: 2px solid #d2364c;
    margin-top: 20px;
    padding:1rem 0;
    background-color:#303030;
}
.footer>ul{
    flex:0 0 50%;
    text-align:left;
    font-size:12px;
    color:#b1b1b1;
}
.footer ul li{
    line-height: 24px;
    padding-left:10px;
}
.footer ul li:first-child{
    font-weight: 500;
    font-size: 14px;
    color: #fff;
}
</style>