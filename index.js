const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const validationResult = Joi.validate(req.body, schema);

    if (validationResult.error) {
        // 400 Bad Request
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }

    const newId = courses.length + 1;
    const newName = req.body.name;
    const course = {
        id: newId,
        name: newName
    };

    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        res.status(404).send(`No course for ID ${id}!`);
    }
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
        res.status(404).send(`No course for ID ${id}!`);

    } else {
        const schema = {
            name: Joi.string().min(3).required()
        };

        const validationResult = Joi.validate(req.body, schema);

        if (validationResult.error) {
            res.status(400).send(validationResult.error.details[0].message);
        } else {
            const newName = req.body.name;
            course.name = newName;
            res.send(course);
        }
    }
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});