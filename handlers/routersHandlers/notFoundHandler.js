const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested URL was not found'
    });
  console.log("Not Found");
};

module.exports = handler;