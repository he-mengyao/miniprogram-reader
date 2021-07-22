// components/rank/rank.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array
    },
    title:{
      type:String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl:api.STATIC_HOST

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goHots(e){
      wx.navigateTo({
        url: `/pages/hots/hots?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
      })
    }
  },
  lifetimes:{
    ready(){
    // console.log(this.data.imgurl)
    }
  }
})