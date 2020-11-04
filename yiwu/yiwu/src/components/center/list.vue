<template>
    <div class="list">
        <div class="title">
            <div><div></div>{{title}}</div>
        </div>
        <div class="content">
            <img :src="img">
            <p>{{sub1}}</p>
            <div>{{sub2}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:["title","img","sub1","sub2"]
}
</script>
<style scoped>
.title{
    color:#444;
    font-size:0.75rem;
    padding:0.5rem;
    text-align:left;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
}
.title div>div{
    display:inline-block;
    height:0.75rem;
    border-left: 3px solid #ed636d;
    margin:0 5px;
}
.content{
    padding:2rem 0;
}
.content img{
    width:2.75rem;
    height:2.75rem;
}
.content p{
    color:#b7b7b7;
    font-size:1rem;
    padding:0.25rem 0;
}
.content div{
    color:#ccc;
    font-size:0.75rem;
}
</style>