import { NextFunction, Request, Response } from "express";

import Post, { IPost } from "../post/post.schema";
import { HttpError } from "../../common/error-handler";
import userSchema, { IUser } from "../user/user.schema";

export class PostController {
  async all(request: Request, response: Response, next: NextFunction) {
    const page = request.query.page || 1;
    const limit = request.query.limit || 10;

    response.json(
      await Post.paginate(
        {},
        {
          page,
          limit,
          populate: [
            {
              path: "upVotes",
              select: ["_id", "firstName", "lastName", "email"]
            },
            { path: "owner", select: ["_id", "firstName", "lastName", "email"] }
          ]
        }
      )
    );
  }

  async one(
    request: Request & { user: IPost },
    response: Response,
    next: NextFunction
  ) {
    const post = await Post.findOne({ _id: request.params.id })
      .populate("owner", ["_id", "firstName", "lastName", "email"])
      .populate("upVotes", ["_id", "firstName", "lastName", "email"]);
    if (post) {
      response.json(post);
    } else {
      next(new HttpError("Not found", 404));
    }
  }

  async create(
    request: Request & { user: IUser },
    response: Response,
    next: NextFunction
  ) {
    try {
      const post: IPost = await Post.create({
        content: request.body.content
      });

      post.owner = request.user._id;
      await post.save();

      await userSchema.findOneAndUpdate(
        { _id: request.user._id },
        { $push: { posts: post._id } }
      );

      response.status(201).json(post);
    } catch (error) {
      next(new HttpError("Internal Error.", 500));
    }
  }

  async update(
    request: Request & { user: IPost },
    response: Response,
    next: NextFunction
  ) {
    let post: IPost = await Post.findOne({ _id: request.params.id });

    if (post) {
      if (post.owner.toString() === request.user._id.toString()) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: post._id },
          { content: request.body.content },
          { new: true, runValidators: true }
        )
          .populate("owner", ["_id", "firstName", "lastName", "email"])
          .populate("upVotes", ["_id", "firstName", "lastName", "email"]);
        // await post;
        response.status(200).json(updatedPost);
      } else {
        next(new HttpError("Unauthorized.", 401));
      }
    } else {
      next(new HttpError("Not found.", 404));
    }
  }

  async upVote(
    request: Request & { user: IPost },
    response: Response,
    next: NextFunction
  ) {
    let post: IPost = await Post.findOne({ _id: request.params.id });

    if (post) {
      const userUpVote = post.upVotes.find(
        element => element.toString() === request.user._id.toString()
      );
      console.log(post);
      if (userUpVote) {
        post = await Post.findOneAndUpdate(
          { _id: post._id },
          { $pull: { upVotes: request.user._id } },
          { new: true, runValidators: true }
        )
          .populate("owner", ["_id", "firstName", "lastName", "email"])
          .populate("upVotes", ["_id", "firstName", "lastName", "email"])
          .exec();

        await userSchema.findOneAndUpdate(
          { _id: request.user._id },
          { $pull: { favoritePosts: post._id } }
        );
      } else {
        post = await Post.findOneAndUpdate(
          { _id: post._id },
          { $push: { upVotes: request.user._id } },
          { new: true, runValidators: true }
        )
          .populate("owner", ["_id", "firstName", "lastName", "email"])
          .populate("upVotes", ["_id", "firstName", "lastName", "email"])
          .exec();
        await userSchema.findOneAndUpdate(
          { _id: request.user._id },
          { $push: { favoritePosts: post._id } }
        );
      }
      response.status(200).json(post);
    } else {
      next(new HttpError("Not found.", 404));
    }
  }

  async delete(
    request: Request & { user: IPost },
    response: Response,
    next: NextFunction
  ) {
    let post: IPost = await Post.findOne({ _id: request.params.id });

    if (post) {
      if (post.owner === request.user._id) {
        post = await post.remove();
        response.status(200).json({});
      } else {
        next(new HttpError("Unauthorized.", 401));
      }
    } else {
      next(new HttpError("Not found.", 404));
    }
  }
}
