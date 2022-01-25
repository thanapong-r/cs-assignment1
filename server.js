var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var db = ["TIGER", "FISH", "BIRD", "MONKY", "GIRAFFE", "ELEPHENT", "BEAR", "SNAKE"]

net.createServer(function (sock) {
    var state = 0 //idle
    var current_key = 0
    var i
    sock.on('data', function (data) {
        switch (state) {
            case 0:
                if (data == 'Hello') {
                    console.log('fromClient:' + data)
                    sock.write('Hola')
                    state = 1 //wait for key
                    console.log('::'+ state)
                }
                break
            case 1:
                current_key = data
                for (i = 0; i < db.length; i++){
                    if(db[i] == current_key){
                        if(i==0){
                            sock.write(''+ (i+1))
                        }else{
                            sock.write('' + (i))
                        } 
                    }
                }
                state = 2 //wait for number
                console.log('::'+ state)
                break
            case 2:
                if (data == 'Thank!') {
                    sock.write('Thank!')
                    sock.close()
                    state = 3 //end                    
                } else {
                    try {
                        
                        let v = data.toUpperCase()
                        for(i=0; i < db.length; i++){
                            if (!db[i] == current_key){
                                i = 0
                                sock.write("" + i)
                            }
                        }

                        for (i = 0; i < db.length; i++) {
                            if (db[i] == v) {
                                if(i=0){
                                    sock.write("" + (i + 1))
                                }else{
                                    sock.write('' + i)
                            }
                        }
                        }
                    } catch (e) {
                        sock.write('INVALID')
                    }
                }
                break
        }
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);