const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = require('./db/connect');
db.createConnection();

app.use('/api/v1', require('./routes/routes.js'));

app.listen(process.env.PORT, function(){
    console.log('Server running' + process.env.PORT);
});