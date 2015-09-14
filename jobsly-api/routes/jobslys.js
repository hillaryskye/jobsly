var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/jobslys'); // make semantic
var Jobslys = db.get('jobslys'); // make semantic
require('dotenv').load()

router.get('/', function(req, res) {  // INDEX
  Jobslys.find({}, function(err, jobslys) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(jobslys); // OK
  })
});  // tested

router.post('/', function(req, res) { // CREATE
  Jobslys.insert(req.body, function(err, jobsly) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(jobsly); // Created
  });
}) // tested

router.get('/new', function(req, res){ // NEW
  // goes to forms page for user to enter a new jobsly
  // this route isn't needed if a href anchor is used to go to the forms page
});

router.get('/:id', function(req, res) { //SHOW
  Jobslys.findOne({_id: req.params.id}, function(err, jobsly) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(jobsly); // OK
  })
}) // tested

router.get('/:id/edit', function(req, res){ // EDIT (identical to SHOW route)
  Jobslys.findOne({_id: req.params.id}, function(err, jobsly) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(jobsly) // OK
  })
}); // tested

router.put('/:id', function(req, res) { // UPDATE
  Jobslys.findAndModify({_id: req.params.id}, req.body, function(err, jobsly) {
    if (err) {
      throw err;
    }
    res.json(req.body);
  })
}) // tested

router.delete('/:id', function(req, res) { //DESTROY
  Jobslys.remove({_id: req.params.id}, function(err, jobsly){
    if (err) {
      throw err;
    }
    res.status(204).json(jobsly); // No Content
  });
}); // tested

module.exports = router;
