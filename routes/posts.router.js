import express from "express";
import { prisma } from "../utils/index.js";
const router = express.Router()

const createNewPost = async (req, res) => {
  try {
    let { title, content } = req.body;
    let createOne = await prisma.posts.create({
      data: { title, content }
    });

    return res.status(200).json({
      id: createOne.id,
      title: createOne.title,
      content: createOne.content,
    });
  } catch (error) {
    return res.status(404).json({ errorMessage: error.message });
  }
}


const getAllPosts = async (req, res) => {
   try {
     let getOne = await prisma.posts.findMany()
     let post = getOne.map(post =>{
        return {
          id: post.id,
          title: post.title,
          content: post.content,
        };
     })
     return res.status(200).json( post );
   } catch (error) {
      return res.status(404).json({ errorMessage: error.message });
   }
};

const updatePost = async (req, res) => {
  try{
    let {postId} = req.params
    let{title, content} = req.body

    let checkId = await prisma.posts.findFirst({
        where:{id: +postId}
    })
    if(!checkId){
        return res(404).json({message: "존재하지 않는 포스트 입니다"})
    }
    let putOne = await prisma.posts.update({
        data:{title, content},
        where:{id:+postId}
    })
    return res.status(200).json({id:putOne.id, title: putOne.title, content: putOne.content})
}catch(error){
      return res.status(404).json({ errorMessage: error.message });

}};

const deletePostById = async (req, res) => {
try{
    let {postId} = req.params
    let checkId = await prisma.posts.findFirst({
        where:{id: +postId}
    })
    if(!checkId){
        return res(404).json({message: "존재하지 않는 포스트 입니다"})
    }

    await prisma.posts.delete({
        where:{id:+postId}
    })
    return res.status(200).json({message: "sucess"})
}catch(error){
     return res.status(404).json({ errorMessage: error.message });
}
};


router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePostById);


export default router;