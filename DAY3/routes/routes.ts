import { Router } from "express";
import * as userController from "../controller/user";
import * as postController from "../controller/posts";
import * as commentsController from "../controller/comments";

const router = Router();

router.get(`${process.env.BASE_POST_URL}`, postController.getPosts);

router.get(`${process.env.BASE_COMMENT_URL}`, commentsController.getComments);

router.get(
  `${process.env.BASE_COMMENT_URL}/:id`,
  commentsController.getComment
);

router.get(
  `${process.env.BASE_USER_URL}/:id${process.env.BASE_POST_URL}`,
  userController.getUsersPost
);
router.get(`${process.env.BASE_USER_URL}`, userController.getUsers);

export default router;
