const express = require("express");

//Make the database connection
const database = require("./database.js");

const wikiRoutes = require("./routes/wiki.js");

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));

app.use("/api/wiki", wikiRoutes);


app.listen(3000);