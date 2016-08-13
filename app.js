var express = require('express'),
    app = express(),
    body_parser = require('body-parser');

var payments = require('./routes/payments'),
    kue = require('kue');  

var redisConfig;  
if (process.env.NODE_ENV === 'production') {  
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };
} else {
  redisConfig = {};
}
kue.createQueue(redisConfig);

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use('/queue', kue.app); 
app.use('/payments', payments);

app.get('/', function (req, res) {
  res.send('Kue Demo');
});

app.listen(process.env.PORT || 5100);
module.exports = app;
