var linebot = require('linebot');
var express = require('express');
const cheerio = require('cheerio')
var moment = require('moment-timezone');
var request = require("request");
var urlencode = require('urlencode');
var GoogleUrl = require('google-url');
var constellationObject = require('./constellation.json');
var HashMap = require('hashmap');
var googleUrl = new GoogleUrl( { key: 'AIzaSyCYlF1MuSKizf99SSvFmSL1FhCtTteZrCc' });
const PTT_MOVIE_PAGE_SIZE = 300
const urlRegex =/(\b(https?|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const constellationRegex = /..座/ig;
const movieEvaluationRegex = /\[(.*?)\]/ig;

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

function getConstellationFromString(text, cb) {
    text.replace(constellationRegex, function(res) {
        cb(res);
    });
}

function getMovieEvaluation(text, cb){
    text.replace(movieEvaluationRegex, function(evaluation) {
        cb(evaluation);
    });
}

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
        if(event.message.text.indexOf("大勳") > -1 && event.message.text.indexOf("女朋友") > -1) {
            event.reply("醒醒吧~大勳沒有女朋友")
        }
        else if(event.message.text.indexOf("8363") > -1 && event.message.text.indexOf("座") > -1){
            getConstellationFromString(event.message.text, function(constellationName){
                if(typeof constellationObject[constellationName] !== 'undefined'){
                    self = event;
                    getContent(constellationObject[constellationName], function(res){
                        self.reply(res);
                    });
                }
                else{
                    event.reply("最好有這個星座! 操!");
                }
            });
        }
        else if(event.message.text.indexOf("縮") > -1 && event.message.text.match(urlRegex)){
            self = event;
            getUrlFromString(event.message.text, function(url){
                shortUrl_google(url, function(shortUrl){
                    self.reply(shortUrl);
                });
            });
        }
        else if(event.message.text.indexOf("MOVIE") > -1){
            var movieName = event.message.text.replace("MOVIE", '').trim();
            var movieMap = new HashMap();
            movieMap.set("好雷","0");
            movieMap.set("普雷","0");
            movieMap.set("負雷","0");
            request("https://www.ptt.cc/bbs/movie/index.html", function (error, response, body) {
                const $ = cheerio.load(body);
                var lastPageUrl = $("div.btn-group-paging a")[1].attribs.href;
                var startPager = lastPageUrl.split("index")[1].split(".html")[0];
                var endPage = startPager - PTT_MOVIE_PAGE_SIZE;
                while(startPager != endPage){
                    var url = "https://www.ptt.cc/bbs/movie/index"+ startPager+ ".html";
                    request(url, function (error, response, body) {
                        const $ = cheerio.load(body);
                        pageContentList = $("div.r-ent .title a").toArray()
                        for(var i = 0; i< pageContentList.length ; i++){
                            var comment = pageContentList[i].children[0].data;
                            if(comment.indexOf(movieName) > -1){
                                // console.log(comment)
                                getMovieEvaluation(comment, function(evaluation){
                                    // console.log(evaluation)
                                    if(evaluation.indexOf("好雷")){
                                        movieMap.set("好雷", parseInt(movieMap.get("好雷")) + 1);
                                    }
                                    else if(evaluation.indexOf("普雷")){
                                        movieMap.set("普雷", parseInt(movieMap.get("普雷")) + 1);
                                    }
                                    else if(evaluation.indexOf("負雷")){
                                        movieMap.set("負雷", parseInt(movieMap.get("負雷")) + 1);
                                    }
                                })
                            }
                        }
                    });
                    startPager --;
                }
                event.reply("電影=== " + movieName + " ===\n" + "好雷: " + movieMap.get("好雷") + "\n普雷: " + movieMap.get("普雷") + "\n負雷: " + movieMap.get("負雷") )
            });
        }
        else if(event.message.text.indexOf("涵涵") > -1) {
            event.reply("83最愛涵涵了")
        }
    }
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
