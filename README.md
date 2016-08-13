## Redis

1. Create Dockerfile and run.sh (with reference to https://github.com/tutumcloud/redis and https://hub.docker.com/_/redis/)


2. Build docker image

   ```docker build -t strider_kue/redis_pwd .```


3. Run container; REDIS_PASS can be replaced

   ```docker run --name kue_redis_pwd -d -p 127.0.0.1:6378:6379 -e REDIS_PASS=myredissecretpassword strider_kue/redis_pwd```

NOTE: For creating redis without pwd, use the command below
   
   ```docker run --name kue_redis -d redis redis-server -p 6379:6379 --appendonly yes```

Ref.

[Using Node, Redis, and Kue for Priority Job Processing](https://ifelse.io/2016/02/23/using-node-redis-and-kue-for-priority-job-processing/)

[Why I use Tape Instead of Mocha](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.wrpgzj2pe)
