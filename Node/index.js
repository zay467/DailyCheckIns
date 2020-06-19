// const Person = require('./person.js'); //Common JS
// // import Person from './person.js'); Es6
// const p = new Person("John Doe",30);
// p.greeting();


// Logger
// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('message',data => console.log('Called Listener',data));

// logger.log("Hello World");

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         if (err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     });
    // }
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         if (err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     });
    // }
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name : "bob",age : 40},
    //         {name : "John",age : 20}
    //     ];
    //     res.writeHead(200,{'Content-Type':'text/html'});
    //     res.end(JSON.stringify(users));
    // }


    // Build file path
    let filepath = path.join(__dirname,"public",req.url === "/" ? 'index.html' : req.url);
    console.log(filepath);

    // Extension of the file
    let ext = path.extname(filepath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch (ext) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    // Read File
    fs.readFile(filepath,(err,content)=>{
        if(err){
            if (err.code == "ENOENT"){
                // Page note found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                    res.writeHead(200,{'Content-type':"text/html"});
                    res.end(content,'utf8')
                });
            }else{
                // Some server error
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`);
            }
        }else {
            // Success
            res.writeHead(200,{'Content-Type':contentType});
            res.end(content,'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
