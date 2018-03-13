var calculator = require("./Calculator.js");
var bodyParser = require('body-parser');
var express = require('express');
var axios = require('axios');
var app = express();

var calculatorKeyboard = JSON.stringify(calculator.GetCalculatorKeyboard());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// ------Check request------------------
app.use('/new-message', function(req, res, next){

  if(!req.body)
    return res.sendStatus(400);
  else{
    res.send(JSON.stringify({"ok":true}));
    next();
  }
});
//------------------------------------------------

//  Receiving Queries
app.post('/new-message', function(req, res){

const {callback_query} = req.body;
const {message} = req.body;

  if (message && message.text == '/start') {

    axios.post('https://api.telegram.org/bot435432540:AAFy0XDEmmDODfZGOwmyuYBFSAhlGFtese0/sendMessage', {
      chat_id: message.chat.id,
      text: '0',
      reply_markup: calculatorKeyboard})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  else if (callback_query) {

    axios.post('https://api.telegram.org/bot435432540:AAFy0XDEmmDODfZGOwmyuYBFSAhlGFtese0/editMessageText', {
      chat_id: callback_query.message.chat.id,
      message_id: callback_query.message.message_id,
      text: calculator.Operations(callback_query.message.text, callback_query.data),
      reply_markup: calculatorKeyboard})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
});

// Start server
app.listen(5000, function() {
 console.log('Start server!');
});
