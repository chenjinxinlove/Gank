var PostData = require('../../js/PostData.js') ;
Page({
  data:{
    urlClass : " ",
    whoClass : " ",
    typeClass :" ",
    descClass : " ",
    addTypeDis : false,
    actionType : true,
    actionSheetItems : ['Android ','iOS','休息视频','福利','拓展资源','前端','瞎推荐','App'],
    addTypeData : "",
    callbackDesc : " ",
    toast1Hidden : true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  // 验证是否为http
  verifyHtpp : function (event){
      var value = event.detail.value;
      if(verifyHttp(value)){
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
  },
  verifyNotD : function(event){
    var value = event.detail.value;
    if(value.length === 0){
       this.setData({
            "descClass" : "descClass"
          })
    }else{
       this.setData({
            "descClass" : " "
          }) 
    }
  },

  // 类型验证
  addType : function(event){
    this.setData({
       addTypeDis : true,
       actionType :false,
    })
  },

  bindItemTap:function(e){
    this.setData({
       addTypeDis :false,
       actionType :true,
       addTypeData :e.currentTarget.dataset.name,
    })
  },

  actionSheetChange: function(e) {
    this.setData({
       addTypeDis : false,
       actionType :true,
    })
  },
  hiddenToast : function(){
      this.setData({
                toast1Hidden :true,
              })
  },
  // 表单提交
  formSubmit: function(e) {
    var _self = this;
    var valueAll = e.detail.value;
    if(verifyHttp(valueAll.url)){
      this.setData({
            "urlClass" : "urlClass"
          })
    }
    if(valueAll.who.length === 0){
      this.setData({
            "whoClass" : "whoClass"
          })
    }
    if(valueAll.type.length === 0){
      this.setData({
            "typeClass" : "typeClass"
          })
    }
    if(valueAll.desc.length === 0){
      this.setData({
            "descClass" : "descClass"
          })
    }
    if(!verifyHttp(valueAll.url) && valueAll.who.length > 0 && valueAll.type.length > 0 && valueAll.desc.length > 0){
      valueAll['debug'] = 'true';
      var options = {
        'data' : valueAll
      }
      PostData(options,function(res){
          if(res.data && !res.data.error){
               _self.setData({
                toast1Hidden :false,
                callbackDesc : res.data.msg
              })
           }else{
              _self.setData({
                toast1Hidden :false,
                callbackDesc : res.data.msg
              })
           }   
      })
    }

  },
})



function verifyHttp(value){
  var regex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
  return !regex.test(value)
}