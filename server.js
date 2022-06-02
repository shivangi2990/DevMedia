const express = require('express')

const app = express()
const dbConnection = require('./db')
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
const port = process.env.PORT || 5000
app.use(express.json({limit :'25mb'}))

app.use('/api/users',userRoute)
app.use('/api/posts', postRoute)




app.listen(port, () => console.log(`Server running on port ${port} `))
