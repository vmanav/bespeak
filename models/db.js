const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: "sqlite",
  storage: "tickets.db"
})

const Tickets = db.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timming: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  expired: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
})

module.exports = {
  db,
  Tickets
}