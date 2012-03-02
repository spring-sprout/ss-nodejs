var Suda = module.exports = (function(){
  var io
    , httpClient
    , SSWebOpts
    , querystring = require('querystring')
    , that = {
      
    configure : function(opts){
      if(opts){
        io = opts.io;
        httpClient = opts.httpClient;
        SSWebOpts  = opts.SSWebOpts; 
      }
      return that;
    },
    
    init : function(opts){
      if(io && httpClient){
        that.loadSuda();
        console.log('load suda module');
      }else{
        console.log('Failed load suda module');
      }
      return that;
    },
    
    loadSuda : function(){
      var suda = io
        .of('/suda')
        .on('connection', function (socket) {
          socket.on('suda', function (data) {
            data.writtenDate = (+new Date());
            that.httpRequest('/suda/add',function(err){
              data.isError = !!(err);
              suda.emit('message', data);
            },'post',  querystring.stringify({
                  userId  : data.id
                , message : data.msg
              })
            );
          });
        });
      },
      
      httpRequest : function(url, callback, method, postData){
        var req = httpClient.request(that.getHttpOptions(url,method,postData),function(res){
              res.on('data', function (chunk) {
                callback();
              });
              res.on('error',function(e){
                callback(e);
                console.log('problem with request: ' + e.message);
              });
        });
        if(postData){
          req.write(postData);
        }
        req.end();
        return req;
      },
      
      getHttpOptions : function(path,method,postData){
        var opts    = SSWebOpts;
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