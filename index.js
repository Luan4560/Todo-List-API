import express from "express";
import { configDotenv } from "dotenv";
import connectToDatabase from "./src/database/connect.js";
import routes from "./src/routes/routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const port = 8080;
const app = express();

configDotenv();
connectToDatabase();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use((request, response, next) => {
  response.header(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "DELETE"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  response.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
