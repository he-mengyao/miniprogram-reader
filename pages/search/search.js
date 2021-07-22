// pages/search/search.js
import api from '../../http/api'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    // 输入的内容
    value: '',
    hotWords: [],
    // 搜索热词背景颜色
    color: '',
    searchList: [],
    // 搜索历史
    searchHistory: [],
    page: 0,
    total: 0,
  },
  // 获取相关书籍信息
  getbookSearch() {
    api.bookSearch(this.data.value, this.data.page).then(res => {
      res.books.map(item => {
        item.cover = api.STATIC_HOST + item.cover
      })
      this.setData({
        searchList: this.data.searchList.concat(res.books),
        total: res.total
      })
    }).catch(err => {
      console.log('书籍搜索失败')
    })
  },
  // 输入框输入
  bindKeyInput(e) {
    if (e.detail.value) {
      this.setData({
        flag: true,
      })
    } else {
      this.setData({
        flag: false,
      })
    }
  },
  // 按钮完成
  bindconfirm(e) {
    this.setData({
      searchList: [],
      value: e.detail.value.trim()
    })
    if (e.detail.value.trim()) {
      this.getbookSearch()
      this.saveHistory(e.detail.value.trim())
      this.getHistory()
    } else {
      wx.showToast({
        title: '内容填写有误，请重新填写',
        duration: 1000,
        icon: 'none'
      })
    }
  },
  // 关闭搜索
  close() {
    this.setData({
      flag: false,
      value: '',
      searchList: []
    })
  },
  // 获取搜索热词
  getData() {
    api.hotWord().then(res => {
      let rgbList = []
      for (var i = 0; i <= 7; i++) {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        rgbList.push(`rgb(${r},${g},${b})`)
      }
      // 热词打乱排序   
      let hotword = res.hotWords
      hotword = hotword.map((item, index) => {
        let num1 = Math.floor(Math.random() * res.hotWords.length)
        return hotword[num1]
      })
      // 复杂类型去重
      // let arr = [{name:'小明'},{name:'小芳'},{name:'小明'},{name:'小芳'},{name:'小王'},{name:'小芳'}]
      // arr= arr.filter((item,index,self)=>{
      //   let arr1=[]
      //   arr.map((item1,index1)=>{
      //     arr1.push(item1.name)
      //   })
      //   return arr1.indexOf(item.name)===index
      // })
      // console.log(arr)
      // 简单类型去重,两种方法都可以
      // hotword = Array.from(new Set(hotword))
      hotword = [...new Set(hotword)]
      this.setData({
        hotWords: hotword,
        color: rgbList
      })
    }).catch(err => {
      console.log('获取搜索热词失败')
    })
  },
  // 换一换
  trigger() {
    this.getData()
  },
  // 点击热词
  clickHots(e) {
    this.setData({
      value: e.currentTarget.dataset.item,
      flag: true,
    })
    this.getbookSearch()
    this.saveHistory(e.currentTarget.dataset.item)
    this.getHistory()
  },
  // 保存搜索记录到本地
  saveHistory(name) {
    let list = this.data.searchHistory
    list.push({
      'name': name
    })
    utils.saveHistory({
      key: 'search',
      data: name,
      attr: 'name'
    })
    this.setData({
      searchHistory: list
    })
  },
  // 点击跳到详情
  goDetail(e) {
    // console.log(e.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: `/pages/detail/detail?book_id=${e.currentTarget.dataset.item._id}`,
    })
  },
  // 清空
  empty() {
    this.setData({
      searchHistory: []
    })
    wx.removeStorageSync('searchHistory')
  },
  // 获取搜索历史
  getHistory() {
    let arr = utils.getHistory({
      key: 'search'
    })
    if (arr) {
      this.setData({
        searchHistory: arr
      })
    }
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
    this.getHistory()

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
    if (this.data.total > this.data.searchList.length&&(this.data.searchList.length>0)) {
      this.setData({
        page: ++this.data.page
      })
      this.getbookSearch(this.data.value)
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})