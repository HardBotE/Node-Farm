const http=require('http')

const server=http.createServer((req,res)=>{
    if(req.url==='/')
        res.end('Ez a vege mindennek...')
    if(req.url==='/about')
        res.end('Lzia Sajos!')
    res.end(`
    <h1>Szia Baratom!</h1>
    <p>Ugy latom nagyon eltevedtel!</p>
    `)
})

server.listen(5000)
