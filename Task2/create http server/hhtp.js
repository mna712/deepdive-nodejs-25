const http = require('http')
const server =http.createServer((req,res)=>{
if(req.url === '/'){
    res.end('home page')
} else if(req.url === '/about'){
    res.end('about page')     
    
} else {
    res.end(`Page not found`)
    }
})

server.listen(3001,()=>{
    console.log('listenning on port 3001');
})
