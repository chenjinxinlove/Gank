var options = "";
var rootUrl = 'http://gank.io/api/';
var jonit = {
    "common" : function (options){
        return encodeURI(rootUrl + "data/" + options.value + "/" + options.num + '/' + options.page);
    },
    "search" : function (options){
        return encodeURI(rootUrl + "search/query/" + options.value + "/category/Android/count/"+ options.num +"/page/"+options.page); 
    }
}

var runjonit = function(options){
    return jonit[options.type](options);
}


var RequestData = function(){

};

RequestData.prototype.init = function(option, callback){
    var _self = this;
    var _options = {
        "type" : "common",
        "page" : '1',
        "num"  : '10'
    }
    for(var key in option){
        _options[key] = option[key];
    }
    options = _options;
    this._requestD(runjonit(options), function(res){
            if(res.data && res.data.results){
                _self._handleData(res.data.results, callback)
            }
    })
    
}

RequestData.prototype._handleData = function(data, callback){
    var callData = [];
    data.forEach(function(value, index, arr){
        var d = {};
        d.desc = value.desc;
        d.url = value['url'].replace("//ww", "//ws");
        d.publishedAt = value['publishedAt'].split("T")[0];
        callData.push(d);
    })
    callback(callData);
}

RequestData.prototype._requestD = function(url, callback){
    wx.request({
        url : url,   
        header: {
            'Content-Type': 'application/json'
        },
        success : callback,
    })
}

module.exports = new RequestData();