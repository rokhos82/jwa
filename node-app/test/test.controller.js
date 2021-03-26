exports.allAccess = (req, res) => {
  console.log("All Access");

  if(!req.session.views) {
    req.session.views = {};
  }

  req.session.views['/test/all'] = (req.session.views['/test/all'] || 0) + 1;

  res.status(200).send(`Public Content. Viewed ${req.session.views['/test/all']} times.`);
};

exports.userAccess = (req, res) => {
  console.log("User Access");
  res.status(200).send(`User Content. ${req.userId}`);
};

exports.adminAccess = (req, res) => {
  res.status(200).send("Admin Content.");
};
