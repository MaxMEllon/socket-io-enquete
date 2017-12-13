const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0]

io.on('connection', (socket) => {
  socket.on('count', (params) => {
    scores[params.id] += 1
    io.emit('update', scores)
    console.log(scores)
  })
})

http.listen(3000, () => {
  if (process.env.NODE_ENV === 'development') console.log('accsess to localhost:3000')
})
