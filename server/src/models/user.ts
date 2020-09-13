import { IUser } from "./../types/user";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  }
)

export default model<IUser>("User", userSchema);