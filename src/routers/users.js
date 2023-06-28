const express = require('express');
const userData = require('../../test/fixtures/userData');
const router = express.Router();

const users = [
    {
        id: 1,
        email: "edward@mail.com"
    },
    {
        id: 2,
        email: "milanosushi@hotmail.it"
    },
    {
        id: 3,
        email: "carlocùdegà@charles101.com"
    }
] 

let id = 4

// Get all users
router.get('/', (req, res) => {
    res.status(200).send({users})
})

// Get user by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchUser = users.find(users => users.id === id)

    if(searchUser) {
        return res.status(200).send({user: searchUser})
    }
    else {
        return res.status(404).send({error: "user not found"})
    }
})

// Create a user
router.post('/', (req, res) => {
    const userData = req.body
    const user = {id: id++, ...userData}

    users.push(user)

    res.status(201).json({user: user})
})

// Delete user by id
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id)

    const searchResult = users.find(user => {
        return user.id === id
    }) 
    
      const indexStore = users.indexOf(searchResult)
      users.splice(indexStore ,1)
    
      return res.status(200).send({ user: searchResult })
})

// Uodate user by id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const searchResult = users.findIndex(user => {
        return user.id === id
    }) 

    const userData = req.body

    userData.id = id

    users[searchResult] = userData

    return res.status(200).send({user: userData })
})

module.exports = router;