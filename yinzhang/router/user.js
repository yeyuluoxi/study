const express=require('express');
const router=express.Router();
const pool=require('../pool.js');

//注册 *
router.post('/reg',(req,res)=>{
	pool.query('insert into yz_user set ?',[req.body],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows){
			res.send({"code":"200"});
		}
	});
})

//登录 *
router.post('/signin',(req,res)=>{
	let obj=req.body;
	pool.query('select isOnline from yz_user where uname=?',[obj.uname],(err,result)=>{
		if(err) throw err;
		if(!result.length){
			res.send({"code":"401","msg":"用户不存在"});
		}else if(result[0].isOnline){//已在线
			pool.query('select isOnline from yz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
				if(err) throw err;
				if(result.length){
					res.send({"code":"200","msg":"登录成功"});
				}else{
					res.send({"code":"301","msg":"用户名或密码错误"});
				}
			});
		}else{//未在线
			pool.query('update yz_user set isOnline=1 where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
				if(err) throw err;
				if (result.changedRows){
					res.send({"code":"200","msg":"登录成功"});
				}else{
					res.send({"code":"301","msg":"用户名或密码错误"});
				};
			})
		}
	})

});


//检查号码是否已注册 *
router.post('/checkname',(req,res)=>{
	let aname=req.body.uname;
	pool.query('select uid from yz_user where uname=?',[aname],(err,result)=>{
		if(err) throw err;
		if (result.length){
			res.send({"code":"201","msg":"该号码已注册"});
			return;
		}
		res.send({"code":"200","msg":"可以注册"});
	});
});

//退出 *
router.get('/signout',(req,res)=>{
	let aname=req.query.uname;
	pool.query('update yz_user set isOnline=? where uname=?',[0,aname],(err,result)=>{
		if(err) throw err;
		if (result.changedRows){
			res.send({"code":"200","msg":"成功退出"});
		}else{
			res.send({"code":"301","msg":"未登录"});
		}
	})
});


module.exports=router;