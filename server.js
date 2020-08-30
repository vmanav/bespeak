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

// Get All Tickets
app.post('/tickets/search', (req, res) => {

  const timming = req.body.timming;
  console.log("timming : ", timming);

  Tickets.findAll({
    where: {
      timming: timming,
    }
  })
    .then(function (record) {
      if (record.length == 0) {
        res.send({
          "text": "No Tickets Found.",
          "status": 200
        })
      } else {
        console.log("record : ", record);
        data = record.map((rcd) => {
          return rcd.dataValues;
        })
        let dataLength = data.length;
        res.send({
          "text": "Tickets Found.",
          "length": dataLength,
          "data": data,
          "status": 200
        })
      }
    })
})

// Delete Ticket
app.delete('/tickets/:id', (req, res) => {

  let id = req.params.id;

  Tickets.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.send({
      "text": "Ticket Deleted Succesfully.",
      "status": 200
    })
  })
})

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Running @ : http://localhost:3000");
  })
})