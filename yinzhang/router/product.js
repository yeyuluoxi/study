const express=require('express');
const router=express.Router();
const pool=require('../pool.js');

//轮播图 *
router.get("/carousel",(req,res)=>{
	pool.query("select img from yz_index_carousel",[],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//分类 *
router.get("/type",(req,res)=>{
	pool.query("select fir,fname,sname,sec,tname from yz_product_type1 left outer join yz_product_type2 on fpt=fir left outer join yz_product_type3 on spt=sec",[],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//公司 *
router.get("/company",(req,res)=>{
	
	pool.query("select cname,cimg from yz_company limit 0,5",(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//公司图片 *
router.get("/company/pic",(req,res)=>{
	pool.query("select cimg from yz_company where cname=?",[req.query.cname],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//热销 *
router.get("/hot",(req,res)=>{
	pool.query("select pid,title,pic,s_price,l_price,company,sale,sales from yz_product order by sales desc limit 0,5",(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//首页 *
router.get("/index",(req,res)=>{
	let obj=req.query.type;
	pool.query("select pid,title,pic,s_price,l_price,sale,company,listtype from yz_product where listtype=? limit 0,8",[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//查询数量 *
router.get("/search",(req,res)=>{
	let obj=req.query.message;
	obj=`%${obj}%`;
	pool.query("select count(pid) from yz_product where listtype like ?",[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
router.get("/search3",(req,res)=>{
	let obj=req.query.message;
	obj=`%${obj}%`;
	pool.query("select count(pid) from yz_product where listtype3 like ?",[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//当前页面查询 *
router.get("/search/page3",(req,res)=>{
	let obj=req.query;
	let message=obj.message,page=obj.page;
	message=`%${message}%`;
	page=(page-1)*10;
	pool.query("select pid,title,pic,s_price,l_price,sale,company,listtype from yz_product where listtype3 like ? limit ?,10",[message,page],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
router.get("/search/page",(req,res)=>{
	let obj=req.query;
	let message=obj.message,page=obj.page;
	message=`%${message}%`;
	page=(page-1)*10;
	pool.query("select pid,title,pic,s_price,l_price,sale,company,listtype from yz_product where listtype like ? limit ?,10",[message,page],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})


//商品详情 *
router.get('/details',(req,res)=>{
	let b=req.query.pid;
	pool.query('select pid,title,pic,mpic,intr,s_price,l_price,sale,company,lastcount from yz_product where pid=?',[b],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//购物车数量
router.get("/shopcar/count",(req,res)=>{
	let obj=req.query.uname;
	pool.query("select count(sid) from yz_shopcar where username=?",[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

//购物车删除 *
router.get('/delete',(req,res)=>{
	let b=req.query.sid;
	pool.query('delete from yz_shopcar where sid=?',[b],(err,result)=>{
		if(err) throw err;
		res.send({"code":"200"});
	});
});

//购物车更改 *
router.get('/update',(req,res)=>{
	let b=req.query;
	pool.query('update yz_shopcar set ? where shid=?',[b,b.shid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows){
			res.send({"code":"200"});
			return ;
		}
		res.send({"code":"201"});
	});
});

//购物车添加 *
router.get('/insert',(req,res)=>{
	let b=req.query;
	pool.query('insert into yz_shopcar set ?',[b],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows){
			res.send({"code":"200"});
		}
	});
});

//购物车查询 *
router.get('/shopcar',(req,res)=>{
	let b=req.query.uname;
	pool.query('select sid,shid,buy,pid,company,sale,pic,title,lastcount,s_price from yz_shopcar left outer join yz_product on pid=shid where yz_shopcar.username=?',[b],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

module.exports=router;