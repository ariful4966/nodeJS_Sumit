/*
Title: Math Library
Description: Utility library for math-related functions
Author: Ariful Islam Raju
Date: 12-10-2021
*/

// Maht Object  - Module scaffoldng
const math = {};

math.getRandomNumber = function getRandomNumber(min, max) {
  let minimum = min;
  let maximum = max;
  minimum = typeof minimum === "number" ? minimum : 0;
  maximum = typeof maximum === "number" ? maximum : 0;
  return Math.floor(Math.random() * (maximum - minimum + 1) + min);
};

//Export the library
module.exports = math;
