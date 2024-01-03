const express = require('express');
const authRoute = require("../routes/authRoute");

module.exports = function(app){
    app.use("/auth", authRoute);

    
    // app.use("*", (req, res) =>
    // res.status(404).json({ status: 500, message: "No Routes Found..!" })
    // );
    // app.use(error);
}