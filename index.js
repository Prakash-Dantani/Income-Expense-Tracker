const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const bodyParser = require('body-parser');
require("./startup/dbConfig");
const app = require('./src/app');


var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus:200
}));

require("./startup/routes")(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App Listening on Port http://localhost:${port}`));