var io = require('socket.io').listen(8888);

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.on('message', function(data){
            console.log(data);
        });

        socket.on('chat', function(data){
            chat.emit('message', data);
        });

        socket.on('getIn', function(data){
            chat.emit('message', data);
            console.log(data);
        });

        socket.emit('message', { who: 'springsprout', msg: '방가방가' });
    });

var news = io
    .of('/news')
    .on('connection', function (socket) {
        socket.emit('item', { news:'item' });
    });