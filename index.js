var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1518123694',
    channelSecret: '7fda6b69be0ee244b4b5d34fbb214896',
    channelAccessToken: 'QKCZBLlIhDQhShlwWfO6+ZlrXIjaLxeo/c9+z2lMECIl3/LSD1f4sdQfg/gWPZkIESMmlmS0vKY9YRYxaG2kiOBBKl6gHxXGABs0N6IQEhjOLrenmxRZb49D8z7GbL0Qjgoifx4mQSdQ61QI4kn8swdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    console.log(event); 
    if(event.message.text == "安安"){
        event.reply("安你媽?")
    }
    if(event.message.text.indexOf("大勳") > -1 && event.message.text.indexOf("女朋友") > -1) {
        event.reply("醒醒吧~大勳沒有女朋友")
    }
    if(event.message.text.indexOf("陳") > -1 && event.message.text.indexOf("A尼") > -1) {
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
