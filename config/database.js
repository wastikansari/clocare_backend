import mongoose from "mongoose";
import mysql from "mysql";
import { DB_URL } from "./index";

const DbConnect = {
  async MongoDbConnect() {
    // Database connection
    mongoose.connect(DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("MongoDB connecteds...");
    });
  },

//   async MysqlDbConnect() {
//     const mysqldb = mysql.createConnection({
//       host: "https://www.theclo.care/lo",
//       user: "thecl.care_db",
//       password: "DvSwQ2%mo1pld$b7",
//       database: "thecl.care_db",
//       connectTimeout: 20000,
//     });

//     // Connect to the database
//    const dd= mysqldb.connect();
//     console.log(`Connected to MySQL database ${dd}`);
//   },
};

export default DbConnect;
