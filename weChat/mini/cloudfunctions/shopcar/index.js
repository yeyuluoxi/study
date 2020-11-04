// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db=cloud.database();
    let { uname } =event;
    let $ = db.command.aggregate;
    return await db.collection('shopcar').aggregate().match({uname})
    .lookup({
        from: "product",
        localField: "pid",
        foreignField: "pid",
        as: "car"
    })
    .replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$car', 0]), '$$ROOT' ])
    })
    .project({
        car:0,
        _id:0,
        sales:0,
        cid:0,
        imgs:0,
        details:0,
        uname:0
    })
    .end()
    .then(res =>res)

}