const mongoose = require('mongoose');
const { app } = require('./app.js');

const server = require('http').Server(app);

let io = require('socket.io')(server);

const start = async () => {
  console.log('starting up ......');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to mongodb');

    io.on('connection', (socket) => {
      console.log('socket connected');

      // for playing music .. pass the path and name of audio file
      socket.on('play', (playMsg) => {
        console.log('emitted play event');
        io.emit('play', playMsg);
      });

      // for stopping the audio file
      socket.on('stop', (stopMsg) => {
        console.log('emitted stop event');
        io.emit('stop');
      });

      // messages on the music channel (pass the message and the date)
      socket.on('music_message', (message) => {
        io.emit('music_message', message);
      });

      // messages on the channel message
      socket.on('channel_message', (message) => {
        io.emit('channel_message', message);
      });
    });
  } catch (e) {
    console.error(e);
  }
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`service running on port ${PORT}`);
  });
};

start();
