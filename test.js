//test.js
var assert = require('assert'); 
var fs = require('fs');
var path = './results/' ;
var tcpserver = require('./tcpserver.js');
var client = require('./client.js');
var findRemoveSync = require('find-remove');

 
before(function(){
	//remove all .txt from ./results/ to clear directory
	var result = findRemoveSync('./results/', 
			{extensions: ['.txt']});
});

describe('TCP Server Tests', function(){
	//start server and client
	before(function(done) {
		console.log('tcp server started via mocha');
		//start server then client as callback of server
	 	tcpserver(function(){ 
			console.log('client started via mocha');
			client( done );
	 	});
	});

	it('creates ony one file in previously empty directory', function(done){
			fs.readdir(path, function(err, items) {
	    	for (var i=0; i< items.length; i++) {
	        	console.log(items[i]+' found in results');
	    	}
			//console.log('items[0] is: ', items[0]);
			assert.equal(
 				items.length,
 				1 	 			 
	 			)
				done();
		});
	});

	it('first file has initial 10 letter content expected', function(done){
		fs.readdir(path, function(err, items) {
			//get all filenames
	    	for (var i=0; i< items.length; i++) {
	        	console.log(items[i]+' found in results');
	    	}
			var filename =  items[0]; //select first filename		
			var filepath = path+filename; //attach to path
			fs.readFile(filepath, 'utf-8',function read(err, data) {
				if (err){ done(err);}
				else{
				var first10= data.slice(0,10);
			    	//validate that first 10 characters are correct
					assert.equal(
	 					first10,
	 					'Client Mes'	 			 
 	 				)
					done();
			    	}
			});
		});
	});
});


 
