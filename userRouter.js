const userRouter = require("express")();
const { append, cookie } = require("express/lib/response");
// const bcrypt = require('brcypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

let users = [
  {
    name: "Vladi",
    pwd: "123",
  },
  {
    name: "George",
    pwd: "456",
  },
];

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); //Forbidden!
    }
    req.user = decoded.name;
    next();
  });
};

userRouter.get("/", verifyJwt, (req, res) => {
  res.send("Hello! :)");
});

userRouter.post("/register", (req, res) => {
  const { name, pwd } = req.body;
  // const hashedPwd = await bcrypt.hash(pwd, 10);
  const foundUser = users.find((user) => user.name === name);
  if (foundUser) {
    return res.status(409).send("Name already in use. Choose another.");
  }
  users.push({
    name,
    pwd,
  });
  res.json(users);
});

userRouter.post("/login", async (req, res) => {
  const { name, pwd } = req.body;
  const foundUser = users.find((user) => user.name === name);
  if (!foundUser) {
    return res.sendStatus(401);
  }
  if (foundUser.pwd !== pwd) {
    return res.sendStatus(401);
  }
  // Create jwt
  // res.send('Logged in...');
  const accessToken = jwt.sign(
    { name: foundUser.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "40s" }
  );
  const refreshToken = jwt.sign(
    { name: foundUser.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const currentuser = { ...foundUser, refreshToken };
  const otherUsers = users.filter((user) => user.name !== foundUser.name);
  users = [...otherUsers, currentuser];

  // We send our refreshToken in a cookie, which is not accessible with js, it is http only
  // and we also keep it in our 'db', so we can access it when needed
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // On frontend we should store it in memory, not with js
  // We send our accessToken as json
  res.json({ accessToken });
});

// It is a get route for refresh
userRouter.get("/refresh", (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = users.find((user) => user.refreshToken === refreshToken);
  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.name !== foundUser.name) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign({ name: decoded.name }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "40s",
    });
    res.json({ accessToken });
  });
});

module.exports = userRouter;
