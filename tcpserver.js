//based on MNelson code

const net = require('net');
const fs = require('fs');

const server = net.createServer( function(c) { 
	//'connection' listener
    
    console.log('client connected');
    
    c.on('end', () => {
        console.log('client disconnected');
    });
    
    c.write('hello');
    
    fs.createReadStream('afile.txt').pipe(c);
});

server.listen(8080, () => { //'listening' listener
    console.log('Server listening on port 8080');
});