#!/bin/bash
# Program:
# spin up node app
# History:
# 02/05/2017
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export=PATH
REDIS_PWD=''
REDIS_HOST=''

cd ./my_redis/
while IFS='=' read -r key value
do
  echo "$key ; $value"
  keys+=("$key")
  values+=("$value")
  if [ ${key} == REDIS_PWD ]; then
    REDIS_PWD=${value}
  fi
  if [ ${key} == REDIS_HOST ]; then
    REDIS_HOST=${value}
  fi
done < ./my_vars

NODE_ENV=development REDIS_PORT=6379 REDIS_HOST=${REDIS_HOST} REDIS_PASS=${REDIS_PWD} node .