const {
  default: api
} = require("../../http/api")

// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: '',
    // 热门导航栏
    type: 'hot',
    major: '',
    // 全部导航栏(小类)
    minor: '',
    size: 1,
    // 一层导航，包含热门
    list: [{
        title: '热门'
      },
      {
        title: '新书'
      }, {
        title: '好评'
      }, {
        title: '完结'
      }, {
        title: 'VIP'
      },
    ],
    // 二层导航分类
    list1: [],
    currentindex: 0,
    // 二级导航索引
    currentindex1: 0,
    itemList: [],
    imgurl: api.STATIC_HOST,
    // 书本总数
    total: 0
  },
  // 切换热门
  trigger(e) {
    switch (e.currentTarget.dataset.title) {
      case '热门':
        this.setData({
          type: "hot",
        })
        break
      case '新书':
        this.setData({
          type: "new",
        })
        break
      case '好评':
        this.setData({
          type: "reputation",
        })
        break
      case '完结':
        this.setData({
          type: "over",
        })
        break
      case 'VIP':
        this.setData({
          type: "monthly",
        })
        break
    }
    this.setData({
      currentindex: e.currentTarget.dataset.index,
    })
    this.getCatsBooks(this.data.type, this.data.minor, this.data.size)
  },
  // 切换全部
  trigger1(e) {
    if (e.currentTarget.dataset.title === '全部') {
      this.setData({
        currentindex1: e.currentTarget.dataset.index,
        minor: ""
      })
    } else {
      this.setData({
        currentindex1: e.currentTarget.dataset.index,
        minor: e.currentTarget.dataset.title
      })
    }
    this.getCatsBooks(this.data.type, this.data.minor, this.data.size)
  },
  // 获取二类导航
  getMinor() {
    let sex = this.data.gender
    api.getMinor().then(res => {
      // console.log(res)
      // 先添加，再赋值
      let result = res[this.data.gender]
      let obj = {}
      obj = result.find(item => {
        return item.major === this.data.major
      })
      let subnav = []
      if (obj.mins.length > 0) {
        subnav.unshift("全部")
        obj.mins.map(item => {
          subnav.push(item)
        })
        this.setData({
          list1: subnav
        })
      }
    }).catch(err => {
      console.log('小类获取失败')
    })
  },
  // 获取分类书籍
  getCatsBooks(type, minor, size) {
    this.setData({
      itemList: []
    })
    api.getCatsBooks(this.data.gender, type, this.data.major, minor, size).then(res => {
      res.books.map(item => {
        item.cover = this.data.imgurl + item.cover
      })
      this.setData({
        itemList: res.books,
        total: res.total
      })
    }).catch(err => {
      console.log('分类书籍获取失败')
    })
  },
  // 下拉加载
  getCatsBooks1(type, minor, size) {
    api.getCatsBooks(this.data.gender, type, this.data.major, minor, size).then(res => {
      // console.log(res)
      res.books.map(item => {
        item.cover = this.data.imgurl + item.cover
      })
      this.setData({
        itemList: this.data.itemList.concat(res.books),
        total: res.total
      })
    }).catch(err => {
      console.log('分类书籍获取失败')
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
    if (options.gender === '男生') {
      this.setData({
        gender: 'male'
      })
    } else if (options.gender === '女生') {
      this.setData({
        gender: 'female'
      })
    } else {
      this.setData({
        gender: 'press'
      })
    }
    this.setData({
      major: options.type
    })
    wx.setNavigationBarTitle({
      title: options.type,
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
    this.getMinor()
    this.getCatsBooks(this.data.type, this.data.minor, this.data.size)
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
    if (this.data.itemList.length < this.data.total) {
      this.setData({
        size: ++this.data.size
      })
      this.getCatsBooks1(this.data.type, this.data.minor, this.data.size)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})