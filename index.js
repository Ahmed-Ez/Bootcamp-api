require('dotenv').config();
const express = require("express");

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Mount routers
app.use("/api/v1/bootcamps",bootcamps);

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on ${process.env.NODE_ENV} port ${process.env.PORT} !`);
});