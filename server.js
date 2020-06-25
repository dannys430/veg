const express = require('express')

const app = express();

const server = app.listen(3000, console.log('listening...'))

app.get('/', (req, res) => {
  req.body('https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv')
  // res.send('hello')
})

app.use(express.static('frontend'))