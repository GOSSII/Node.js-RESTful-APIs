// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let bookModel = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  bookModel.find( (err, books) => {
    if (err) {
     // return console.error(err);
     // console.error('There was an error', err);
     //return res.json("there is an error");
      res.send(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    //res.json(books);
    }
  });



  
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title : "Add A Book Here",
    books : bookModel
  })
})

// Model Reference
// Title: String,
// Description: String,
// Price: Number,
// Author: String,
// Genre: String

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
console.log(req.body);
  // CREATE THE OBJECT TO SAVE THE VALUE FROM THE REQUEST
  let object = new bookModel({
    "Title" : req.body.Title,
    "Price" : req.body.Price,
    "Author" :req.body.Author,
    "Genre" : req.body.Genre
  })

  // ADD API
  bookModel.create(object, (err, bookModel) => {
    if(err){
      res.send(err);
    }else{
     res.send(200)}
  })
  
});


// GET the Book Details By Id
router.get('/get/:id', (req, res, next) => {
  //STORE ID TO FETCH RECORD FROM THE DB
  let id =req.params.id;

  bookModel.findById(id, (err, bookObject) => {
    if(err){
      res.send(err);
    }else{
       res.json(bookObject)
        // res.render('books/details', {
        // title: 'Books',
        // books: bookObject
      //});
    }
  })
})

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  //STORE ID TO FETCH RECORD FROM THE DB
  let id =req.params.id;

  bookModel.findById(id, (err, bookObject) => {
    if(err){
      res.send(err);
    }else{
       //res.json(bookObject)
        res.render('books/details', {
        title: 'Books',
        books: bookObject
      });
    }
  })
})

// POST - process the information passed from the details form and update the document
router.post('edit/:id', (req, res, next) =>{
  // STORE ID
  let id = req.params.id;


  console.log("Id => ",id);
  // STORE FORM VALUES IN OBJECT
  // let updateBookObject = bookModel({
  //   "_id" : id,
  //   "Title" : req.body.Title,
  //   "Price" : req.body.Price,
  //   "Author" :req.body.Author,
  //   "Genre" : req.body.Genre
  // })

  // console.log("Object => "+ updateBookObject);

  // // UPDATE FUNCTION
  // bookModel.update({_id : id }, updateBookObject, (err) => {
  //   if(err){
  //     console.log(err);
  //     res.send(err);
  //   }else{
  //     res.redirect('/books');
  //    //res.send(200)}
  //   }
  //   })
})

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  // console.log("Del ID => " +id);

  bookModel.remove({_id : id}, (err) => {
      if(err){res.send(err);
      }else{
          res.send(200);
      }
  })
})

module.exports = router;
