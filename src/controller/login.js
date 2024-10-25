import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

import createSecretToken from "../token/generateToken.js";

configDotenv();

const login = async (request, response) => {
  const { email, password } = request.body;

  if (!(email && password)) {
    return response.status(400).json({ message: "All input is required!" });
  }

  const user = await UserModel.findOne({ email });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return response.status(404).json({ message: "Invalid credentials" });
  }

  const token = createSecretToken(user._id);

  response.cookie("token", token, {
    domain: process.env.FRONTEND_URL,
    path: "/", // Cookie is accesible from all parts
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true,
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });

  response.json({ token });
};

export default login;
