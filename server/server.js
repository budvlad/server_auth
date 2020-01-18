const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
const mLab =
  "mongodb://<grasputin>:<qwedcxza2S>@ds213229.mlab.com:13229/db_myproj";

mongoose.Promise = global.Promise;
mongoose.connect(mLab || "mongodb://127.0.0.1:27017/auth", {
  useNewUrlParser: true
});

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");
app.use(bodyParser.json());
app.use(cookieParser());

//В Postman формируем post запрос http://127.0.0.1:3000/api/user
//В Headers Content-Type ---- application/json
//В Body  raw --- {"email":"vlad@gmail.com", "password":"password123"}
//push Send
app.post("/api/user", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});
app.post("/api/user/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) res.json({ message: "Auth failed, user not found" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        return res.status(400).json({
          message: "Wrong password"
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).send("OK");
      });
    });
  });
});

app.get("/user/profile", auth, (req, res) => {
  res.status(200).send(req.token);
});
app.get("/", (req, res) => {
  res.status(200).send("Hi, into heroku!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
