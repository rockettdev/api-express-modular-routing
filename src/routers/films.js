const express = require('express');
const router = express.Router();

const films = [
    {
      id: 1,
      title: "Bonnie and Clyde",
      director: "Arthur Penn"
    },
    {
      id: 2,
      title: "Reservoir Dogs",
      director: "Quentin Tarantino"
    },
    {
      id: 3,
      title: "Inception",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "Django Unchained",
      director: "Quentin Tarantino"
    }
  ];

  let id = 5

  // Get all films
router.get('/', (req, res) => {
    res.status(200).json({films})
})

// Get Film by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchFilm = films.find(films => films.id === id)

    if(searchFilm) {
        return res.status(200).send({film: searchFilm})
    }
    else {
        return res.status(404).send({error: "Film not found"})
    }
})

// Create a Film
router.post('/', (req, res) => {
    const filmData = req.body
    const film = {id: id++, ...filmData}

    films.push(film)

    res.status(201).json({film: film})
})

// Delete Film by id
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const searchResult = films.find(film => {
        return film.id === id
    }) 
    
      const indexStore = films.indexOf(searchResult)
      films.splice(indexStore ,1)
    
      return res.status(200).send({ film: searchResult })
})

// Uodate film by id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchResult = films.findIndex(film => {
        return film.id === id
    }) 

    const filmData = req.body

    filmData.id = id

    films[searchResult] = filmData

    return res.status(200).send({film: filmData })
})

module.exports = router;