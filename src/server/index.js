const os = require('os');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

app.get('/api/user', (req, res) =>
  res.send({ username: os.userInfo().username })
);

// connect local mongo DB
const DB_CONNECTION_STRING = 'mongodb://localhost:27017/heard';
const mongoose = require('mongoose');
mongoose.connect(DB_CONNECTION_STRING);
const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.error(err));
dbConnection.once('open', () => console.log('DB connected'));

// routes
const testRouter = require('./routes/test');
app.use('/test', testRouter);

// sending undefined routes to index for client side routing
// this must be defined after other server side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// start server
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
