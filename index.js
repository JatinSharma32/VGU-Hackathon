const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
let Username = "";

let auth = false; //for auth work

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

app.get("/home", (req, res) => {
  res.render(path.join(__dirname, "public", "home"), {
    UserName: `${Username}`,
  });
});

app.get("/", (req, res) => {
  if (auth == true) {
    res.render(path.join(__dirname, "public", "store"), {
      accountName: `${Username}`,
      Message: "",
    });
  } else {
    res.render(path.join(__dirname, "public", "store"), {
      accountName: "Login",
      Message: "",
    });
  }
  // res.sendFile(path.join(__dirname, "public", "store.html"));
  // Above line is for static file for ejs use render
});

app.get("/team", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "team.html"));
});

app.get("/contact", (req, res) => {
  if (auth == true) {
    res.render(path.join(__dirname, "public", "contact"), {
      UserName: `${Username}`,
      Message: "",
    });
  } else {
    res.render(path.join(__dirname, "public", "contact"), {
      UserName: "Login",
      Message: "",
    });
  }
});

app.get("/reg", (req, res) => {
  if (auth == true) {
    res.render(path.join(__dirname, "public", "reg"), {
      Message: `${Username}`,
    });
  } else {
    res.render(path.join(__dirname, "public", "reg"), {
      Message: "",
    });
  }
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
        auth == true;
        Username = name;
        res.render(path.join(__dirname, "public", "store"), {
          UserName: `${name}`,
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
            auth = true;
            Username = name;
            res.render(path.join(__dirname, "public", "store"), {
              accountName: `${name}`,
              Message: "",
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

app.get("/news", (req, res) => {
  if (auth == true) {
    res.render(path.join(__dirname, "public", "News"), {
      UserName: `${Username}`,
    });
  } else {
    res.render(path.join(__dirname, "public", "store"), {
      accountName: "Login",
      Message: "!!You need to Log In to use these services!!",
    });
  }
});

app.get("/weather", (req, res) => {
  if (auth == true) {
    res.render(path.join(__dirname, "public", "weather"), {
      UserName: `${Username}`,
    });
  } else {
    res.render(path.join(__dirname, "public", "store"), {
      accountName: "Login",
      Message: "You need to Log In to use these services",
    });
  }
});

app.get("/pro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pro.html"));
});

app.get("/coming", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comingSonn.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pnf404.html"));
});

app.listen(200, () => {
  console.log("Server started at port 200...");
});
