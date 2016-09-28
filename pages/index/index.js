var appInstance = getApp();
var RequestData = require('../../js/RequestData.js') ;
var IMGSRC = '';

Page({
  data:{
    popupShowData : false, 
    GankDatas:[],
    loadingHidden : false,
    modalHidden : true,
  },
  onLoad:function(options){
    reda(this, '福利')
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
        console.log(res.tempFilePath)
      }
    })
    
  }

});

function reda(_self, type){
  RequestData.init({
      "value" : type,
      "page" : appInstance.globalPage
    },function(data){
        _self.setData({
          "GankDatas" : data,
          "loadingHidden" : true
        });
        appInstance.globalPage++;
    });
}
