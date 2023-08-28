import {Router} from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import commentsRoute from "./commentRoutes";
//Don't Import File as whole

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentsRoute);

export default router;
