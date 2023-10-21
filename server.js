import express from "express";
import { APP_PORT, DB_URL } from "./config/index";
import errorHandler from "./middlewares/errorHandler";
import CustomErrorHandler from "./service/CustomErrorHandler";
import routes from "./routes";
import path from "path";
import cors from "cors";
import DbConnect from "./config/database";

const app = express();
var bodyParser = require("body-parser");

// Database connection
DbConnect.MongoDbConnect();

global.appRoot = path.resolve(__dirname);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

app.use("/", (req, res) => {
  res.send(`
  <h1>Welcome to Clocare</h1>
  You may contact me <a href="https://www.clocare.com/">here</a>
//   Or You may reach out to me for any question related to this Apis: wastik@gmail.com
  `);
});

app.use(errorHandler);
const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
