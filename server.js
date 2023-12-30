var express = require('express');
var cors = require('cors')
var HTMLParser = require('node-html-parser');

var app = express();
app.use(cors())

app.get('/', async function (req, res) {
    let param = req.query.link

    // let request = await axios.get('https://theleaksbay.com/'+param)
    let request = await fetch('https://theleaksbay.com/'+param)
    const data = await request.text()

    var root = HTMLParser.parse(data)
    let title = root.querySelector('title').text
    title = title.replace('TheLeaksBay','TheRabbit')
    let body = root.querySelector('body')

    if(param == null || param == ''){
        let listP = body.querySelectorAll('.elementor-widget-container p')
        for(let p of listP){
            console.log(p.innerHTML)
            console.log(p.innerHTML.toString().indexOf('Welcome to TheLeaksBay.com, probably the safest and best place to find if you are looking for'))
            if(p.innerHTML.toString().indexOf('Welcome to TheLeaksBay.com, probably the safest and best place to find if you are looking for') > -1){
                p.innerHTML = "Because the number of visitors is too large, my server cannot handle streaming. Onlyfan idols will have a button to download the FULL VIDEO version to their computer to watch. Have fun bro"
                console.log(p.innerText)
            }else if(p.innerHTML.toString().indexOf('Tired of viewing reddit leaks? Endless Telegram spam group or') > -1){
                p.remove()
            }else if(p.innerHTML.toString().indexOf('That is the reason why a group of buddies from Discord started') > -1){
                p.remove()
            }else if(p.innerHTML.toString().indexOf('Our website is not named TheLeaksBay for nothing! We share only ') > -1){
                p.remove()
            }
        }
    }
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
        if(href !== undefined){
            if(href.lastIndexOf('/') === href.length - 1){
                href = href.substring(0,href.length - 1)
            }
            // console.log(href)
            if(href !== undefined && href.indexOf('https://theleaksbay.com/') > -1){
                a.setAttribute('href',(href.replace('https://theleaksbay.com/','/')))
            }
        }


    }
    let listIframe = body.querySelectorAll('iframe')
    for(let iframe of listIframe){
        // console.log(a.getAttribute('href'))
        let src = iframe.getAttribute('src')
        if(src !== undefined && src == 'about:blank'){
            iframe.setAttribute('src',iframe.getAttribute('data-litespeed-src'))
        }


    }
    body.querySelector('#menu-item-51133').remove()
    let logo = body.querySelector('img[src="https://theleaksbay.com/wp-content/uploads/theleaksbay.com-logo.png"]')
    logo.setAttribute('src','https://therabbit.org/wp-content/uploads/theleaksbay.com-logo.png')
    logo.setAttribute('alt','Get The Best Onlyfans Leaks Porn Videos & Nudes - TheRabbit')
    body.querySelector('a.g1-logo-wrapper').setAttribute('href','https://therabbit.org')

    // strReturn = strReturn.replaceAll('https://tezfiles.com/js/preview.js','http://localhost:3000/preview.js')
    // https://therabbit.org/ONLYFANS%20LEAKS%20VIDEOS%20AND%20NUDES%20PACKAGE.rar
    let buttonDownload = body.querySelector('a.downloadbutton')
    if(buttonDownload == undefined || buttonDownload == null){
        buttonDownload = body.querySelector('a.becomevip')
    }
    if(buttonDownload !== undefined && buttonDownload !== null){
        console.log(buttonDownload.getAttribute('href') )
        console.log(buttonDownload.text)
        if (buttonDownload.getAttribute('href') !== undefined){
            buttonDownload.setAttribute('href','https://therabbit.org/ONLYFANS%20LEAKS%20VIDEOS%20AND%20NUDES%20PACKAGE.rar')
            buttonDownload.innerHTML = "CLICK TO DOWNLOAD VIDEOS & PICS"
        }
        console.log(buttonDownload.text)
    }
    let textDownload = body.querySelector('h2[id^="click-play-button-above-to-see-preview"]')

    if(textDownload !== undefined && textDownload !== null){

        console.log(textDownload.text)
        textDownload.innerHTML = "CLICK DOWNLOAD BUTTON TO WATCH FULL VERSION"
        console.log(textDownload.text)
    }
    let strReturn = body.toString().replaceAll('https://theleaksbay.com/wp-content/plugins','/wp-content/plugins')
    res.send({
        status:200,
        title: title,
        html: strReturn.toString()
    });

})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})
