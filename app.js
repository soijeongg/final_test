import express from "express"

import postrouter from "./routes/posts.router.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", postrouter)

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
