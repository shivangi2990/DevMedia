const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.post('/register', async (req, res) => {
  try {
    const newuser = new User(req.body)
    await newuser.save()
    // console.log(req.body)
    return res.status(200).json({
      message: 'User register successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (user) {
        if (user.password == req.body.password) {
          return res.status(201).json({
            message: 'Login Successful',
            user,
          })
        } else {
          return res.status(301).json({
            message: 'Incorrect Login Credentials',
          })
        }
      } else {
        return res.status(401).json({
          message: "User doesn't exist",
        })
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.post('/followuser', async (req, res) => {
  const { currentuserid, receiveruserid } = req.body

  try {
    var currentuser = await User.findOne({ _id: currentuserid })
    var currentUserFollowing = currentuser.following
    currentUserFollowing.push(receiveruserid )
    currentuser.following = currentUserFollowing

    await User.updateOne({ _id: currentuserid }, currentuser)

    var receiveruser = await User.findOne({_id: receiveruserid })
    var receiverUserFollowers = receiveruser.followers
    receiverUserFollowers.push(currentuserid )

    receiveruser.followers = receiverUserFollowers

    await User.updateOne({ _id: receiveruserid }, receiveruser)
    res.send('Followed Successfully')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.post('/unfollowuser', async (req, res) => {
  const { currentuserid, receiveruserid } = req.body

  try {
    var currentuser = await User.findOne({ _id: currentuserid })
    var currentUserFollowing = currentuser.following
    const temp1= currentUserFollowing.filter((obj) => obj.toString() !== receiveruserid)
    // currentUserFollowing.push(receiveruserid )
    currentuser.following = temp1

    await User.updateOne({ _id: currentuserid }, currentuser)

    var receiveruser = await User.findOne({_id: receiveruserid })
    var receiverUserFollowers = receiveruser.followers
    const temp2 = receiverUserFollowers.filter((obj)=>obj.toString() !==currentuserid)

    receiveruser.followers = temp2

    await User.updateOne({ _id: receiveruserid }, receiveruser)
    res.send('Unfollowed Successfully')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})
module.exports = router
