const express=require('express');
const app=express();
const user=require('./router/user.js');
const product=require('./router/product.js');
const bodyParser=require('body-parser');

app.listen(6060);
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));

const cors=require("cors");
app.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8080','http://localhost:8081','http://127.0.0.1:8081'],  //指定接收的地址
    methods:['GET','POST'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}));

app.use('/product',product);
app.use('/user',user);