const express = require('express');


const userController = require('../controller/user'); 
const postController = require('../controller/posts'); 
const commentsController = require('../controller/comments'); 

const router = express.Router();

router.get('/posts', postController.getPosts);

router.get('/comments', commentsController.getComments); 
router.get('/posts/:id/comments', commentsController.getComment); 

router.get('/users', userController.getUsers);


module.exports = router;