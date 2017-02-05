#!/bin/bash
# Program:
# renew docker contaner
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

# check if redis container exist
# development; kue_redis
app_container='kue_redis'
inspect_result=$(docker inspect $app_container)
if [ "[]" == "$inspect_result" ]; then
  echo "redis container without password does not exist and a new one will be created..."
  docker run --name ${app_container} -d -p ${REDIS_HOST}:6379:6379 redis redis-server --appendonly yes
else
  echo "redis container without password setting already exists"
fi

# staging and production; kue_redis_pwd
# check if image exists
echo "Current dir is: "$PWD
app_image='strider_kue/redis_pwd:v1'
inspect_result=$(docker inspect $app_image)
if [ "[]" == "$inspect_result" ]; then
  echo "redis image with password does not exist"
  docker build -t ${app_image} .
else
  echo "redis image with password already exists"
fi

# check if container exists
app_container='kue_redis_pwd'
inspect_result=$(docker inspect $app_container)
if [ "[]" == "$inspect_result" ]; then
  echo "redis container with password does not exist and a new one will be created..."
  docker run --name ${app_container} -d -p ${REDIS_HOST}:6378:6379 -e REDIS_PASS=${REDIS_PWD} ${app_image}
else
  echo "redis container with password already exists"
fi
