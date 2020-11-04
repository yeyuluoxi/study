const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db=cloud.database();
    let {cid,title}=event,_=db.command;
    if(cid){
        return await db.collection("product").field({
            _id:false,
            img:true,
            title:true,
            price:true,
            pid:true
        }).where({
            cid:_.eq(cid)
        }).get().then(res=>res.data)
    }else{
        return await db.collection("product").field({
            _id:false,
            img:true,
            title:true,
            price:true,
            pid:true
        }).where({
            title:new db.RegExp({
                regexp:title,
                options:"i"
            })
        }).get().then(res=>res.data)
    }
}