var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/rps', function(req, res){
    //render the index page
    res.render('RockPaperScissors.jade', {
          title: "Rock Paper Scissors"
    });

  });

module.exports = router;
