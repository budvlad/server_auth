//test module bcrypt and hashed password
const bcrypt = require("bcrypt");
const { MD5 } = require("crypto-js");
const jwt = require("jsonwebtoken");

// bcrypt.genSalt(10, (err, salt) => {
  //console.log(salt);
  // if (err) return next(err);

  // bcrypt.hash("password123", salt, (err, hash) => {
  //   if (err) return next(err);
  //   console.log(hash);
  // });

  // const secret = "mysecretpassword";
  // const secretSalt = "dfsdfsdfsdfsdfdsfsdfsddfdsf";
  // const user = {
  //   id: 1,
  //   token: MD5("SDFSDFSDFSDFSDF ").toString() + secretSalt
  // };

  // const receivedToken =
  //   "9aab047d43129b1d9490e94c1a98f9dbdfsdfsdfsdfsdfdsfsdfsddfdsf";
  // if (receivedToken === user.token) {
  //   console.log("move foeward");
  // }

  // console.log(user);

  const id = "1000";
  const secret = "supersecret";

  const receivedToken =
    "eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y";
  const token = jwt.sign(id, secret);
  const decodeToken = jwt.verify(receivedToken, secret);

  console.log(decodeToken);
});
