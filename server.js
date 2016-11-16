const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/DataBaseUtils');

const PORT = process.env.PORT || 8080;

const app = express();

db.setUpConnection();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(methodOverride());

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({ 'error': message, 'reason': reason });
}

app.get('/todos', (req, res) => {
    db.listTodos()
        .then(todos => res.send(todos))
        .catch(error => handleError(res, error.message, 'Failed to get todos'));
});

app.post('/todos', (req, res) => {
    db.createTodo(req.body)
        .then(todo => res.send(todo))
        .catch(error => handleError(res, error.message, 'Failed to post todo'));
});

app.put('/todos/:id', (req, res) => {
   db.toggleTodo(req.params.id)
       .then(todo => res.send(todo))
       .catch(error => handleError(res, error.message, 'Failed to update todo'));
});

app.delete('/todos/:id', (req, res) => {
    db.deleteTodo(req.params.id)
        .then(todo => res.send(todo))
        .catch(error => handleError(res, error.message, 'Failed to delete todo'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});