var io
  , httpHelper
  , Suda = (function(){
  var that = {
    load : function(__io,__httpHelper){
      if(__io && __httpHelper){
        io = __io;
        httpHelper = __httpHelper; 
        console.log('Loading Suda module success');
        return __loadModule();
      }else{
        console.log('Loading Suda module fail');
        return that;
      }
    }
  };  
  return that;
})();

var __loadModule = function(){
  var suda = io
    .of('/suda')
    .on('connection', function (socket) {
      socket.on('suda', function (data) {
        data.writtenDate = (+new Date());
        httpHelper.post('/suda/add',{
              userId  : data.id
            , message : data.msg
          },function(err,chunk){
            data.isError = !!(err);
            suda.emit('message', data);
        });
      });
    });
  return Suda;
};
module.exports = Suda;