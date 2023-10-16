import { config } from "dotenv";
import { connect } from "./config/database.js";
import User from "./model/user.js";
import express, { json } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

//router register
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    //if user already exist
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json("User email Already exist");
    }

    //encrypt password
    const encriptPass = await bcrypt.hash(password, 10);



    //create database user
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encriptPass,
   
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    //save user token
    user.token = token;

    //user
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//router login
app.post("/login", async (req, res) => {
  try {
    //get user input
    const { email, password } = req.body;

    //validate user

    if (!email & !password) {
      return res.status(400).send("All input must be required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      //save user
      user.token = token;

      return res.status(200).json({ data: user });
    }
    return res.status(400).send("invalid credential");
  } catch (error) {
    console.log(error);
  }
});

export default app;
