// Create a web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

// Get all comments
app.get("/comments", function (req, res) {
  fs.readFile("comments.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading comments.json");
      return;
    }
    res.send(data);
  });
});

// Add a new comment
app.post("/comments", function (req, res) {
  const newComment = req.body;
  fs.readFile("comments.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading comments.json");
      return;
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile("comments.json", JSON.stringify(comments), function (err) {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing comments.json");
        return;
      }
      res.send("Comment added");
    });
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});