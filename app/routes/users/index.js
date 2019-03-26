const express = require('express');

const userController = require('./controller');

const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getOneUser)
    .post('/', userController.createUser)
    .delete('/:id', userController.deleteUser)
    .put('/:id', userController.updateUser)

module.exports = router;