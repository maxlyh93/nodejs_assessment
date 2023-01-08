import axios from "axios";

export const searching = async (req, res) => {
  // const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const documents = [
    {
      id: 1,
      title: "Node.js is awesome",
      content:
        "Node.js is a powerful JavaScript runtime that is used to build scalable server-side applications...",
    },
    {
      id: 2,
      title: "JavaScript is fun",
      content:
        "JavaScript is a programming language that is used to build interactive web applications...",
    },
  ];

  const index = {};

  comments.data.forEach((comment) => {
    //split every word, then concat title and content
    const words = comment.name
      .split(" ")
      .concat(comment.email.split(" "))
      .concat(comment.body.split(""));
    words.forEach((word) => {
      if (!index[word]) {
        index[word] = [];
      }
      index[word].push(comment.id);
    });
  });

  console.log(index);

  //   Result of console.log

  //   {
  //     "Node.js": [1],
  //     "is": [1, 2],
  //     "awesome": [1],
  //     "JavaScript": [1, 2],
  //     "fun": [2],
  //     "a": [1, 2],
  //     "powerful": [1],
  //     "runtime": [1],
  //     "that": [1, 2],
  //     "used": [1, 2],
  //     "to": [1, 2],
  //     "build": [1, 2],
  //     "scalable": [1],
  //     "server-side": [1],
  //     "applications...": [1],
  //     "programming": [2],
  //     "language": [2],
  //     "interactive": [2],
  //     "web": [2],
  //     "applications...": [2]
  //   }

  //   Then, when you receive a search query, you can look up the relevant document IDs in the index and retrieve the corresponding documents:

  const searchTerm = req.body.word;
  const searchResults = comments.data.filter((doc) =>
    index[searchTerm].includes(doc.id)
  );

  console.log(searchResults);
  res.json(searchResults);
};
