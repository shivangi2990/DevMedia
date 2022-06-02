const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv:Shivangii:<shivangi@918>@cluster0.apt2e.mongodb.net/DevMedia',()=>{
    console.log("Connection Successful");
});