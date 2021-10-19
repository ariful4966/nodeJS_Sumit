//dependencies
const data = require("../../lib/data");
const { hash, createRandomString } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environment");

//module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, {
      message: "Your method is not valid",
    });
  }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {
  //Validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    let token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;
    //Lookup the user phone by reading the token
    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        const userPhone = parseJSON(tokenData).phone;
        data.read("users", userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                let userObject = parseJSON(userData);
                let userChecks =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];
                if (userChecks.length < maxChecks) {
                  let checkId = createRandomString(20);
                  let checkObject = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCodes,
                    timeoutSeconds,
                  };
                  // save th e object
                  data.create("checks", checkId, checkObject, (err3) => {
                    if (!err3) {
                      // add check id to the user's object
                      userObject.checks = userChecks;
                      userObject.checks.push(checkId);
                      //save the new user data
                      data.update("users", userPhone, userObject, (err4) => {
                        if (!err4) {
                          //return the data about the new check
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            error: "There was a problem in the server site",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "There was a problem in the server site",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "user has already reached max check limit!",
                  });
                }
              } else {
                callback(403, {
                  error: "Authentication",
                });
              }
            });
          } else {
            callback(400, {
              error: "user not found",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication problem",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};
// @Todo Authentication
handler._check.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    //lookup the check
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        const token =
          typeof requestProperties.headersObject.token === "string"
            ? requestProperties.headersObject.token
            : false;

        tokenHandler._token.verify(
          token,
          parseJSON(checkData).userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              callback(200, parseJSON(checkData));
            } else {
              callback(403, {
                error: "Authentication Failure!",
              });
            }
          }
        );
      } else {
        callback(500, {
          error: "There was a server site error",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

// @Todo Authentication
handler._check.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;

  //Validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      data.read("checks", id, (err, checkData) => {
        if (!err && checkData) {
          let checkObject = parseJSON(checkData);
          const token =
            typeof requestProperties.headersObject.token === "string"
              ? requestProperties.headersObject.token
              : false;
          console.log(token);
          tokenHandler._token.verify(
            token,
            checkObject.userPhone,
            (tokenIsValid) => {
              if (tokenIsValid) {
                if (protocol) {
                  checkObject.protocol = protocol;
                }
                if (url) {
                  checkObject.url = url;
                }
                if (method) {
                  checkObject.method = method;
                }
                if (successCodes) {
                  checkObject.successCodes = successCodes;
                }
                if (timeoutSeconds) {
                  checkObject.timeoutSeconds = timeoutSeconds;
                }

                //store the checkObject
                data.update("checks", id, checkObject, (err2) => {
                  if (!err2) {
                    callback(200, {
                      message: "Successfully update the checks data",
                    });
                  } else {
                    callback(500, {
                      error: "There was a server side error!",
                    });
                  }
                });
              } else {
                callback(403, {
                  error: "Authentication Failure!",
                });
              }
            }
          );
        } else {
          callback(500, {
            error: "There was a problem in the server side!",
          });
        }
      });
    } else {
      callback(400, {
        error: "You must provide a least one field to update!",
      });
    }
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};
// @Todo Authentication
handler._check.delete = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    //lookup the check
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        const token =
          typeof requestProperties.headersObject.token === "string"
            ? requestProperties.headersObject.token
            : false;

        const checkObject = parseJSON(checkData);

        tokenHandler._token.verify(
          token,
          checkObject.userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              //delete the check data
              data.delete("checks", id, (err2) => {
                if (!err2) {
                  data.read(
                    "users",
                    checkObject.userPhone,
                    (err3, userData) => {
                      if (!err3 && userData) {
                        const userObject = parseJSON(userData);
                        let userChecks =
                          typeof userObject.checks === "object" &&
                          userObject.checks instanceof Array
                            ? userObject.checks
                            : [];

                        //remove the deleted check id from user's list of checks
                        let checkPosition = userChecks.indexOf(id);
                        if (checkPosition > -1) {
                          userChecks.splice(checkPosition, 1);
                          // update the users data
                          userObject.checks = checkPosition;
                          data.update(
                            "users",
                            userObject.phone,
                            userObject,
                            (err4) => {
                              if (!err4) {
                                callback(200, {
                                  message:
                                    "user update successfully without checks",
                                });
                              } else {
                                callback(500, {
                                  error: "There was a server side problem!",
                                });
                              }
                            }
                          );
                        } else {
                          callback(500, {
                            error:
                              "the check id that you are trying to remove is not found in user!",
                          });
                        }
                      } else {
                        callback(500, {
                          error: "There was a server site problem!",
                        });
                      }
                    }
                  );
                } else {
                  callback(500, {
                    error: "There was a server side problem!",
                  });
                }
              });
            } else {
              callback(403, {
                error: "Authentication Failure!",
              });
            }
          }
        );
      } else {
        callback(500, {
          error: "There was a server site error",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

module.exports = handler;
