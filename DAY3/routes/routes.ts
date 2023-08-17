import { Router } from 'express';
import * as userController from '../controller/user';
import * as postController from '../controller/posts';
import * as commentsController from '../controller/comments';

const router = Router();

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostWithComments); 

router.get('/comments', commentsController.getComments);
router.get('/posts/:id/comments', commentsController.getComment);

router.get('/users', userController.getUsers); 

export default router;     