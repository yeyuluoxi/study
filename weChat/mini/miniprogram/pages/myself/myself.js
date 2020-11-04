Page({
    data: {
        order:[
            {title:"待付款","img":"../../images/waittopay.png"},
            {title:"待发货","img":"../../images/waittosend.png"},
            {title:"待收货","img":"../../images/accept.png"},
            {title:"评价","img":"../../images/comments.png"},
            {title:"退款/售后","img":"../../images/after.png"}
        ],
        config:["客服聊天","收货地址","赠品","个人信息","账号设置"],
        uname:wx.getStorageSync("uname"
        )||"",
        avatar:wx.getStorageSync("avatar"
        )||""
    },
    getinfo(){
        wx.getUserInfo({
            success:res=>{
                let {nickName,avatarUrl}=res.userInfo;
                wx.setStorageSync("uname",nickName);
                wx.setStorageSync("avatar",avatarUrl);
                this.setData({
                    uname:nickName,
                    avatar:avatarUrl
                })
            }
        })
    }

})