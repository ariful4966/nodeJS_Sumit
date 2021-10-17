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

//Create Random String
utilities.createRandomString = (strLength) => {
  let length = strLength;
  length = typeof strLength === "number" && strLength > 0 ? strLength : false;
  if (length) {
    let possibleCharacters = "abcdefghijklmmopqrstuvwxyz1234567890";
    let output = "";
    for (let i = 1; i <= length; i += 1) {
      let randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      output += randomCharacter;
    }
    return output;
  } else {
    return false;
  }
};

//export module
module.exports = utilities;
