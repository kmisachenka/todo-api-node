require('../models/Todo');

const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

module.exports.setUpConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://db:27017/todos');
};

module.exports.listTodos = () =>  {
    return Todo.find();
};

module.exports.createTodo = (data) => {
    const todo = new Todo({
        todo: data.todo
    });
    return todo.save();
};

module.exports.deleteTodo =(id) => {
    return Todo.findById(id).remove();
};

module.exports.toggleTodo = (id) => {
    return Todo.findOneAndUpdate({ _id: id }, { $set: { completed: true } }, { new: true });
};




