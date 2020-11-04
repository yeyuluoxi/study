const express=require('express');
const router=express.Router();
const pool=require('../pool.js');

const fs = require('fs');
const multer = require('multer');
const uuid = require('uuid');

//修改头像 *
router.post('/avatar',(req,res)=>{
	let obj=req.body;
	let uname=obj.uname,iname=obj.iname,image=obj.image;
	pool.query('select avatar from yw_user where uname =?',[uname],(err,result)=>{
		if(err) throw err;
		let old=result[0].avatar;
		let newpath='./public/img/avatar/'+iname;
		if(old){
			newpath='./public'+old;
		}else{
			pool.query("update yw_user set avatar=? where uname=?",['/img/avatar/'+iname,uname],(err,result)=>{
				if(err) throw err;
			})
		}
		fs.rename('./public'+image,newpath,err=>{if(err) throw err});
		res.send(old||'/img/avatar/'+iname);
	})
});


//获取头像 *
router.get("/avatar",(req,res)=>{
	pool.query('select avatar from yw_user where uname = ?',[req.query.uname],(err,result)=>{
		if(err) throw err;
		res.send(result[0].avatar);
	})
})


const store=multer.diskStorage({
	destination:function(req,file,cb){
		let path='./public/image';
		if(!fs.existsSync(path)){
			fs.mkdirSync(path,(err)=>{
			  throw err;
			});
		}
		cb(null,path);
	},
	filename:function(req,file,cb){
		let filename=file.originalname;
		let ex=filename.substr(filename.lastIndexOf('.')).toLowerCase();
		filename=uuid.v1()+ex;
		cb(null,filename);
	}
})
const image=multer({storage:store})

//临时存储头像 *
router.post("/image",image.single("image"),(req,res)=>{
	let path=req.file.path;
	res.send(path.replace('public',""));
})


//注册 *
router.post('/reg',(req,res)=>{
	let aname=req.body.uname;
	pool.query('select uid from yw_user where uname=?',[aname],(err,result)=>{
		if(err) throw err;
		if (result.length){
			res.send({"code":"201","msg":"该号码已注册"});
		}else{
			pool.query('insert into yw_user set ?',[req.body],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows){
					res.send({"code":"200","msg":"注册成功"});
				}
			});
		}
		
	});
})

//登录 *
router.post('/signin',(req,res)=>{
	let obj=req.body;
	pool.query('select uid from yw_user where uname=?',[obj.uname],(err,result)=>{
		if(err) throw err;
		if(!result.length){
			res.send({"code":"401","msg":"用户不存在"});
		}else{
			pool.query('select uid from yw_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
				if(err) throw err;
				if (result.length){
					res.send({"code":"200","msg":"登录成功"});
				}else{
					res.send({"code":"301","msg":"用户名或密码错误"});
				};
			});
		}
	});

});


module.exports=router;