import express, { Router } from "express";
import { router } from "./routes/userRoutes.js";
import methodOverride from "method-override";

import { connectDB } from "./config/db.js";

const app = express();
connectDB();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(router);


app.listen(5000, () => {
     console.log("Server running at http://localhost:5000");
});
