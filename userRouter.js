const userRouter = require('express')();

const users = [
    {
        name: 'Vladi',
        pwd: 123
    },
    {
        name: 'George',
        pwd: 456
    }
];
userRouter.get('/', (req, res) => {
    res.json(users);
});

module.exports = userRouter;
