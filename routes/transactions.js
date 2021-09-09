var express = require('express');
const { isTranactionAvalible,addTransaction} = require('../models/Book');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',function(req, res){
    addTransaction(req.body, function(error, result){
      if(error){
        res.status(500).send({
          success: false,
          message: error.message
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "Added New Book!!",
        data: result
      });
    });
});

router.post('/:TransactionId',function(req, res){
    isTranactionAvalible(req.body, function(error, result){
      if(error){
        res.status(500).send({
          success: false,
          message: error.message
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "Added New Book!!",
        data: result
      });
    });
});

module.exports = router;
