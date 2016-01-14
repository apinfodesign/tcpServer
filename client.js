var net = require('net');

function createClient(callback){

	var client = net.connect( { port: 8080 }, function () { 
   		console.log('CLIENT SAYS connected to server!');
  		console.log('CLIENT sending message via write');
   		client.write('Client Message To Server\r\n');  //msg to server
	});
	
	client.on('data', function(data){
  		console.log('CLIENT receives', data.toString());
  		client.end();
	});

	client.on('end', () => {
  		console.log('CLIENT receives msg.- server stopped');

  		callback();
	});
}

console.log(createClient, " is createClient");
module.exports=createClient;