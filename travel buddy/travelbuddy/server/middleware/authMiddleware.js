import admin from "../config/firebase.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // contains uid, email, name, etc.
    return next();
  } catch (err) {
    console.error("Auth error", err);
    return res.status(401).json({ message: "Unauthorized or token invalid" });
  }
};
