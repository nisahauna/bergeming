import axios from "axios";
const url = "/api/post";

export default class API {
  //to get all the post from the server
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  //to get single post by id
  static async getPostByID(id) {
    const res = await axios.get(`${url}/view/${id}`);
    return res.data;
  }
  //to insert post into database
  static async addPost(post) {
    const res = await axios.post(url, post);
    return res.data;
  }
  //to update post into database
  static async updatePost(id, post) {
    const res = await axios.patch(`${url}/view/${id}`, post);
    return res.data;
  }
  //to delete a post
  static async deletePost(id) {
    const res = await axios.delete(`${url}/view/${id}`);
    return res.data;
  }
  //to get posts by date
  static async getPostByDate(datecode) {
    const res = await axios.get(`${url}/${datecode}`);
    return res.data;
  }
}
