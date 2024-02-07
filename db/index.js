const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect(
  "mongodb+srv://bhatia4404:shivam%40123@project1.x666hrn.mongodb.net/firstProject"
);

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
