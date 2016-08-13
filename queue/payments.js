'use strict';

var redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };

var queue = require('kue').createQueue(redisConfig);
queue.watchStuckJobs(6000);
queue.on('ready', function(){  
  // If you need to 
  console.info('Queue is ready!');
});

queue.on('error', function(err){  
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

function createPayment(data, done) {  
  queue.create('payment', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save(function(err) {
      if (err) {
        console.error(err);
        done(err, {order: data, success: false, error: true, message: 'failed to make an order'});
      }
      if (!err) {
        done(null, {order: data, success: true, error: null, message: 'order was made successfully'});
      }
    });
}

// Process up to 20 jobs concurrently
queue.process('payment', 20, function(data, done){  
  // do something here

  // call done() when finished
  done(null,{order: data, status: 'done'});
});

module.exports = {  
  create: function(data, done) {
    createPayment(data, done);
  }
};
