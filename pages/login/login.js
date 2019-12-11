// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "login_condition": true,
    "register_condition": false,
    "ac_placeholder_text": "请输入账号",
    "pwd_placeholder_text": "请输入密码",
    "acColor": "grey",
    "pwdColor": "grey",
    "loginFocus": "focus",
    "registerFocus": "",
    "ac_condition": false,
    "pwd_condition": false,
    "acValue": "",
    "seeOrNot": true,
    "seeOrNot_r1": true,
    "seeOrNot_r2": true,
    "pwd_condition_r1": false,
    "pwd_condition_r2": false,
    "windowHeight": "",
    "windowWidth": "",
  },
  
  // login & register switch
  chooseLogin: function(e) {
    this.setData({
      "login_condition": true,
      "register_condition": false,
      "loginFocus": "focus",
      "registerFocus": "",
      "ac_condition": false,
      "pwd_condition": false,
      "acValue": "",
      "seeOrNot": true,
      "seeOrNot_r1": true,
      "seeOrNot_r2": true,
      "pwd_condition_r1": false,
      "pwd_condition_r2": false
    });
  },

  chooseRegister: function(e) {
    this.setData({
      "login_condition": false,
      "register_condition": true,
      "loginFocus": "",
      "registerFocus": "focus",
      "ac_condition": false,
      "pwd_condition": false,
      "acValue": "",
      "seeOrNot": true,
      "seeOrNot_r1": true,
      "seeOrNot_r2": true,
      "pwd_condition_r1": false,
      "pwd_condition_r2": false
    });
  },

  // show del icon
  inputFocus: function(e) {
    this.setData({
      "ac_condition": true
    });
  },

  // show see icon
  pwdFocus: function(e) {
    this.setData({
      "pwd_condition": true,
    });
  },

  pwdFocus_r1: function(e) {
    this.setData({
      "pwd_condition_r1": true,
    });
  },

  pwdFocus_r2: function (e) {
    this.setData({
      "pwd_condition_r2": true,
    });
  },

  // clear input
  acClear: function(e) {
    this.setData({
      "acValue": "",
      "focus_condition": true
    });
  },

  // visible & invisible switch
  changeSee: function(e) {
    if(this.data.seeOrNot) {
      this.setData({
        "seeOrNot": false
      });
    }
    else {
      this.setData({
        "seeOrNot": true
      });
    }
  },

  changeSee_r1: function (e) {
    if (this.data.seeOrNot_r1) {
      this.setData({
        "seeOrNot_r1": false
      });
    }
    else {
      this.setData({
        "seeOrNot_r1": true
      });
    }
  },

  changeSee_r2: function (e) {
    if (this.data.seeOrNot_r2) {
      this.setData({
        "seeOrNot_r2": false
      });
    }
    else {
      this.setData({
        "seeOrNot_r2": true
      });
    }
  },

  // font-end check function（ac is only number）
  validationAct(account) {
    var RegExp = /^\d+$/;
    return RegExp.test(account);
  },

  inputValidation(ac, pwd) {
    let code = 0;

    // 判断用户账号输入是否为空
    if (ac === "") {
      this.setData({
        acValue: "",
        ac_placeholder_text: "输入账号不能为空",
        acColor: "#e91e63"
      });
      code = 1;
      return code;
    }

    // 判断用户密码输入是否为空
    if (pwd === "") {
      this.setData({
        pwdVal: "",
        pwd_placeholder_text: "输入密码不能为空",
        pwdColor: "#e91e63"
      });
      code = 1;
      return code;
    }

    // 判断用户账号输入是否包含非法字符：非数字
    if (!this.validationAct(ac)) {
      this.setData({
        acValue: "",
        ac_placeholder_text: "账号包含非法字符",
        acColor: "#e91e63"
      });
      code = 1;
      return code;
    }
    return code;
  },

  // 向服务器发送用户账号密码，实现登录验证
  Login_formSubmit: function(e) {
    var that = this;
    let account = e.detail.value.account;
    let password = e.detail.value.password;
    let res = this.inputValidation(account, password);
    if(res == 1)
      return;
    
    // font-end check finish
    // send request
    wx.request({
      url: 'http://118.31.51.167:8080/minipg/login',
      method: 'POST',
      header: {
        // 'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': account,
        'password': password
      },
      success: function (res) {
        console.log("succeed");
        console.log(res.data.code);
        // 根据res.code的值做不同的处理
        // 身份信息核实正确，wx.reLaunch页面跳转
        if (res.data.code === 0) {
          wx.showToast({
            title: '登录成功',
            icon: "success",
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../initPage/initPage?id=' + account,
                })
              }, 1000);
            }
          });
        }
        else if (res.data.code === 1) {
          // account is not found
          wx.showToast({
            title: '账号不存在',
            icon: 'none',
            image: '../element/wrong.png',
            duration: 2000
          });
          return;
        }
        else {
          // res.data.code === 2
          // pwd wrong
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            image: '../element/wrong.png',
            duration: 2000
          });
          return;
        }
      },
      fail: function () {
        console.log("fail");
      },
      complete: function () {
        console.log("completed");
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "windowHeight": res.windowHeight,
          "windowWidth": res.windowWidth
        });
      },
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