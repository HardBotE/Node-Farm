const http=require('http');
const fs=require('fs');
const url=require('url');

const allData=fs.readFileSync(`${__dirname}/../starter-txts/starter/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(allData);

const overView=fs.readFileSync(`${__dirname}/../starter-txts/starter/templates/overview.html`,"utf-8");
const template=fs.readFileSync(`${__dirname}/../starter-txts/starter/templates/overviewTemplate.html`,"utf-8");
const productDetails=fs.readFileSync(`${__dirname}/../starter-txts/starter/templates/product.html`,'utf-8');

const replaceTemplate=((temp,product)=>
{
    let outPut=temp;
    outPut=outPut.replace(/{#PRODUCT_NAME}/g,product.productName);
    outPut=outPut.replace(/{#IMAGE}/g,product.image);
    outPut=outPut.replace(/{#LOCATION}/g,product.from);
    outPut=outPut.replace(/{#BENEFITS}/g,product.nutrients);
    outPut=outPut.replace(/{#QUANTITY}/g,product.quantity);
    outPut=outPut.replace(/{#PRICE}/g,product.price);
    outPut=outPut.replace(/{#DESCRIPTION}/g,product.description);
    outPut=outPut.replace(/{#ID}/g,product.id);
    outPut=product.organic?outPut=outPut.replace(/{#NOT_ORGANIC}/g,''):outPut=outPut.replace(/{#NOT_ORGANIC}/g,'not-organic');
    return outPut;
});


const server=http.createServer((req,res)=>{

    const {query,pathname}=url.parse(req.url,true);

    const urlPath=req.url;
    let overViewHTML=overView;

    if (urlPath === '/' || urlPath === '/about') {
        let html = '';

        const cardsHTML=dataObj.map(element=> replaceTemplate(template, element)).join('');
        console.log(cardsHTML);
        overViewHTML=overViewHTML.replace(/{#PRODUCT_CARDS}/g,cardsHTML);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(overViewHTML);
    }

    else if(pathname==='/product')
    {
        const product=dataObj[query.id];

        const cardDetails=replaceTemplate(productDetails,product);
        res.end(cardDetails);
    }


    else if(urlPath==='/api')
    {
        const data=allData;

        res.writeHead(200,{
            'Content-type':'application/json'});
        res.end(data);
    }

    else{
        res.writeHead(404,{
            'Content-type':'text/html',
        })
        res.end('<h1>Page not found!</h1>');
    }

})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000');
});