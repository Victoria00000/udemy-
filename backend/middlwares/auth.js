const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";

    !token ?? res.status(400).json({ message: "This authentification is invalid." })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      err ?? res.status(400).json({ message: "This authentification is invalid." })
      req.user = user;
      next();
    });

  } catch (error) { return res.status(500).json({ message: error.message })}
};
