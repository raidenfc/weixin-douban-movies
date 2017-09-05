// movieDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  //　跳转影人详情页
  viewMovieMan: function (e) {
    var id = e.currentTarget.id;
    app.mid = id;
    wx.redirectTo({
      url: '../movieMan/movieMan'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    });

    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + app.mid,
      data: {
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json,application/json'
      },
      success: function (res) {

        // 没找到影片
        if(res.data.code == 5000){
          wx.showToast({
            title: '没找到影片',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index'
            })
          },1000);
        }
        
        //找到影片
        else{
          that.setData({
            detail: res.data
          });

          wx.setNavigationBarTitle({ title: res.data.title });

          wx.hideLoading();
        }
      }
    });
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