var port       = process.env.APP_PORT||8888
  , io         = require('socket.io').listen(port)
  , httpClient = require('http')
  , chat       = require('./modules/chat')
  , SSWebOpts  = {
        host : process.env.SS_WEB_HOST||'localhost'
      , port : process.env.SS_WEB_PORT||80
    };
    
io.configure(function(){
  io.set('log level', 0);
  io.set('transports', [
      'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
  ]);
});
  
chat.configure({
    io : io
  , httpClient : httpClient
  , SSWebOpts  : SSWebOpts
}).init();
console.log('Server start... port['+port+']');
console.log('springsprout server host ['+SSWebOpts.host+']');
console.log('springsprout server port ['+SSWebOpts.port+']');
