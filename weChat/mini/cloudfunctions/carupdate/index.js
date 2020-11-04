// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
// 云函数入口函数
exports.main = async (event, context) => {
    const db=cloud.database();
    const _=db.command;
    let {uname, buy, pid}=event;
    if(buy){
        let bool="";
        await db.collection("shopcar").where({
            uname:_.eq(uname),
            pid:_.eq(pid)
        }).update({
            data:{
                buy:_.set(buy)
            }
        }).then(res=>bool=res.stats.updated);
        if(bool){
            return {code:202};
        }else{
            return await db.collection("shopcar").add({
                data:{
                    uname,buy,pid
                }
            }).then(res=>{
                return {code:201};
            })
        }
    }else{
        return await db.collection("shopcar").where({
            uname:_.eq(uname),
            pid:_.in(pid)
        }).remove().then(res=>{
            return {code:200};
        })
    }
}