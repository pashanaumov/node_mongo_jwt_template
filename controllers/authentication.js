const jwt = require("jwt-simple");
const User = require("../models/User");
const keys = require("../config/keys");

const generateToken = user => {
  // sub == id === user
  // iat === issued at
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtSecretString);
};

exports.signUp = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password"
    });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use" });
    }

    const user = await new User({
      email: email,
      password: password
    }).save();

    res.json({ user, token: generateToken(user) });
  } catch (error) {
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { user } = req;
  res.send({ token: generateToken(user) });
};
