function tcpserver(callback){

	var net = require('net');
	var fs = require('fs');
	var server = net.createServer( function( duplexStream ) { 
		
		//'connection' listener
	    console.log('*** SERVER has client connected ***');
	    
	    duplexStream.on('end', function(){
	        console.log('Client disconnected');
	    });

	    duplexStream.on('data', function(data){

	    	console.log('Data incoming is:', data.toString());
	 		var uniqueFileID = './results/'+Date.now().toString()+'.txt';
	 		console.log('give this msg uniqueID: ', uniqueFileID);	
	 		var dataBody = data.toString()+' received on ' + 
	 			Date.now()+  " --- "  ;   		 
			fs.writeFile(uniqueFileID, dataBody)
	    });
	    duplexStream.write('*** hello ***');  //asigns value to "data"
	 });

	server.listen(8080, () => { //'listening' listener
	    console.log('Server listening on port 8080');
	    callback();
	});
}

module.exports = tcpserver;