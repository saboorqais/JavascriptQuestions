import {Router} from "express";
import {getPosts} from "../controller/posts";

const postRoutes = Router();

postRoutes.get(`/`, getPosts);

export default postRoutes;
