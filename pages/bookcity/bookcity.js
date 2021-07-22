// pages/bookcity/bookcity.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    female:[],
    male:[],
    press:[],
    maleRank:[],
    femaleRank:[]
  },
  // 导航栏切换
  click(e){
    this.setData({
      index:e.currentTarget.dataset.index
    })
  },
  getData(){
    api.getCats().then(res=>{
      // console.log(res)
      this.setData({
        female:res.female,
        male:res.male,
        press:res.press
      })
    }).catch(err=>{
      console.log('获取大分类请求失败')
    })
  },
  // 获取排行数据
  getRank() {
    api.rankCategory().then(res => {
      // console.log(res)
      this.setData({
        maleRank:res.male.slice(0,6),
        femaleRank:res.female.slice(0,6)
      })
    }).catch(err => {
      console.log('获取排行失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
    this.getRank()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})