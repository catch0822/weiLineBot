var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1518096609',
    channelSecret: '4825d840c226f354e2d8b19906ee680c',
    channelAccessToken: 'kNIFsUO/FoC4M9isTtdgdjCUVwqAERJMuokpKRgl68is1sbe2YVJcVsHcWtOImhpsdCxwuPRCD6nOxjP+Qq4ltSn6CCV2SfezN/0mfg9w/KR2r/NFdJEkZZQsY89PF3mAeQSX8QgX2LCPfEUak1gzAdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    console.log(event); 
    event.reply(event.message.text).then(function (data) {
        // success 
    }).catch(function (error) {
        // error 
    });
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
