import User from "../models/UserModel.js";
import axios from "axios";
// const axios = require("axios");

export const getPosts = async (req, res) => {
  try {
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

    const comments = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    var filterPosts = posts.data.filter(function (post) {
      return post.userId === 1;
    });

    // console.log(filterPosts);
    const event_speaker = posts.data.map(({ id, ...rest }) => ({
      id,
      ...rest,
      comments: comments.data.filter(({ postId }) => postId === id),
    }));

    // console.log(event_speaker);
    let response = [
      {
        post_id: "",
        post_title: "",
        post_body: "",
        total_number_of_comments: "",
      },
    ];

    // var temp = new Object();
    // temp["id"] = "po-0167";
    // temp["date"] = new Date(1980, 2, 24);
    // temp["quantity"] = 1;
    // temp["amount"] = 4;
    // temp["title"] = "A Book About Nothing";

    // bookorders.push(temp);

    // let data = [
    //   { id: 1, name: "John" },
    //   { id: 2, name: "Sara" },
    // ];

    // data.push({ id: 3, name: "Mike" });

    // console.log(data); // Outputs: [{id: 1, name: 'John'}, {id: 2, name: 'Sara'}, {id: 3, name: 'Mike'}]

    var ary = [];
    event_speaker.forEach((element) => {
      var sizeofCommnet = element.comments.length;
      ary.push({
        post_id: element.id,
        post_title: element.title,
        post_body: element.body,
        total_number_of_comments: sizeofCommnet,
      });
    });
    console.log(ary);
    res.json(ary);
    // res.json(event_speaker);
    // let arrays = [];
    // event_speaker.array.foreach((element) => {
    //   arrays.push(element.title);
    // });
    // res.json(arrays);
    // let result = posts.data.map((e) => ({
    //   ...e,
    //   comments: comments.data.filter(({ postId }) => postId === e.id),
    // }));

    // console.log(result);

    // axios.get("https://jsonplaceholder.typicode.com/posts").then((resp) => {
    //   console.log(resp.data);
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const inserteduser = await user.save();
    res.status(201).json(inserteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
