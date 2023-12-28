var express = require('express');
var cors = require('cors')
var HTMLParser = require('node-html-parser');

var app = express();
app.use(cors())

app.get('/', async function (req, res) {
    let param = req.query.link
    console.log(param)
    // let request = await axios.get('https://theleaksbay.com/'+param)
    let request = await fetch('https://theleaksbay.com/'+param)
    const data = await request.text()

    var root = HTMLParser.parse(data)
    let body = root.querySelector('body')
    let listImg = body.querySelectorAll('img')
    for(let img of listImg){
        let src = img.getAttribute('src')
        if(src.indexOf('data:image/svg+xml') > -1){
            img.setAttribute('src', img.getAttribute('data-src'))
            img.classList.remove('lazyload')
        }

    }
    let listAnchor = body.querySelectorAll('a')
    for(let a of listAnchor){
        // console.log(a.getAttribute('href'))
        let href = a.getAttribute('href')
        if(href !== undefined && href.indexOf('https://theleaksbay.com/') > -1){
            a.setAttribute('href',(href.replace('https://theleaksbay.com/','/')))
        }
    }
    body.querySelector('#menu-item-51133').remove()
    let strReturn = body.toString().replaceAll('https://theleaksbay.com/wp-content/plugins','/wp-content/plugins')
    // strReturn = strReturn.replaceAll('https://tezfiles.com/js/preview.js','http://localhost:3000/preview.js')
    res.send({
        status:200,
        html: strReturn.toString()
    });

})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})