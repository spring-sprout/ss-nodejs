var io = require('socket.io').listen(8888);
var httpClient = require('http').createClient(8080, 'localhost');

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
            // get into Spring
            var req = httpClient.request('GET', '/chat/in?sock=' + socket.id + '&email=' + data.email);
            req.end();
            req.on('response', function(response){
                response.on('data', function (chunk) {
//                    console.log('BODY: ' + chunk);
                    chat.emit('refresh', {msg:'update'});
                });
            });
            chat.emit('message', data);
//            console.log(data);
        });

        socket.on('disconnect', function () {
            // get into Spring
            var req = httpClient.request('GET', '/chat/out?sock=' + socket.id);
            req.end();
            req.on('response', function(response){
                response.on('data', function (chunk) {
//                    console.log('BODY: ' + chunk);
                    chat.emit('refresh', {msg:'update'});
                });
            });
        });

        socket.emit('message', { who: 'springsprout', msg: '방가방가' });
    });

var news = io
    .of('/news')
    .on('connection', function (socket) {
        socket.emit('item', { news:'item' });
    });