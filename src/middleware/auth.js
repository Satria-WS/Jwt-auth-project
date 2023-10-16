import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
  req.body.token || req.query.token ||  req.headers["x-access-token"];
  // console.log(config.TOKEN_KEY)
  
  if (!token) {
    return res.status(403).send("Token required")
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    req.user = decoded;
  } catch (error) {
    console.log(error)
    return res.status(401).send("invalid Token")
  }
  return next();
}

export default verifyToken;