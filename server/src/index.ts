import express from "express";
import cors from "cors";
import { mainRouter } from "./controller/MainController";

const app = express();
app.use(express.json());
app.use(cors());

app.use(mainRouter);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
