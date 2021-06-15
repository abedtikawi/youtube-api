const Users = require("../../models/users");

module.exports = async (req, res) => {
  try {



    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("-- Error in createUser.js");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
