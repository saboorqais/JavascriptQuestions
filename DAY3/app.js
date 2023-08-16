//imports
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/routes'); 


const app = express()
const port = 3003


//middleWares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));     



app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})