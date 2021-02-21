const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

app.post('/uploadContent', (req, res) => {
    let fileData = req.body.file.data;
    let fileName = req.body.file.name;
    let buf = Buffer.from(fileData, 'base64');

    fs.writeFile(path.join(__dirname, '/files/', fileName), buf, (error) => {
        if(error) {
            throw error;
        }

        else {
            console.log(`File ${fileName} written!`);
            res.send({message: "success"});
        }
    });
});

app.listen(8090);

http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, '/files/', req.url), (err, data) => {
        if(err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
        }

        else {
            res.writeHead(200);
            res.end(data);
        }
    });
}).listen(8080);