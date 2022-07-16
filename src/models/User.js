import mongoose from "mongoose";
import bcyrpt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcyrpt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
