// rank.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    rankList: [],

    start: 0,

    count: 50
  
  },

  // 跳转到电影详情页
  bindMovieDetail: function(e){
    var id = e.currentTarget.id;
    app.mid = id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail'
    })
  },

  // 切换top250
  bindrankTop: function(e){
    var id = e.currentTarget.id;
    this.setData({
      start: parseInt(id.split('-')[0]),
      count: parseInt(id.split('-')[1])
    });
    this.getRankList();
  },

  // 获取top250
  getRankList: function (){

    wx.showLoading({
      title: '口碑加载中',
    });

    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      data: {
        start: that.data.start,
        count: that.data.count
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json,application/json'
      },
      success: function (res) {
        that.setData({
          rankList: res.data.subjects
        });

        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankList();
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