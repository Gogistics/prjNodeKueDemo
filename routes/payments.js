'use strict';

const router = require('express').Router();

var my_kue_handler = require('../queue/payments');

router.post('/', (req, res, next) => {  
  my_kue_handler.create({},function(err, status){
    if(!err) console.log(status);
  });
});

module.exports = router;
