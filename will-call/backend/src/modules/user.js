import TeamMemberModel from "../models/teamMember.js";
import bcyrpt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const handleNewUser = async (req, res, next) => {
  const { userName, password, email } = req.body;
  if (!userName || !password)
    return res.status(400).send("missing required field");
  const dup = await TeamMemberModel.find({ userName, email });
  for (const user of dup) {
    if (user.userName === userName)
      return res.status(400).send("username already exists");
    if (user.email === email)
      return res.status(400).send("email already exists");
  }
  try {
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(password, salt);
    const newUser = await TeamMemberModel.create({
      userName,
      password: hashedPassword,
      email,
      branch_id: req.body.branch_id,
      image: req.body.image,
      permissions: req.body.permissions,
      refreshToken: req.body.refreshToken,
    });

    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const handleLogin = async (req, res) => {
  const { userName, password } = req.body;
  console.log("LOGIN POST", req.body);
  if (!userName || !password)
    return res.status(400).send("missing required field");

  const foundUser = await TeamMemberModel.findOne({ userName });
  console.log("foundUser", foundUser);
  if (!foundUser) return res.status(400).send("user not found");

  const validPassword = await bcyrpt.compare(password, foundUser.password);
  if (!validPassword) return res.status(400).send("invalid password");

  if (validPassword) {
    const accessToken = jwt.sign(
      { _id: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { _id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    console.log("refreshToken pushed to user", foundUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const user = {
      _id: foundUser._id,
      userName: foundUser.userName,
      branch_id: foundUser.branch_id,
      image: foundUser.image,
      permissions: foundUser.permissions,
      auth: accessToken
    };

    res.status(200).send({ user });
  }
};

const handleLogout = async (req, res) => {
  console.log("LOGOUT POST", req.body);
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.status(204).clearCookie("refreshToken", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  const refreshToken = cookies.refreshToken;
  const foundUser = await TeamMemberModel.findOne({ refreshToken });
  if (!foundUser) {
    return res.status(204).clearCookie("refreshToken", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  foundUser.refreshToken = "";
  console.log("foundUser", foundUser);
  await foundUser.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

export { handleNewUser, handleLogin, handleLogout };
