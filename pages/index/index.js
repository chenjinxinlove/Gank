var appInstance = getApp();
var RequestData = require('../../js/RequestData.js') ;
var IMGSRC = '';

Page({
  data:{
    popupShowData : false, 
    GankDatas:[],
    loadingHidden : false,
    modalHidden : true,
    bodyHeight : 0,
    userInfo: {},
    SearchData: " "
  },
  onLoad:function(options){
    reda(this,appInstance.globalType, appInstance.globalName);
    var that = this
    //调用应用实例的方法获取全局数据
    appInstance.getUserInfo(function(userInfo){
    //更新数据
      that.setData({
        userInfo:userInfo
     })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var _self = this;
    wx.getSystemInfo({
      success : function(res){
        _self.setData({
          "bodyHeight" : res.windowHeight
        })
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 上拉刷新
  upOnload : function(e){
    this.setData({
      "loadingHidden":false
    });
    var _self = this;
    setTimeout(function(){  
      _self.onLoad();
    },500)
    
  },
  // 下拉加载
  downOnload : function(e){
    this.setData({
        "loadingHidden":false
      });
      var oldData = this.data.GankDatas;
      var _self = this;
      setTimeout(function(){  
        redaDown(_self,appInstance.globalType ,appInstance.globalName,oldData)
      },500)
  },
  //弹出菜单
  popupMenuShow : function(){
    this.setData({"popupShowData" :! this.data.popupShowData});
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  //监听高度
  // targetHeight : function(event){
  //   var touches = event.touches[0];
  //   console.log(touches.pageY - touches.clientY)
  // },
  //保存图片
  onSavePic :function(event){
    IMGSRC = event.currentTarget.dataset.imgsrc;
    this.setData({
      "modalHidden" : false,
      "modalImgSrc" : IMGSRC
    })
  },
  //图片取消
  modalChange : function (event) {
    this.setData({
     "modalHidden" : true,
    })
  },
  modalconfirm : function (event) {
    wx.downloadFile({
      url: IMGSRC,
      type: 'image',
      success: function(res) {
        // console.log(res.tempFilePath)
      }
    })
    
  },
  // 点击不同的选项
  chuang : function(event){
        appInstance.globalName = event.currentTarget.dataset.name;
        appInstance.globalPage = 1;
        this.setData({
          "popupShowData":false,
        })
        reda(this,'common', event.currentTarget.dataset.name);
  },
  //搜索
  getSearch :function(event){
    this.setData({
      SearchData : event.detail.value
    })
  },
  search :function(){
    appInstance.globalType = 'search',
    appInstance.globalPage =1;
    var data = this.data.SearchData;
    this.setData({
         "loadingHidden":false,
        })
    if(trim(data)> 0){
        reda(this,'search',data)
    }
  },
  // 详情
  details:function(event){
     var url = event.currentTarget.dataset.src;
     console.log(url);
     wx.navigateTo({
       url:url
     })
  }

});

function reda(_self, type,value){
  RequestData.init({
      "value" : value,
      "type" : type,
      "page" : appInstance.globalPage
    },function(data){
        _self.setData({
          "GankDatas" : data,
          "loadingHidden" : true
        });
        appInstance.globalPage++;
    });
}
function redaDown(_self,type,value, oldData){
  RequestData.init({
      "value" : value,
      "type" : type,
      "page" : appInstance.globalPage
    },function(data){
      if(oldData.lenght >= 500){
        oldData = oldData.slice(-1,-500);
      }
      var newData = oldData.concat(data);
        _self.setData({
          "GankDatas" : newData,
          "loadingHidden" : true
        });
        appInstance.globalPage++;
    });
}
function trim(str) {
    return str.replace(/^(\s*)|(\s*)$/g,"");
}