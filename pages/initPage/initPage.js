// pages/initPage/initPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "value": 0,
    "isMaleFocus": false,
    "isFemaleFocus": false,
    styles: [{
      line: '#9e9e9e',
      bginner: '#f5f5f5',
      bgoutside: 'rgba(238,238,238,.5)',
      lineSelect: '#e91e63',
      font: '#404040'
    }]
  },

  maleFocus: function(e) {
    if(!this.data.isMaleFocus) {
      this.setData({
        "isMaleFocus": true
      })
    }
  },

  femaleFocus: function(e) {

  },

  bindValue: function(e) {
    this.setData({
      value: e.detail.value
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