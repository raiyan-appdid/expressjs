const express = require("express");
var cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "nodejs",
});

db.connect((err) => {
  if (err) {
    console.log("failed");
    console.log(err);
    console.log("failed");
  } else {
    console.log("connection successfull");
  }
});
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.status(200).send({
    id: 10,
    name: "raiyan",
  });
});

app.post("/example", function (req, res) {
  const { logo } = req.body;
  const { myname } = req.body;
  res.send({
    logo: "my name is " + logo,
    myname: `My surname is ${myname}`,
  });
});

app.post("/store", function (req, res) {
  console.log(req.body);
  const { title } = req.body;
  const { description } = req.body;

  let sql = `INSERT INTO posts(title, description) VALUES ('${title}', '${description}');`;
  db.query(sql, (err, result) => {
    if (err) {
      res.send("Column not created..");
      console.log(err);
    } else {
      res.send(result);
    }
    console.log(result);
  });
});

app.get("/all", function (req, res) {
  let sql = "select * from posts ORDER BY id DESC;";
  db.query(sql, (err, result) => {
    if (err) {
      res.send("Could not get");
    } else {
      res.send(result);
    }
  });
});

app.get("/detail/:id", function (req, res) {
  const { id } = req.params;
  let sql = `select * from posts where id = ${id}`;
  // let sql = "SELECT FIRST(title) AS title FROM posts where id = "+id+";";
  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Failed");
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", function (req, res) {
  const { id } = req.params;
  let sql = `DELETE FROM posts where id = ${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.send("Failed");
    } else {
      res.send("Deleted Successfully");
    }
  });
});

app.post("/update/:id", function (req, res) {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;
  let sql = `UPDATE posts SET title="${title}", description="${description}" where id=${id};`;
  db.query(sql, function (err, result) {
    if (err) {
      res.send("Failed");
      console.log(err);
    } else {
      res.send("Deleted Successfully");
    }
  });
  // res.send("Deleted Successfully");
});

app.get("/createdb", function (req, res) {
  let sql = "CREATE DATABASE nodejs";
  db.query(sql, (err, result) => {
    if (err) {
      res.send("Database not created..");
      console.log(err);
    } else {
      res.send("Database created..");
    }
    console.log(result);
  });
});

app.get("/createTable", function (req, res) {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), PRIMARY KEY (id));";
  db.query(sql, (err, result) => {
    if (err) {
      res.send("Table not Created");
      console.log(err);
    } else {
      res.send("table created");
    }
    console.log(result);
  });
});

app.listen("3000", () => {
  console.log("Server Started on 3000");
});
