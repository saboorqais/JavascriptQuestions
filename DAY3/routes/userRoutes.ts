import { Router } from "express";

import { getUsers, getUsersPost } from "../controller/user";

const userRoutes = Router();


userRoutes.get(`/`, getUsers);

userRoutes.get(`/:id/posts`, getUsersPost);


export default userRoutes