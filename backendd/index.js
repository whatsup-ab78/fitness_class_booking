const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;
const FitnessClassController=require('./controller/FitnessClassController')
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fitnesscatalog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err.message));



app.get('/', (req, res) => {
    res.send('Connected to MongoDB!');
});

const fitnessroute=require('./routes/fitnessroute')
app.use('/api/fitness',fitnessroute)

const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});