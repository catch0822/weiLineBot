var linebot = require('linebot');
var express = require('express');
const cheerio = require('cheerio')
var moment = require('moment-timezone');
var request = require("request");
var urlencode = require('urlencode');
var GoogleUrl = require( 'google-url' );
var constellationObject = require('./constellation.json');




googleUrl = new GoogleUrl( { key: 'AIzaSyCYlF1MuSKizf99SSvFmSL1FhCtTteZrCc' });
const urlRegex =/(\b(https?|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const constellationRegex = /..座/ig;

function getConstellationFromString(text, cb) {
    text.replace(constellationRegex, function(res) {
        cb(res);
    });
}

var bot = linebot({
    channelId: '1518123694',
    channelSecret: '7fda6b69be0ee244b4b5d34fbb214896',
    channelAccessToken: 'QKCZBLlIhDQhShlwWfO6+ZlrXIjaLxeo/c9+z2lMECIl3/LSD1f4sdQfg/gWPZkIESMmlmS0vKY9YRYxaG2kiOBBKl6gHxXGABs0N6IQEhjOLrenmxRZb49D8z7GbL0Qjgoifx4mQSdQ61QI4kn8swdB04t89/1O/w1cDnyilFU='
});

function shortUrl_0rz(url, cb){
    request("http://0rz.tw/create?url="+urlencode(url), function (error, response, body) {
        const $ = cheerio.load(body);
        cb($("div#doneurl a").text().split("複製")[1]);
    });
}

function shortUrl_google(url, cb){
    googleUrl.shorten(url, function(err, shortUrl) {
      cb(shortUrl)
    });
}

function getUrlFromString(text, cb) {
    text.replace(urlRegex, function(url) {
        cb(url);
    });
}

var PTT_MOVIE_END_PAGE = 300

function getContent(iAstro, cb){
    const today = moment().tz("Asia/Hong_Kong").format("YYYY-MM-DD");
    request("http://astro.click108.com.tw/daily_"+iAstro+".php?iAcDay="+today+"&iAstro="+iAstro+"", function (error, response, body) {
        const $ = cheerio.load(body);
        cb(today +" " + $('.TODAY_CONTENT').text().replace(/\r\n|\n/g,"").replace(/\s+/g, "").replace(/解析整體/g,"解析\n整體").replace(/。愛|！愛/g,"。\n愛").replace(/。事|！事/g,"。\n事").replace(/。財|！財/g,"。\n財"))
    });
}

bot.on('message', function (event) {
    // console.log(event); 
    if(event.message.text != null){
        console.log(event.message.text)
        if(event.message.text.indexOf("8363") > -1 && event.message.text.indexOf("座") > -1){
            getConstellationFromString(event.message.text, function(constellationName){
                if(typeof constellationObject[constellationName] !== 'undefined'){
                    self = event;
                    getContent(constellationObject[event.message.text], function(res){
                        self.reply(res);
                    });
                }
                else{
                    event.reply("最好有這個星座! 操!");
                }
            });
        }
      
        if(event.message.text.indexOf("縮") > -1 && event.message.text.match(urlRegex)){
            self = event;
            getUrlFromString(event.message.text, function(url){
                shortUrl_google(url, function(shortUrl){
                    self.reply(shortUrl);
                });
            });
        }

        if(event.message.text.indexOf("涵涵") > -1) {
            event.reply("83最愛涵涵了")
        }
        if(event.message.text.indexOf("大勳") > -1 && event.message.text.indexOf("女朋友") > -1) {
            event.reply("醒醒吧~大勳沒有女朋友")
        }
    }
//   event.reply(event.message.text).then(function (data) {
//            // success 
        
//       }).catch(function (error) {
//            // error 
//          });
});

const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);

app.get('/', function (req, res) {
    res.send('Hello World!');
  });


var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
