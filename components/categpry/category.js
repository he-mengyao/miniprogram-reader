// components/categpry/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
    },
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSort(e){
      wx.navigateTo({
        url: `/pages/sort/sort?gender=${e.currentTarget.dataset.gender}&type=${e.currentTarget.dataset.type}`,
      })
    }
  },
  lifetimes:{
    ready(){
      // console.log(this.data.list)
    }
  }
})
