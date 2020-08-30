const express = require('express');
const app = express();

const { db, Tickets } = require('./models/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home 
app.get('/', (req, res) => {
  res.send({
    "text": "Welcome to bespeak, Easy Ticket Booking",
    "status": 200
  })
})

// Get All Tickets
app.post('/tickets/search', (req, res) => {

  const timming = req.body.timming;
  console.log("timming : ", timming);
  res.send({
    "text": timming,
    "status": 200
  })

})

// Ticket Booking
app.post('/tickets', (req, res) => {

  // console.log("req.body : ", req.body);
  const newTicket = {
    name: req.body.name,
    number: req.body.number,
    timming: req.body.timming,
    expired: false,
  }

  Tickets.create(newTicket).then(ticket => {
    res.send({
      "text": "Ticket Booked Succesfully",
      "status": 200
    })
  })
})

// View a Ticket


// Update Ticket Timming 
app.get('/tickets/:id', (req, res) => {

  let id = req.params.id;
  console.log("id : ", id);

})


// Update Ticket Timming 
app.patch('/tickets/:id', (req, res) => {

  let id = req.params.id;
  console.log("id : ", id);

})

// Delete Ticket
app.delete('/tickets/:id', (req, res) => {

  let id = req.params.id;
  console.log("id : ", id);

})



db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Running @ : http://localhost:3000");
  })
})