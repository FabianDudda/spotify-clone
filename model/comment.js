import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
  spotifyId: String,
  username: String,
  text: String,
  date: String,
});

const Comments = models.comment || model("comment", commentSchema);

export default Comments;
