var express = require('express');
var router = express.Router();

// Services
var Readers = require('../service/Readers');
var Books = require('../service/Books');
var Events = require('../service/Events');
var Top = require('../service/Top');

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Database XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:bdfy1234@localhost:5432/library");

let dbRequest = function(dbreq, res) {
    db.any(dbreq)
        .then(function (data) {
            console.log(data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            res.send(error);
        });
}
let dbCheck = function(readerid, bookid) {
  let reader = new Readers("get", undefined, undefined, readerid)
  let book = new Books("get", undefined, undefined, bookid)

  db.one(reader.request).then(function (data) {
    if (data == []) {
      return new Error("No entity with such id!");
    }
  })
  db.one(book.request).then(function (data) {
    if (data == []) {
      return new Error("No entity with such id!");
    }
  })
}
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Routes XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// ------------------------------ Manual ------------------------------
let manual = "<h1>/readers</h1><h2>to show/add/edit/clear readers</h2><h1>/books</h1><h2>to show/add/edit/clear books</h2><h1>/events</h1><h2>to add take/return book events</h2>";

router.get('/', function(req, res, next) {
    res.send(manual);
});
// --------------------------------------------------------------------
// ------------------------------ Readers -----------------------------
router.get('/readers', function(req, res, next) {
    let readers = new Readers("get", req.query.name, req.query.surname, req.query.id);
    dbRequest(readers.request, res);
  });
router.post('/readers', function(req, res, next) {
    let readers = new Readers("post", req.query.name, req.query.surname, req.query.id);
    dbRequest(readers.request, res);
});
router.delete('/readers', function(req, res, next) {
    let readers = new Readers("delete", req.query.name, req.query.surname, req.query.id);
    dbRequest(readers.request, res);
});
// -------------------------------------------------------------------
// ------------------------------ Books ------------------------------
router.get('/books', function(req, res, next) {
  let books = new Books("get", req.query.title, req.query.author, req.query.id);
  dbRequest(books.request, res);
});
router.post('/books', function(req, res, next) {
  let books = new Books("post", req.query.title, req.query.author, req.query.id);
  dbRequest(books.request, res);
});
router.delete('/books', function(req, res, next) {
  let books = new Books("delete", req.query.title, req.query.author, req.query.id);
  dbRequest(books.request, res);
});
// --------------------------------------------------------------------
// ------------------------------ Events ------------------------------
router.post('/events', function(req, res, next) {

  let events = new Events(req.query.action, req.query.bookid, req.query.readerid, undefined);
  dbCheck(events.readerid, events.bookid);
  dbRequest(events.request, res);
});
router.delete('/events', function(req, res, next) {
  let events = new Events(req.query.action, req.query.bookid, req.query.readerid, 1);
  dbRequest(events.request, res);
});
// --------------------------------------------------------------------
// ------------------------------ GetTop ------------------------------
router.get('/topBook', function(req, res, next) {
  let topBook = new Top('book', req.query.from, req.query.to);
  dbRequest(topBook.request, res)
});

router.get('/topReader', function(req, res, next) {
  let topReader = new Top('reader', req.query.from, req.query.to);
  dbRequest(topReader.request, res)
});
// --------------------------------------------------------------------
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

module.exports = router;
