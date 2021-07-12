import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const secret = "hinduraj";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserPresent = await User.findOne({ email });

    if (!isUserPresent)
      return res
        .status(404)
        .json({ message: "User doesn't exist. Plz Create Account First" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: isUserPresent.email, id: isUserPresent._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: isUserPresent, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log(req.body);
  const { email, password, firstName, lastName } = req.body;

  try {
    const isUserPresent = await User.findOne({ email });

    if (isUserPresent)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log(result, token);
    res.status(201).json({ result, token });
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: "Something went wrong" });

    console.log(error);
  }
};
