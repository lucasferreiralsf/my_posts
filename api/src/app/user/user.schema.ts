import { Schema, Document, model } from "mongoose";
import * as bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
import postSchema from "../post/post.schema";


type CustomMethods = {
  comparePassword: Function;
};

export interface IUser extends Document, CustomMethods {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favoriteBooks?: string[];
}

const User = new Schema<IUser & CustomMethods>(
  {
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },
    
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],

    favoritePosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

User.pre("save", function(this: any, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

User.pre("remove", function(next) {
  postSchema
    .deleteMany(
      { owner: this._id }
    ) //if reference exists in multiple documents
    .exec();
  next();
});

User.methods.comparePassword = function(plaintext: string, callback: any) {
  return bcrypt.compare(plaintext, this.password);
};

User.plugin(mongoosePaginate);

export default model("User", User);
