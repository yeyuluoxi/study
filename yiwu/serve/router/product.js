const express=require('express');
const router=express.Router();
const pool=require('../pool.js');

//test
router.get("/test",(req,res)=>{
	console.log(req.query);
	res.send({"code":"200"})
})
router.post("/test",(req,res)=>{
	console.log(req.body);
	res.send({"code":"201"})
})

//轮播图 *
router.get("/banner",(req,res)=>{
	pool.query("select img from yw_banner",(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//分类页面 *
router.get("/type",(req,res)=>{
	pool.query("select groupid,gname,yid,yname from yw_product_classify as a left outer join yw_product_group as b on a.groupid=b.gid",(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//商品详情 *
router.get('/details',(req,res)=>{
	let b=req.query.pid;
	pool.query('select pid,title,pic,pics,intr,price,lowest,sales,stock,readtimes from yw_product where pid=?',[b],(err,result)=>{
		if(err) throw err;
		res.send(result[0]);
	});
});


//热销 *
router.get("/hotsales",(req,res)=>{
	pool.query('select pid,title,pic,price,sales from yw_product order by sales desc limit 0,8',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//首页分类 *
router.get('/group',(req,res)=>{
	pool.query('select gid,gname,img,color from yw_product_group limit 0,8',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//首页商品 *
router.get("/index",(req,res)=>{
	let obj=req.query.gid;
	pool.query('select pid,title,pic,price from yw_product as a left join yw_product_classify as b on a.classifyid=b.yid where b.groupid= ? order by sales desc limit 0,8',[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//搜索
router.get("/search",(req,res)=>{
	let obj=req.query;
	let arr=Object.keys(obj);
	let count=0;
	let countsql=arr.reduce((prev,elem)=>{
		let txt=obj[elem];
		switch(elem){
			case 'gid':
				if(txt){
					prev+=` as a left join yw_product_classify as b on b.yid=a.classifyid where b.groupid=${txt}`;
				}
				break;
			case 'title':
				if(txt){
					prev+=` where title like '%${txt}%'`;
				}
				break;
			case 'yid':
				if(txt){
					prev+=` where classifyid=${txt}`;
				}
				break;
			case 'either':
				if(txt!==''){
					if(prev.indexOf("where")+1){
						prev+=` and either=${txt}`;
					}else{
						prev+=` where either=${txt}`;
					}
				}
				break;
			default:
				break;
		}
		return prev;
	},"select count(pid) as count from yw_product");
	
	let sql=countsql.replace("count(pid) as count","pid,title,pic,price");
	if(obj['orderby']){
		sql+=` order by ${obj['orderby']} ${obj['order']}`;
	}
	sql+=` limit ${obj['page']*6-6},6`;
	pool.query(countsql,(err,result)=>{
		if(err) throw err;
		count=result[0].count;
		
		if(count){
			pool.query(sql,(err,result)=>{
				if(err) throw err;
				res.send({count,result});
			})
		}else{
			res.send({count,result:[]});
		}
	})
});


//个人中心购物车
router.get("/center",(req,res)=>{
	pool.query("select pid,buy,title,pic,price from yw_product as a left join yw_shopcar as b on b.prid=a.pid where b.username=? order by b.sid desc limit 0,3",[req.query.username],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//更新购物车
router.get("/updatecar",(req,res)=>{
	let obj=req.query;
	pool.query("update yw_shopcar set ? where sid=?",[obj,obj.sid],(err,result)=>{
		if(err) throw err;
		res.send({"code":"200","msg":"修改成功"});
	})
})


//加入购物车
router.get("/addcar",(req,res)=>{
	let obj=req.query;
	let pid=obj.prid,aname=obj.username;
	pool.query("select sid,buy from yw_shopcar where prid=? and username=?",[pid,aname],(err,result)=>{
		if(err) throw err;
		if(result.length){
			let sid=result[0].sid,buy=result[0].buy;
			buy+=obj.buy;
			pool.query("update yw_shopcar set buy=? where sid=?",[buy,sid],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows){
					res.send({"code":"200","msg":"修改成功"});
				}
			})
		}else{
			pool.query("insert into yw_shopcar set ?",[obj],(err,result)=>{
				if(err) throw err;
				res.send({"code":"200","msg":"添加成功"});
			})
		}
	})
	
})

//移出购物车
router.get("/del",(req,res)=>{
	pool.query("delete from yw_shopcar where sid=?",[req.query.sid],(err,result)=>{
		if(err) throw err;
		res.send({"code":"200","msg":"删除成功"});
	})
})

//获取购物车列表
router.get("/shopcar",(req,res)=>{
	let aname=req.query.uname;
	pool.query("select sid,pid,buy,title,pic,price,lowest,stock from yw_product as a left join yw_shopcar as b on b.prid=a.pid where b.username=?",[aname],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//查询购物车数量
router.get("/count",(req,res)=>{
	pool.query("select count(sid) as count from yw_shopcar where username=?",[req.query.uname],(err,result)=>{
		if(err) throw err;
		res.send({"count":result[0].count});
	})
})

module.exports=router;