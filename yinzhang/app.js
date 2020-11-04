const express=require('express');
const app=express();
const user=require('./router/user.js');
const product=require('./router/product.js');
const bodyParser=require('body-parser');

app.listen(7070);
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));

app.use('/product',product);
app.use('/user',user);