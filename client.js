var net = require('net')
var readline = require('readline-sync')

var HOST = '127.0.0.1'
var PORT = 6969

var client = new net.Socket()
client.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT)
    sendline()
})

client.on('data', function(data){
    console.log('Server-DATA: ' + data)
    sendline()
    //client.destroy()
})

client.on('close', function(){
    console.log('Connection closed')
})

function sendline(){
    var line = readline.question('DataSent: ')
    if(line == 'Thank!'){
        client.end()
    }
    else {
        client.write(line)
    }
}