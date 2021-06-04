var mongoose = require('mongoose');
var config = require('./config.js');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

var connectWithRetry = function() {
  mongoose.connect(config.MONGO_URL, options);

  mongoose.connection.on('error', function(err) {
      console.log("Error in connecting to db " + err);

      setTimeout(connectWithRetry, 5000);
  });
}
connectWithRetry();

mongoose.connection.once('open', function(err) {
    console.log("Connected to mongoose db");
});


module.exports = mongoose;
