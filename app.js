const express = require('express');
const mongoose = require('mongoose');
const { post } = require('./route/posts');

const bodyParser = require('body-parser');


require('dotenv/config')
const postRout = require('./route/posts');
const authUser = require('./route/auth');

const app = express();

app.use(bodyParser.json())


app.use('/posts',postRout);
app.use('/api/user/',authUser);

mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology : true, useNewUrlParser:true},
    () => console.log('Database connected!')
);

//Rountes
app.get("/",(req,res) => {
    res.send("Hello Codes");
});

app.listen(3000);