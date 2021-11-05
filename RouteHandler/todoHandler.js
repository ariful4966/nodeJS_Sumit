const express = require('express');
const mongoose = require('mongoose');
const checkoutLogin = require('../Middleware/checkLogin');
const todoSchema = require('../Schemas/todoSchema');
const userSchema = require('../Schemas/userSchema');

// create model
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

const router = express.Router();
// Get All The todos
router.get('/', checkoutLogin, async (req, res) => {
    console.log(req.username, req.userId);
    try {
        await Todo.find({})
            .populate('user', 'name username -_id')
            .select({ __v: 0, _id: 0 })
            .limit()
            .then((result) => {
                res.status(200).send({
                    result,
                    message: 'You get all data',
                });
            });
    } catch (error) {
        res.status(500).send({
            error: 'Server side error!',
        });
    }
});
// Get Active todos
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).send({
        data,
    });
});
// Get inactive todos
router.get('/inactive', (req, res) => {
    const todo = new Todo();
    todo.findInactive((err, docs) => {
        if (err) {
            res.status(500).send({
                error: 'There was a server side error',
            });
        }
        res.status(200).send({
            data: docs,
        });
    });
});

// Get title js todos
router.get('/js', async (req, res) => {
    await Todo.findByJS()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((err) => {
            res.status(500).send({
                error: err.message,
            });
        });
});

// Get  todos by language
router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('react');
    res.status(200).send({ data });
});
// Get A todo by id
router.get('/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id }, { __v: 0 }, (err, result) => {
        if (err) {
            res.send(err.message);
        }
        res.send(result);
    });
});
// Post todo
router.post('/', checkoutLogin, async (req, res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId,
    });
    try {
        const todo = await newTodo.save();

        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    todos: todo._id,
                },
            },
            {
                new: true,
            }
        );
        res.status(200).send({
            result: todo,
            message: 'Todo was inserted Successfully!',
        });
    } catch (err) {
        res.send({
            error: err.message,
        });
    }
});
// Post Multiple todo
router.post('/all', (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).send({
                error: 'There was a server side error!',
            });
        }
        res.status(200).send({
            message: 'Todos were inserted successfully',
        });
    });
});

// Update todo

router.put('/:id', (req, res) => {
    Todo.updateOne({ _id: req.params.id }, { $set: req.body }, (err, result) => {
        if (err) {
            res.send(err.message);
        }
        res.send({
            result,
            message: 'Todo was update successfully',
        });
    });
});

// delete todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).send({
                    result,
                    message: 'Deleted successfully',
                });
            })
            .catch((error) => {
                res.status(400).send({
                    error: error.message,
                });
            });
    } catch (err) {
        res.status(500).send({
            message: 'Server side error!',
        });
    }
});

module.exports = router;
