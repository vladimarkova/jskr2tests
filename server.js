const express = require('express');
const userRouter = require('./userRouter');
const app = express();

const PORT = process.env.PORT || 3000;
// Middlewares
app.use(express.static('public')); // Suppose we have a public directory
app.use(express.json()); // middleware to parse application/json content-type requests
// the content will be added to the req.body object and we can easily use it

const authorize = (req, res, next) => {
    if (req.body.name !== 'Vladi') {
        return res.status(401).send('Unauthorized!');
    }
    next();
};

app.use('/user', userRouter);

app.get('/', (req, res) => {
    console.log(req.url);
    res.send('Hello from server! :)');
})

app.use('/', authorize, (req, res) => {
    res.send('You connected with OK! :)');
})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));