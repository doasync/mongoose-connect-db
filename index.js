
const mongoose = require('mongoose');

// Use native promises (mongoose)
mongoose.Promise = global.Promise;

// Connection options
const defaultOptions = {
  // Use native promises (MongoDB driver)
  promiseLibrary: global.Promise,
  useMongoClient: true,
  // Write concern (Journal Acknowledged)
  w: 1,
  j: true
};

function connect (params = {}, options = {}) {
  // Merge options with defaults
  const driverOptions = Object.assign(defaultOptions, options);

  // Uri string param
  if (typeof params === 'string') {
    // eslint-disable-next-line no-param-reassign
    params = {dbURI: params};
  }

  // Default vars
  const {dbURI} = params;

  // Connect
  mongoose.connect(dbURI, driverOptions);

  return mongoose;
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

module.exports = connect;
