const express = require('express');
const router = express.Router();
const Post = require('../model/Post')
const authVerification = require('../route/authToken');

router.use(authVerification);

router.get('/', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.get('/:postId', async (req,res)=>{
    try{
        const getPost = await Post.findById(req.params.postId );
        res.json(getPost);
    }catch(err){
        res.json({message:err});
    }
});

router.delete('/:postId', async (req,res)=>{
    try{
        const deletePost = await Post.deleteOne({_id:req.params.postId} );
        res.json(deletePost);
    }catch(err){
        res.json({message:err});
    }
});

router.patch('/:postId', async (req,res)=>{
    try{
        const updatePost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{title:req.body.title}}
             );
        res.json(updatePost);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/', async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    try{
        const savePost = await post.save();
        res.json(savePost);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;