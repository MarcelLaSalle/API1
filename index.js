const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = require('./db/connect');
db.createConnection();

const myController = require('./controller/myController.js');

//req: request res: response
app.get('/', myController.get);

app.use('/api/v1/example', require('./routes/exRoutes.js'));

app.listen(process.env.PORT, function(){
    console.log('Server running' + process.env.PORT);
});