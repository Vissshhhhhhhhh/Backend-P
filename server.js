const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(`request made`);
    console.log(req.url);
    console.log(req.method);
    res.setHeader('Content-Type','text/html');
    res.write('<h1>Subscribe me</h1>');
    res.write('<h4>Subscribe me</h4>');
    res.end();
});
server.listen(5000, 'localhost',()=>{
    console.log(`Server is listening`);
});