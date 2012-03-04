var port       = process.env.APP_PORT||8888
  , io         = require('socket.io').listen(port)
  , SSWEBOpts  = {
        host : process.env.SS_WEB_HOST||'localhost'
      , port : process.env.SS_WEB_PORT||80
    }
  , httpHelper = require('./modules/httpHelper').configure(SSWEBOpts)
  , chat       = require('./modules/chat').load(io,httpHelper)
  , suda       = require('./modules/suda').load(io,httpHelper);
    
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
console.log('Server start... port['+port+']');
console.log('springsprout server host ['+SSWEBOpts.host+']');
console.log('springsprout server port ['+SSWEBOpts.port+']');
