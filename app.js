const express = require("express");
const path = require("path");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const templateRoutes = require("./routes/template");
const adminRoutes = require("./routes/admin");

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const User = require("./models/User");
var cors = require('cors')

const app = express();


const MONGODBURI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
  }@onlineshop-zsiuv.mongodb.net/${process.env.DATABASE_URL}`;



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/templates", templateRoutes);
app.use("/admin", adminRoutes);
// app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 4000;
mongoose
  .connect(MONGODBURI)
  .then(result => {
    app.listen(port);
    console.log("conncted...");
    // const io = require("./socket").init(server);

    // io.on("connection", socket => {
    // });
  })
  .catch(err => {
    console.log("err" + err);
  });
