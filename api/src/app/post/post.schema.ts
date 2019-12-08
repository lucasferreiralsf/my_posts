import { Schema, Document, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import userSchema from "../user/user.schema";

type CustomMethods = {
  comparePassword: Function;
};

export interface IPost extends Document, CustomMethods {
  content: string;
  owner: string;
  upVotes: string[];
}

const Post = new Schema<IPost & CustomMethods>(
  {
    content: {
      type: String,
      required: true
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    upVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Post.pre("remove", function(next) {
  userSchema
    .update(
      { posts: this._id },
      { $pull: { posts: this._id } },
      { multi: true }
    ) //if reference exists in multiple documents
    .exec();
  userSchema
    .update(
      { favoritePosts: this._id },
      { $pull: { favoritePosts: this._id } },
      { multi: true }
    ) //if reference exists in multiple documents
    .exec();
  next();
});

Post.plugin(mongoosePaginate);

export default model("Post", Post);
