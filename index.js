require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
//DB connection
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");


const app = express();


//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//Mount routers
app.use("/api/v1/bootcamps",bootcamps);
app.use("/api/v1/courses",courses);
app.use("/api/v1/auth",auth);

//Error handler
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on ${process.env.NODE_ENV} port ${process.env.PORT} !`);
});

//handle rejection
process.on('unhandledRejection',(err,Promise) => {
console.log(`unhandled Rejection : ${err.message} `)
server.close(()=> process.exit(1));
});