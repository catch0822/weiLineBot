var linebot = require('linebot');
var express = require('express');
var fetchUrl = require("fetch").fetchUrl;

var bot = linebot({
    channelId: '1518123694',
    channelSecret: '7fda6b69be0ee244b4b5d34fbb214896',
    channelAccessToken: 'QKCZBLlIhDQhShlwWfO6+ZlrXIjaLxeo/c9+z2lMECIl3/LSD1f4sdQfg/gWPZkIESMmlmS0vKY9YRYxaG2kiOBBKl6gHxXGABs0N6IQEhjOLrenmxRZb49D8z7GbL0Qjgoifx4mQSdQ61QI4kn8swdB04t89/1O/w1cDnyilFU='
});

function getContent(url, cb){
    var request = require("request");
    request(url, function (error, response, body) {
        var str = body.toString().replace(/\r\n|\n/g,"").replace(/\s+/g, "");
        var match, result = "", regex = /<article>(.*?)<\/article>/ig;
        while (match = regex.exec(str)) { result += match[1]; }
        cb(result)
    });
}

bot.on('message', function (event) {
    console.log(event); 
    if(event.message.text.indexOf("8363")){
        if(event.message.text.indexOf("牡羊座") > -1){
            self = event;
            getContent("http://www.daily-zodiac.com/mobile/zodiac/Aries", function(res){
                self.reply("牡羊座今日運勢:"+ res);
            });
        }
    }

    if(event.message.text.indexOf("涵涵") > -1) {
        event.reply("83最愛涵涵了")
    }
    if(event.message.text.indexOf("大勳") > -1 && event.message.text.indexOf("女朋友") > -1) {
        event.reply("醒醒吧~大勳沒有女朋友")
    }
    if(event.message.text.indexOf("陳") > -1 && (event.message.text.indexOf("A尼") > -1 || event.message.text.indexOf("a尼") > -1)) {
        event.reply("陳中秋會換女友嗎?")
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
