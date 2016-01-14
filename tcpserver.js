// Write a simple tcp logging server. This server should receive tcp requests and save the request into a file. Each request should be saved into it's own file and you'll have to find something unique to name them. You can use a UUID library or the current time or any other means of having unique strings that you can think of.

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