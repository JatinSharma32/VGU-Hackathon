const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();

//database connect
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jatin",
});

connection.connect((error) => {
  if (error) {
    console.log("Problem connecting to Database: " + error);
  } else {
    console.log("Connected to Database;");
  }
});

//template engine setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public", "home"), {
    UserName: `${""}`,
  });
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "store.html"));
});

app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "team.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/reg", (req, res) => {
  res.render(path.join(__dirname, "public", "reg"), {
    Message: "",
  });
});

app.post("/reg", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  connection.query(
    `INSERT INTO hackthon VALUES("${name}","${email}","${password}");`,
    (error) => {
      if (error) {
        console.log("Problem inserting to Database: " + error);
        res.render(path.join(__dirname, "public", "reg"), {
          Message: "!!Problem In Database!!",
        });
      } else {
        console.log("1 item inserted");
        res.render(path.join(__dirname, "public", "home"), {
          UserName: `Welcome ${name}`,
        });
      }
    }
  );
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "public", "login"), {
    Message: "",
  });
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  console.log(req.body);
  connection.query(
    `SELECT * FROM hackthon WHERE name="${name}" AND password="${password}";`,
    (error, results) => {
      if (error) {
        console.log("Problem inserting to Database: " + error);
        res.render(path.join(__dirname, "public", "login"), {
          Message: "!!Problem in Database!!",
        });
      } else {
        if (results[0] == undefined) {
          console.log("Provide correct information");
          res.render(path.join(__dirname, "public", "login"), {
            Message: "Username/Password Not matching",
          });
        } else {
          if (results[0].name == name && results[0].password == password) {
            res.render(path.join(__dirname, "public", "home"), {
              UserName: `Welcome ${name}`,
            });
          } else {
            console.log("Provide correct information");
            res.render(path.join(__dirname, "public", "login"), {
              Message: "Username/Password Not matching",
            });
          }
        }
      }
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pnf404.html"));
});

app.listen(800, () => {
  console.log("Server started at port 200...");
});
