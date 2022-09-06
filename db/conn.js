const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
//The Database connection to Database - test is made using imported connection string from config.env file

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('test');
    dbConnection.listCollections().toArray(function(err, names) {   
        if(!err) {
            console.log(names);
            //Logging Table names to get a live read on DB - Also used MongoDB extension for VSCode to connect
        }
    });
      console.log('Successfully connected to MongoDB.');
      //Log Successful Connection

      return callback();
    });
  },

  //exports getDb as user defined function to return the dbConnection
  getDb: function () {
    return dbConnection;
  },
};
