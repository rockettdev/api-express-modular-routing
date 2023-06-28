// Import data here...
const express = require('express');
const router = express.Router();

// Write routes here...

const books = [
    {
      id: 1,
      title: "1984",
      type: "fiction",
      author: "George Orwell",
      pages: 5
    },
    {
      id: 2,
      title: "Life of Pi",
      type: "fiction",
      author: "Yann Martel",
      pages: 4
    },
    {
      id: 3,
      title: "How to Win Friends and Influence People",
      type: "non-fiction",
      author: "Dale Carnegie",
      pages: 3
    },
    {
      id: 4,
      title: "The Lean Startup",
      type: "non-fiction",
      author: "Eric Reis",
      pages: 2
    }
  ];

  let id = 5

// Get all books
  router.get('/', (req, res) => {
    res.status(200).json({books})
})

// Get book by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchBook = books.find(books => books.id === id)

    if(searchBook) {
        return res.status(200).send({book: searchBook})
    }
    else {
        return res.status(404).send({error: "book not found"})
    }
})

// Create a book
router.post('/', (req, res) => {
    const bookData = req.body
    const book = {id: id++, ...bookData}

    books.push(book)

    res.status(201).json({book: book})
})

// Delete book by id
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const searchResult = books.find(book => {
        return book.id === id
    }) 
    
      const indexStore = books.indexOf(searchResult)
      books.splice(indexStore ,1)
    
      return res.status(200).send({ book: searchResult })
})

// Uodate book by id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchResult = books.findIndex(book => {
        return book.id === id
    }) 

    const bookData = req.body

    bookData.id = id

    books[searchResult] = bookData

    return res.status(200).send({book: bookData })
})

module.exports = router;