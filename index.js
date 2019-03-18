const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3, 4]);
});

app.get('/api/courses/:id', (request, response) => {
    response.send(request.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
    const result = { params: req.params, query: req.query };
    res.send(result);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});