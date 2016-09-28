Page({
  data:{
    urlClass : " ",
    whoClass : " ",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  // 验证是否为http
  verifyHtpp : function (event){
      var value = event.detail.value;
      var regex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
      if(!regex.test(value)){
         this.setData({
            "urlClass" : "urlClass"
          })
        
      }else{
         this.setData({
            "urlClass" : " "
          }) 
      }
  },
  // 验证不能为空
  verifyNotK : function(event){
    var value = event.detail.value;
    if(value.length === 0){
       this.setData({
            "whoClass" : "whoClass"
          })
    }else{
       this.setData({
            "whoClass" : " "
          }) 
    }
  }
})