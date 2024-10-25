import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@curso-node.vz6hc.mongodb.net/?retryWrites=true&w=majority&appName=curso-node`
    )
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Err", err));
};

export default connectToDatabase;
