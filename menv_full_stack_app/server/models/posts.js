const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    category: String,
    content: String,
    image: String,
    dateCode: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
