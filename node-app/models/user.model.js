const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  name: {
    first: String,
    last: String
  },
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency"
  },
  active: Boolean
});

UserSchema.virtual('fullName').get(function() {
  return this.name.first + " " + this.name.last;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
