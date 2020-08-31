const express = require('express');
const app = express();
const cron = require("node-cron");

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

// schedule Cron JOb
cron.schedule("*/1 * * * *", function () {
  // Running Task every 15 minutes
  let present = new Date();
  present.setHours(present.getHours() - 8);

  Tickets.update({ expired: true }, {
    where: {
      timming: { $gte: present }
    }
  }).then(() => {
    console.log("Cron Finished.");
  })

});

// Ticket Booking
app.post('/tickets', (req, res) => {

  console.log("req.body : ", req);
  const newTicket = {
    name: req.body.name,
    number: req.body.number,
    timming: req.body.timming,
    expired: false,
  }

  // Find if 20 Tickets already booked ?
  Tickets.findAndCountAll({
    where: {
      timming: newTicket.timming,
    }
  })
    .then(function (record) {
      if (!record || record.count < 20) {
        // Book Ticket
        Tickets.create(newTicket).then(ticket => {
          res.send({
            "text": "Ticket Booked Succesfully",
            "status": 200
          })
        })
      }
      else {
        // Cannot Book more than 20 Tickets
        res.send({
          "text": "Cannot Book more than 20 Tickets",
          "status": 200
        })
      }
    })
})


// Update Ticket Timming 
app.patch('/tickets/:id', (req, res) => {

  console.log(req);
  let id = req.params.id;
  let newTimming = req.body.timming;

  Tickets.update({ timming: newTimming }, {
    where: {
      id: id
    }
  }).then(() => {
    res.send({
      "text": "Ticket Updated Successfully.",
      "status": 200
    })
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

// View Details
app.get('/tickets/:id', (req, res) => {

  let id = req.params.id;

  Tickets.findOne({
    where: {
      id: id
    }
  }).then((record) => {
    if (!record) {
      res.send({
        "text": "No Ticket Found.",
        "status": 200
      })
    } else {
      let data = {
        "name": record.dataValues.name,
        "number": record.dataValues.number,
      }
      res.send({
        "text": "Ticket User Details.",
        "data": data,
        "status": 200
      })
    }
  })
})

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Running @ : http://localhost:3000");
  })
})