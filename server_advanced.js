var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    server;
var ws_client = http.createClient(7525, "localhost");
server = http.createServer(function(req, res) {
    // your normal server code
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('<h1>Hello! Try the <a href="/index.html">Socket.io Test</a></h1>');
            res.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function(err, data) {
                if (err) return send404(res);
                res.writeHead(200, {
                    'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'
                })
                res.write(data, 'utf8');
                res.end();
            });
            break;
        default:
            send404(res);
    }
}),

send404 = function(res) {
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);

var io = require('socket.io').listen(server);
var users = [];
io.sockets.on('connection', function(socket) {
    console.log("Connection " + socket.id + " accepted.");
    socket.emit('register', {
        sid: socket.id
    });
    socket.on('message', function(message) {
        console.log("Received message: " + message + " - from client " + socket.id);
    });
    socket.on('tran user info', function(userinfo) {
        var is_find = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i]["uid"] == userinfo.uid) {
                is_find = true;
                users[i] = userinfo;
                break;
            }

        }
        if (!is_find) {
            users[users.length] = userinfo;

        }
        console.log("Received userinfo uid is: " + userinfo.uid + " and sid is " + userinfo.sid);
    });
    var recursive = function() {
        var request = ws_client.request("GET", "/Message/Notify", {});

        request.addListener("response", function(response) {
            var body = "";
            response.addListener("data", function(data) {
                body += data;
            });

            response.addListener("end", function() {
                var messages = JSON.parse(body);
                if (messages.length > 0) {
                    for (var i = 0; i < messages.length; i++) {

                        var uid = messages[i].uid;
                        for (var j = 0; j < users.length; j++) {

                            if (uid&&uid == users[j].uid) {
                                //这里发出事件调用
                                var sid=users[j].sid;
                                console.log("sid is " + sid);
                                var msg_num=messages[i].msg_num;
                                console.log("msg_num is " + msg_num);
                                io.sockets.socket(sid).emit('notify', {
                                    notifymsg: "the count is " + msg_num
                                });
                                break;
                            }
                        }


                    }

                }
            });
        });

        request.end();
        //console.log("It has been one second!");
        setTimeout(recursive, 5000);
    }
    recursive();
    io.sockets.socket(socket.id).emit('notify', {
        notifymsg: "welcome " + socket.id + " from server"
    });
    socket.on('disconnect', function() {
        console.log("Connection " + socket.id + " terminated.");
    });
});