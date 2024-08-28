const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/inotebook';

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error('Error while connecting:', err);
    }
  };

module.exports = connectToMongo;