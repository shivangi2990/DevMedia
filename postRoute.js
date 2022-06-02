const express = require('express')
const router = express.Router()
const { cloudinary } = require('../cloudinary')
const Post = require('../models/postModel')
const moment = require('moment')
router.post('/addpost', async (req, res) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: 'DevMedia',
      use_filename: true,
    })
    req.body.image = uploadResponse.url

    const newpost = new Post(req.body)

    await newpost.save()

    res.send('Post added Successfully')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.get('/getallposts', async (req, res) => {
  try {
    const posts = await Post.find().populate('user')

    res.send(posts)
  } catch (error) {
    return res.status(400).json(error)
  }
})
router.post('/likeorunlikepost', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid })
    var likes = post.likes
    if (likes.find((obj) => obj.user == req.body.userid)) {
     const temp = likes.filter((obj) => obj.user.toString() !== req.body.userid)
      post.likes = temp
      await Post.updateOne({ _id: req.body.postid }, post)
      res.send('Post Unliked Successfully')
    } else {
      likes.push({ user: req.body.userid, date: moment().format('MM DD YYYY') })
      post.likes = likes

      await Post.updateOne({ _id: req.body.postid }, post)
      res.send('Post Liked Successfully')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})


router.post('/addcomment', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postid })
    var comments = post.comments
    comments.push({user :req.body.userid, date:moment().format('MM DD YYYY'),comment : req.body.comment})
      post.comments = comments
      await Post.updateOne({ _id: req.body.postid }, post)
      res.send('Comment Added Successfully')
    
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
});

module.exports = router
