// pages/hots/hots.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week_id: '',
    month_id:'',
    total_id:'',
    // 为了得到导航的名称
    ranking: {},
    // 书籍显示列表
    list: [],
    imgurl: api.STATIC_HOST,
    item:{},
    currentIndex:0,
  },
  // 切换导航栏
  click(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
    })
    this.getData(e.currentTarget.dataset.id)
  },
  // 得到周榜的数据
  getData(id) {
    api.rankInfo(id).then(res => {
      // console.log(res)
      this.setData({
        ranking: res.ranking,
        list: res.ranking.books,
      })
      // 导航名称
      wx.setNavigationBarTitle({
        title: res.ranking.title,
      })
    }).catch(err => {
      console.log('排行详情获取失败')
    })
  },
  // 跳转详情
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?book_id=${e.currentTarget.dataset.item._id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item)
    this.setData({
      week_id: item._id,
      month_id:item.monthRank,
      total_id:item.totalRank
    })
    this.getData(this.data.week_id)
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