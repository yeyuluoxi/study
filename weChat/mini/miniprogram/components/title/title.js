// components/title.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titles:Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        active:0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        select(e){
            this.setData({
              active:e.target.dataset.order
            })
          }
    }
})
