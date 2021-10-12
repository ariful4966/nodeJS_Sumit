/*
Title: Quotes Library
Description: Utility library for getting a list of Quotes
Author: Ariful Islam Raju
Date: 12-10-2021
*/

// Dependencies
const fs = require("fs");

// Quotes object - Module scaffolding
const quotes = {};

//Get all the quotes and return them to the user
quotes.allQuotes = function allQuotes() {
  //Read the text file containing the quotes
  const fileContents = fs.readFileSync(`${__dirname}/quotes.txt`, "utf-8");

  // Turn the string into a array
  const arrayOfQuotes = fileContents.split(/\r?\n/);

  // return the array
  return arrayOfQuotes;
};

module.exports = quotes;
