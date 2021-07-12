import jwt from "jsonwebtoken";

const secret = "hinduraj";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // if length is less than 500 then it'sour custom auth'

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret); // we'll get actual registered user data

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
