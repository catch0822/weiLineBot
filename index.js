var linebot = require('linebot');
var express = require('express');
const cheerio = require('cheerio')
var moment = require('moment-timezone');

var bot = linebot({
    channelId: '1518123694',
    channelSecret: '7fda6b69be0ee244b4b5d34fbb214896',
    channelAccessToken: 'QKCZBLlIhDQhShlwWfO6+ZlrXIjaLxeo/c9+z2lMECIl3/LSD1f4sdQfg/gWPZkIESMmlmS0vKY9YRYxaG2kiOBBKl6gHxXGABs0N6IQEhjOLrenmxRZb49D8z7GbL0Qjgoifx4mQSdQ61QI4kn8swdB04t89/1O/w1cDnyilFU='
});

// function getContent(url, cb){
//     var request = require("request");
//     request(url, function (error, response, body) {
//         var str = body.toString().replace(/\r\n|\n/g,"").replace(/\s+/g, "");
//         var match, result = "", regex = /<article>(.*?)<\/article>/ig;
//         while (match = regex.exec(str)) { result += match[1]; }
//         cb(result)
//     });
// }

function getContent(iAstro, cb){
    var request = require("request");
    const today = moment().tz("Asia/Hong_Kong").format("YYYY-MM-DD");
    request("http://astro.click108.com.tw/daily_"+iAstro+".php?iAcDay="+today+"&iAstro="+iAstro+"", function (error, response, body) {
        const $ = cheerio.load(body);
        cb(today +" " + $('.TODAY_CONTENT').text().replace(/\r\n|\n/g,"").replace(/\s+/g, "").replace(/。愛/g,"。\n愛").replace(/。事/g,"。\n事").replace(/。財/g,"。\n財"))
    });
}

bot.on('message', function (event) {
    console.log(event); 
    if(event.message.text != null){
        if(event.message.text.indexOf("8363") > -1 && event.message.text.indexOf("座") > -1){
            if(event.message.text.indexOf("牡羊座") > -1){
                self = event;
                getContent('0', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("金牛座") > -1){
                self = event;
                getContent('1', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("雙子座") > -1 || event.message.text.indexOf("双子座") > -1){
                self = event;
                getContent('2', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("巨蠍座") > -1 || event.message.text.indexOf("巨蟹座") > -1){
                self = event;
                getContent('3', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("獅子座") > -1){
                self = event;
                getContent('4', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("處女座") > -1){
                self = event;
                getContent('5', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("天秤座") > -1){
                self = event;
                getContent('6', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("天蠍座") > -1){
                self = event;
                getContent('7', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("射手座") > -1){
                self = event;
                getContent('8', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("魔羯座") > -1 || event.message.text.indexOf("摩羯座") > -1){
                self = event;
                getContent('9', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("水瓶座") > -1){
                self = event;
                getContent('10', function(res){
                    self.reply(res);
                });
            }
            else if(event.message.text.indexOf("雙魚座") > -1 || event.message.text.indexOf("双魚座") > -1){
                self = event;
                getContent('11', function(res){
                    self.reply(res);
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
