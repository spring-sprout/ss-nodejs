var HttpHelper = module.exports = (function(){
  var httpClient = require('http')
    , querystring = require('querystring')
    , sSWebOpts
    , __callback
    , that = {
    configure : function(opts){
      if(opts){
        sSWebOpts = opts;
      }else{
        console.log('springsprout web configured failed');
      }
      return that;
    },
    
    get : function(path,callback){
      that.__setCallback(callback);
      var req = httpClient.request(that.__makeHttpOpts(path,'GET'),that.__reqCallback);
      req.end();
      return that;
    },
    
    post : function(path,postData,callback){
      that.__setCallback(callback);
      var postData = querystring.stringify(postData||{})
        , req = httpClient.request(that.__makeHttpOpts(path,'POST',postData),that.__reqCallback);
      req.write(postData);
      req.end();
      return that;
    },
    
    __getCallback : function(){
      return __callback||function(){};
    },
    
    __setCallback : function(callback){
      __callback = callback;
      return that;
    },
    
    __reqCallback : function(res,callback){
      res.on('data', function (chunk) {
        that.__getCallback()(false,chunk);
      });
      res.on('error',function(e){
        that.__getCallback()(e);
        console.log('problem with request: ' + e.message);
      });
    },
    
    __makeHttpOpts : function(path,method,postData){
      var opts    = sSWebOpts;
      opts.path   = path;
      opts.method = method || 'GET';
      if(postData){
        opts.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        };
      }
      return opts;
    }
  };
  return that;
})();