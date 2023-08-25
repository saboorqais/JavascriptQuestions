import { Router } from "express";
import { getComment, getComments } from "../controller/comments";

const commentsRoute = Router();

commentsRoute.get(`/`, getComments);

commentsRoute.get(`/:id`, getComment);

export default commentsRoute;
