// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     username: String,
//     email: String,
//     password: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;

import { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

interface IMethods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument, {}, IMethods>({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<IUserDocument, {}, IMethods>;
