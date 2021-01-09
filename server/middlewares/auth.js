const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  console.log(req.body);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};

exports.authUser = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email }).exec();
    req.user._id = user._id;
    next();
  } catch (error) {
    console.log(error);
  }
};
