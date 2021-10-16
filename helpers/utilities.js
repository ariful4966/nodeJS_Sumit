//Module scaffolding
const crypto = require("crypto");

const utilities = {};
const environments = require("./environment");

//parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch (e) {
    output = {};
  }
  return output;
};

//parse JSON string to Object
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", environments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

//export module
module.exports = utilities;
