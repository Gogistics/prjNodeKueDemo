## Redis

1. Create Dockerfile and run.sh (with reference to https://github.com/tutumcloud/redis and https://hub.docker.com/_/redis/)


2. Build docker image

   ```docker build -t <YOUR_TAGNAME> .```


3. Run container; REDIS_PASS can be replaced

   ```docker run --name kue_redis_pwd -d -p <YOUR_IP>:<YOUR_PORT>:6379 -e REDIS_PASS=myredissecretpassword strider_kue/redis_pwd```

NOTE: For creating redis without pwd, use the command below
   
   ```docker run --name <YOUR_CONTAINER_NAME> -d redis redis-server -p <YOUR_PORT>:6379 --appendonly yes```

Reference

[Using Node, Redis, and Kue for Priority Job Processing](https://ifelse.io/2016/02/23/using-node-redis-and-kue-for-priority-job-processing/)

[Why I use Tape Instead of Mocha](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.wrpgzj2pe)

[Mailgun-JS](http://blog.mailgun.com/how-to-send-transactional-emails-in-a-nodejs-app-using-the-mailgun-api/)

[Twilio with Node.js](http://twilio.github.io/twilio-node/)
