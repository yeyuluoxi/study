// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async () => {
    let group=[];
    await db.collection("group").field({
        _id:false,
        gid:true,
        img:true,
        group:true
    }).get().then(res=>{
        group=res.data;
    })
    return await db.collection('class').field({
        _id:false,
        gid:true,
        img:true,
        cid:true,
        classify:true
    }).get().then(
        res=>{
            let data=res.data;
            let classify=data.reduce((prev,elem)=>{
                if(prev[elem.gid]){
                    prev[elem.gid].push(elem);
                }else{
                    prev[elem.gid]=new Array(elem);
                }
                return prev;
            },new Array(1));
            return {
                classify,
                group
            };
        }

    )
    


}