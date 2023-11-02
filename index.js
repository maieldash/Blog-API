import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET a specific post by id
app.get("/posts/:id", (req, res) => {
  console.log("get one");
  let post = posts.find((p) => p.id === parseInt(req.params.id));
  console.log(post);
  if (!post) res.status(404).json({ message: `No post with the specified id is found` });
  else res.status(200).json(post);
});

//GET All posts
app.get("/posts", (req, res) => {
  console.log("get all");
  res.status(200).json(posts);
});


//POST a new post
app.post("/posts", (req, res) => {
  try {
    let newPost = {
      id: lastId + 1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: req.body.date,
    }
    posts.push(newPost);
    lastId++;
    res.json(newPost);
    
  }
  catch (error) {
    res.json({ error: error.message });
  }
});

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) res.status(404).json(`post with id ${id} is not found so no post is deleted.`);
  else {
    posts.splice(postIndex, 1);
    res.status(200).send("the post is updated successfully");
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
