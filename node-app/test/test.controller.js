exports.allAccess = (req, res) => {
  console.log("All Access");
  res.status(200).send("Public Content.");
};

exports.userAccess = (req, res) => {
  console.log("User Access");
  res.status(200).send(`User Content. ${req.userId}`);
};

exports.adminAccess = (req, res) => {
  res.status(200).send("Admin Content.");
};
