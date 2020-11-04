const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async () => {
    const db=cloud.database();
    return await db.collection("product").field({
        _id:false,
        img:true,
        price:true,
        pid:true,
        title:true
    }).orderBy("sales","desc").limit(25).get().then(res=>{
        let first=res.data.shift();
        return {
            first,
            products:res.data
        }
    })
}