'use strict';

// default port and host are for test
var redisConfig = {
    redis: {
      port: (process.env.REDIS_POR || 6379),
      host: (process.env.REDIS_HOST || '45.33.61.89'),
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
  var job = queue.create('payment', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save(function(err) {
      if (err) {
        console.error(err);
        done(err, {order: data, success: false, error: true, message: 'failed to add the order into queue'});
      }
      if (!err) {
        console.log('payment process successfully added into queue');
        done(null, {order: data, success: true, error: null, message: 'order was added into queue  successfully'});
      }
    });

  job.on('progress', function(progress, data){
    console.log('Job #' + job.id + ' ' + progress + '% complete with data ', data );
  });

  job.on('complete', function(result){
    console.log('Job completed with data ', result);
  });
}

// Process up to 20 jobs concurrently
queue.process('payment', 20, function(job, done){  
  // do something here
  console.log('job is done...');

  // call done() when finished
  done();
});

function send_email(arg_email_info, done){
  // send email via mailgun
}

module.exports = {  
  create: function(data, done) {
    createPayment(data, done);
  }
};
