const http = require('spdy');
const logger = require('morgan');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(logger('dev'));

app.get('/', (request, response) => {
	response.send('YAY! HTTP/2');
});

app.get('/test', (request, response) => {
	var stream = response.push('/main.js', {
		status: 200,
		method: 'GET',
		request: {
			accept: '*/*'
		},
		response: {
			'content-type': 'application/javascript'
		}
	});

	stream.on('error', () => {
		console.log('Error')
	});

	stream.end('alert("hello from push stream!");');
	res.end('<script src="/main.js"></script>');

});

var options = {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt')
}

http
	.createServer(options, app)
	.listen(9081, () => {
		console.log('Running on 9081');
	});