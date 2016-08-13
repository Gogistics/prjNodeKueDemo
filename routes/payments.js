'use strict';

const router = require('express').Router();

var my_kue_handler = require('../queue/payments');

router.post('/', function(req, res, next){
  var data = req.body;
  // console.log(data);
  my_kue_handler.create(data, function(err, result){
    if(!err){
      res.send(result);
    }
  });
  // res.send({order: data});
});

module.exports = router;
