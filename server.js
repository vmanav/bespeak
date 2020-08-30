const express = require('express');
const app = express();

const { db, Tickets } = require('./models/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home 
app.get('/', (req, res) => {


  // let date = {
  //   "day": 1,
  //   "month": 9,
  //   "year": 2020,
  //   "hours": 20,
  //   "minutes": 0
  // };


  // var schedule = new Date();
  // schedule.setDate(parseInt(date.day));
  // schedule.setMonth(parseInt(date.month));
  // schedule.setFullYear(parseInt(date.year));
  // schedule.setHours(parseInt(date.hours));
  // schedule.setMinutes(parseInt(date.minutes));

  // console.log("DATE :", schedule);

  res.send({
    "text": "Welcome to bespeak, Easy Ticket Booking",
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

// Update Ticket Timming 
app.patch('/tickets/:id', (req, res) => {

  let id = req.params.id;
  let newTimming = req.body.timming;
  res.send({
    "id": id,
    "newTimming": newTimming
  })

  Tickets.update({ timming: newTimming }, {
    where: {
      id: id
    }
  });
})

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Running @ : http://localhost:3000");
  })
})