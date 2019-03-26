const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config/config');
const app = express();

// routes
const userRoute = require('./app/routes/users')
// "mongodb://localhost:27017/usersdb"

// db connect
const host = config.database.connection.host;
const port = config.database.connection.port;
const dbName = config.database.connection.database;
const client = config.database.client;
const database = `${client}://${host}:${port}/${dbName}`;
mongoose.connect(database, {useNewUrlParser: true} , (err) => {
    if (err) console.log(err);
})

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json());

app.use('/users', userRoute);

app.listen(config.api.port, () => {
  console.log('*** Server Started ***');
});