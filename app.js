const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const dotenv     = require('dotenv');

//config dotenv file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(bodyParser.json());

//database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log('MongoDB connected successfully!'))
        .catch(err => console.log(err));


//routes
const authRoutes  = require('./routes/auth');
const userRoutes  = require('./routes/user');
const newsRoutes  = require('./routes/news');    

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/news',newsRoutes);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;