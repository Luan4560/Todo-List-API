import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import createSecretToken from "../token/generateToken.js";

const createUser = async (request, response) => {
  try {
    // Desustrutar dados
    if (
      !(
        request.body.email &&
        request.body.password &&
        request.body.name &&
        request.body.username
      )
    ) {
      response.status(400).send("All input is required");
    }

    const oldUser = await UserModel.findOne({ email: request.body.email });

    if (oldUser) {
      return response.status(409).send("User Already exist. Please Login");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = new UserModel({
      name: request.body.name,
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createSecretToken(user._id);

    response.cookie("token", token, {
      path: "/", // Cookie is accesisble from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });

    console.log("Cookie set successfully");

    response.json(user);
  } catch (err) {
    console.log("Got an error", err);
  }
};

export default createUser;
