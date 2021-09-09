var express = require('express');
const { addNewstudent, getAllBooksWrittenBystudent, addNewBookTostudent } = require('../models/student');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',function(req, res){
    addNewstudent(req.body, function(error, result){
        if(error){
          res.status(500).send({
            success: false,
            message: error.message
          });
          return;
        }
        res.status(200).send({
          success: true,
          message: "Added New student!!",
          data: result
        });
      });
});

router.get('/allBooks/:studentId', function(req, res){
    getAllBooksTakenBystudent(req.params.studentId,function(error, result){
        if(error){
          res.status(500).send({
            success: false,
            message: error.message
          });
          return;
        }
        res.status(200).send({
          success: true,
          message: "Books Written By student!!",
          data: result
        });
      })
});

router.put('/addNewBookTostudent/:bookId/:studentId', function(req, res){
    const { bookId, studentId } = req.params;
    addNewBookTostudent(bookId,studentId,function(error, result){
        if(error){
          res.status(500).send({
            success: false,
            message: error.message
          });
          return;
        }
        res.status(200).send({
          success: true,
          message: "Added New Book to student!!",
          data: result
        });
      })
})
module.exports = router;