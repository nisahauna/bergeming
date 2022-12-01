const Post = require("../models/posts");
const fs = require("fs");

module.exports = class API {
  // fetch all post

  static async fetchPostByDate(req, res) {
    const searchDate = req.params.dateCode;
    try {
      const posts = await Post.find({ dateCode: searchDate });
      res.status(200).json(posts);
    } catch (Err) {
      res.status(404).json({ message: Err.message });
    }
  }

  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (Err) {
      res.status(404).json({ message: Err.message });
    }
  }

  // fetch post by ID
  static async fetchPostByID(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // create a post
  static async createPost(req, res) {
    const post = req.body;
    const imagename = req.file.filename;
    console.log(post.createdAt);
    const postDate = dateToDateCode(post.createdAt);

    post.image = imagename;
    post.dateCode = postDate;
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post creates successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // update a post
  static async updatePost(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image;

    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // delete a post
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

function dateToDateCode() {
  var dd = String("0"+new Date().getDate());
  var mm = String(new Date().getMonth());
  var yyyy = String(new Date().getFullYear());
  
  console.log(dd);

  return mm + dd + yyyy;
}
