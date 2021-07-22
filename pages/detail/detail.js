// pages/detail/detail.js
import api from '../../http/api'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: '',
    obj: {},
    flag: false,
    index: 0,
    // 相关推荐列表
    list: [],
    // 书架状态
    title: '加入书架',
    // 加载页数和显示多少条
    size: 20,
    page: 1,
    total: 0,
    // 评论列表
    commentList: [],
    score: 0,
  },
  // 获取详情数据
  getData() {
    api.bookInfo(this.data.book_id).then(res => {
      res.cover = api.STATIC_HOST + res.cover
      this.setData({
        obj: res,
        score: parseInt(res.rating.score / 2),
      })
    }).catch(err => {
      console.log('书籍详情请求失败')
    })
  },
  // 获取评论
  getshortReviews() {
    api.shortReviews(this.data.book_id, this.data.page, this.data.size).then(res => {
      res.docs.map(item => {
        item.author.avatar = api.STATIC_HOST + item.author.avatar
      })
      this.setData({
        total: res.total,
        commentList: this.data.commentList.concat(res.docs),
      })
    }).catch(err => {
      console.log('获取评论失败')
    })
  },
  // 点击图片预览
  openMask() {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 长按保存
  handleLongPress(e) {
    wx.showActionSheet({
      itemList: ['保存图片'],
      success(res) {
        wx.downloadFile({
          url: e.currentTarget.dataset.path, //仅为示例，并非真实的资源
          success(res) {
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: (res) => {
                  wx.showToast({
                    title: '保存成功',
                  })
                },
              })
            }
          }
        })
      },
      fail(res) {}
    })
  },
  // 切换详情和评价
  click(e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  // 上下滑动
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  // 获取相关推荐
  getrelatedRecommendedBooks() {
    api.relatedRecommendedBooks(this.data.book_id).then(res => {
      res.books.map(item => {
        item.cover = api.STATIC_HOST + item.cover
      })
      if (res.books.length >= 3) {
        let num1 = Math.floor(Math.random() * (res.books.length - 2))
        this.setData({
          list: res.books.slice(num1, num1 + 3)
        })
      } else {
        this.setData({
          list: res.books
        })
      }
    }).catch(err => {
      console.log('获取相关推荐失败')
    })
  },
  // 换一换
  trigger() {
    this.getrelatedRecommendedBooks()
  },
  // 下拉刷新评论
  bindscrolltolower(e) {
    if (this.data.commentList.length<this.data.total){
      this.setData({
        page: ++this.data.page
      })
      this.getshortReviews()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 加入书架
  add(e) {
    utils.saveHistory({
      key: 'books',
      data: e.currentTarget.dataset.item,
      attr: '_id'
    })
    this.setData({
      title: '已加入书架'
    })
  },
  // 点击相关推荐书籍，跳转详情
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?book_id=${e.currentTarget.dataset.id}`,
    })
  },
  onLoad: function (options) {
    this.setData({
      book_id: options.book_id
    })
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
    this.getrelatedRecommendedBooks()
    this.getshortReviews()
    // 进入页面，加入书架或者已加入书架判断
    let booksHistory = wx.getStorageSync('booksHistory')
    let obj1 = {}
    obj1 = booksHistory.find(item => {
      return item._id === this.data.book_id
    })
    if (obj1 !== undefined) {
      this.setData({
        title: '已加入书架'
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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