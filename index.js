/*
Title: Basic Node App example
Description: Simple node-application thant print random quotes per second setInterval
Author: Aariful Islam
Date: 12/10/21
*/


//Dependencies
const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes')

// App Object - Module scaffolding
const app = {}

//Configuration
app.config = {
  timeBetweenQuotes : 1000,
}

//function that prints a random quote
app.printAQuote = function printAQuote(){

  //Get all the quotes
  const allQuotes = quotesLibrary.allQuotes();
  //Get the length of the quotes
  const numberOfQuotes = allQuotes.length;

  // Pick a random number between 1 and the number of quotes
  const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes)

  //Get the quote at that position in the array (minus one)
  const selectedQuote = allQuotes[randomNumber-1];

  //Print the quote to the console
  console.log(selectedQuote);
}


// function that loops indefinitly, calling the printAQuote function as it goes
 
app.indefiniteLoop = function indefiniteLoop(){
  setInterval(app.printAQuote, app.config.timeBetweenQuotes);
};

//Invoke the loop
app.indefiniteLoop();