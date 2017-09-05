// search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    searchStr : '',

    movieList : [],

    hotTagList: ['敦刻尔克', '战狼2', '蜘蛛侠', '正义联盟', '复仇者联盟', '爱情']
  
  },

  bindSearch: function(e){
    this.setData({
      searchStr: e.currentTarget.id
    });
    this.searchMovie();
  },

  // 跳转到首页
  bindViewIndex: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },

  // 跳转到电影详情页
  bindViewMovie: function(e){
    var id = e.currentTarget.id;
    app.mid = id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail'
    })
  },

  // 搜索事件
  bindinputSearch: function(e){
    this.setData({
      searchStr: e.detail.value
    });
    this.searchMovie();
  },

  // 搜索
  searchMovie: function(){
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/search',
      data: {
        q: that.data.searchStr
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json,application/json'
      },
      success: function (res) {
        that.setData({
          movieList: res.data.subjects
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({ title: '电影搜索' });
    
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