// pages/bookshelf/bookshelf.js
import api from '../../http/api'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    books: [],
    animation: {}
  },
  // 切换编辑还是完成
  triggle() {
    this.setData({
      flag: !this.data.flag
    })
    // 添加动画
    var animation = wx.createAnimation({
      // duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    let timer=setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.translateX(1).step();
        animation.rotate(1).step()
        next = !next;
      } else {
        animation.translateX(-1).step();
        animation.rotate(-1).step()
        next = !next;
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      if (!this.data.flag) {
        this.setData({
          animation: animation.export()
        })
      }else {
        clearInterval(timer)
      }
    }.bind(this), 300)
  },
  // 帮助
  help() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 点击进入详情
  goDetail(e){
    wx.navigateTo({
      url: `/pages/detail/detail?book_id=${e.currentTarget.dataset.item._id}`,
    })
  },
  // 删除收藏书籍
  close(e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.books
    list.splice(index, 1)
    this.setData({
      books:list
    })
    wx.setStorageSync('booksHistory', list)
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
    this.setData({
      books: utils.getHistory({
        key: 'books'
      })
    })
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