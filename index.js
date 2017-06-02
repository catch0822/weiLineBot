var linebot = require('linebot');
var express = require('express');

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

const baseUrl = "http://www.daily-zodiac.com/mobile/zodiac/";
bot.on('message', function (event) {
    console.log(event); 
    if(event.message.text != null){
        if(event.message.text.indexOf("8363") > -1 && event.message.text.indexOf("座") > -1){
            if(event.message.text.indexOf("牡羊座") > -1){
                self = event;
                getContent(baseUrl+"Aries", function(res){
                    self.reply("牡羊座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("金牛座") > -1){
                self = event;
                getContent(baseUrl+"Taurus", function(res){
                    self.reply("金牛座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("雙子座") > -1 || event.message.text.indexOf("双子座") > -1){
                self = event;
                getContent(baseUrl+"Gemini", function(res){
                    self.reply("雙子座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("巨蠍座") > -1){
                self = event;
                getContent(baseUrl+"Cancer", function(res){
                    self.reply("巨蠍座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("獅子座") > -1){
                self = event;
                getContent(baseUrl+"Leo", function(res){
                    self.reply("獅子座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("處女座") > -1){
                self = event;
                getContent(baseUrl+"Virgo", function(res){
                    self.reply("處女座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("天秤座") > -1){
                self = event;
                getContent(baseUrl+"Libra", function(res){
                    self.reply("天秤座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("天蠍座") > -1){
                self = event;
                getContent(baseUrl+"Scorpio", function(res){
                    self.reply("天蠍座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("射手座") > -1){
                self = event;
                getContent(baseUrl+"Sagittarius", function(res){
                    self.reply("射手座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("魔羯座") > -1 || event.message.text.indexOf("摩羯座") > -1){
                self = event;
                getContent(baseUrl+"Capricorn", function(res){
                    self.reply("魔羯座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("水瓶座") > -1){
                self = event;
                getContent(baseUrl+"Aquarius", function(res){
                    self.reply("水瓶座今日運勢:"+ res);
                });
            }
            else if(event.message.text.indexOf("雙魚座") > -1 || event.message.text.indexOf("双魚座") > -1){
                self = event;
                getContent(baseUrl+"Pisces", function(res){
                    self.reply("雙魚座今日運勢:"+ res);
                });
            }
            else{
                event.reply("最好有這個星座! 操!");
            }
        }

        if(event.message.text.indexOf("8363") > -1 && event.message.text.indexOf("浩浩") > -1){
            event.reply("浩浩愛各位美女姨姨❤❤❤❤❤");
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
