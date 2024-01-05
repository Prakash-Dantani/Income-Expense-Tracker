const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

require("./startup/routes")(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App Listening on Port http://localhost:${port}`));