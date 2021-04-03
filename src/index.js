const mongoose = require('mongoose');
const { app } = require('./app.js');
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
  } catch (e) {
    console.error(e);
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`service running on port ${PORT}`);
  });
};

start();
