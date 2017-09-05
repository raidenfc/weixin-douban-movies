//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navSc : 1,
    inTheaters : '',
    comingSoon : '',
    inTheatersList : [],
    comingSoonList : []
  },

  //　跳转影片搜索
  bindViewSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  //　跳转影片详情页
  bindViewDetail: function(e){
    var id = e.currentTarget.id;
    app.mid = id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail'
    })
  },

  // 导航切换
  navSelect: function(e){
    var id = parseInt(e.currentTarget.id);
    this.setData({
      navSc : id
    });

    if (!this.data.comingSoon){
      this.getIntheaters();
    }
  },

  //　加载更多
  lower: function(){
    this.getIntheaters();
  },

  // 获取列表
  getIntheaters: function (){
    var that = this;
    var type = that.data.navSc === 1 ? 'in_theaters' : 'coming_soon';
    var typeKey = that.data.navSc === 1 ? 'inTheaters' : 'comingSoon';
    var start = that.data[typeKey].start;
    var count = that.data[typeKey].count || 0;
    var total = that.data[typeKey].total || 10;
    // var startVal = start != undefined ? (start + 10) : 0;

    if (count < total){
      wx.showLoading({
        title: '加载中',
      });

      wx.request({
        url: 'https://api.douban.com/v2/movie/' + type,
        data: {
          city: '西安',
          start: 0,
          count: count ? (count + 10) : 10,
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json,application/json'
        },
        success: function (res) {
          var tempArr = [];

          if (that.data.navSc === 1) {
            that.setData({

              //追加数据
              inTheatersList: res.data.subjects,

              //记录页数
              inTheaters: res.data
            });
          } else {
            that.setData({

              //追加数据
              comingSoonList: res.data.subjects,

              //记录页数
              comingSoon: res.data
            });
          }

          wx.hideLoading();
        }
      })
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '热映电影' });
    this.getIntheaters();
  }
})
