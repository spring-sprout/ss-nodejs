var io
  , httpHelper
  , Chat = (function(){
  var that = {
    load : function(__io,__httpHelper){
      if(__io && __httpHelper){
        io = __io;
        httpHelper = __httpHelper; 
        console.log('Loading Chat module success');
        return __loadModule();
      }else{
        console.log('Loading Chat module fail');
        return that;
      }
    }
  };  
  return that;
})();

var __loadModule = function(){
  var chat = io
    .of('/chat')
    .on('connection', function (socket) {
      socket.on('chat', function (data) {
        chat.emit('message', data);
      });
      
      socket.on('getIn', function (data) {
        // checkin
        // httpHelper.get('/chat/in?sock=' + socket.id + '&email=' + data.email,function(err,chunk){
        //   chat.emit('refresh', {msg:'update',isError:!!(err)});
        // });
		chat.emit("message", data);
      });

      socket.on('disconnect', function () {
        // checkout
        // httpHelper.get('/chat/out?sock=' + socket.id,function(err,chunk){
        //           chat.emit('refresh', {msg:'update',isError:!!(err)});
        //         });
      });
    });
  return Chat;  
};
module.exports = Chat;