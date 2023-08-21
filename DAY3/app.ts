//imports
require("dotenv").config();

import express from "express";
import router from "./routes/routes";

const app = express();

const port: number = 3003;

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
