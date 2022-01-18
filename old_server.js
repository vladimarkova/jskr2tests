const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write('some');
    res.end();
});

server.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));