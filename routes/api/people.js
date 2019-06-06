const express = require('express')
const uuid = require('uuid')

const router = express.Router()

const people = require('../../People')


//400 bad request


//! ALL MEMBERS
router.get('/', (req, res) => {
  res.json(people)
})

//! SINGLE MEMBER
router.get('/:id', (req, res) => {
const found = people.some(person => person.id === parseInt(req.params.id))

if(found) {
  res.json(people.filter(person => person.id === parseInt(req.params.id)))
} else {
  res.status(400).json({msg: `No member with the id of ${req.params.id}`})
}

})


//! CREATE MEMBER 
router.post('/', (req, res) => {
  const newPerson = {
    id: uuid.v4(),
    name: req.body.name,
    color: req.body.color,
    status: "active"
  }

  if(!newPerson.name || !newPerson.color) {
   return res.status(400).json({msg: 'Please include name and color.'})
  }

  people.push(newPerson);
  //renders actual json
  // res.json(people)
  //will render normally
  res.redirect('/')
  
})

//! UPDATE MEMBER
router.put('/:id', (req, res) => {
  const found = people.some(person => person.id === parseInt(req.params.id))
  
  if(found) {
    const updatedPerson = req.body;
    people.forEach(person => {
      if(person.id === parseInt(req.params.id)){
        person.name = updatedPerson.name? updatedPerson.name: person.name;
        person.color = updatedPerson.color ? updatedPerson.color: person.color

        res.json({msg: "Member was updated", person:person})
      }
    })
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`})
  }
  
  })

  //! DELETE 
  router.delete('/:id', (req, res) => {
    const found = people.some(person => person.id === parseInt(req.params.id))
    
    if(found) {
      res.json({msg:"Person Deleted", people: people.filter(person => person.id !== parseInt(req.params.id))})
    } else {
      res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
    
    })


module.exports = router