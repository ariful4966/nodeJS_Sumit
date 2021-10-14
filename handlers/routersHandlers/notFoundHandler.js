const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requiested URL was not found'
    });
  console.log("Not Found");
};

module.exports = handler;