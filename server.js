const path = require('path')
const http = require('http')
const express = require('express') 
const favicon = require('serve-favicon')
//
const utilData = require('./utilData')

const PORT = process.env.PORT || 3000

const app = express()
const router = express.Router()

router.get('*', function(req, res) {
    res.json(utilData)
})

app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

const server = http.createServer(app)

server.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}, Ctrl+C to stop`)
})
