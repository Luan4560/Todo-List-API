import jwt from "jsonwebtoken";

const authenticateJWT = (request, response, next) => {
  const token =
    request.cookies.token || request.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return response.status(403).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    request.user = decoded;
    next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid Token" });
  }
};

export default authenticateJWT;
