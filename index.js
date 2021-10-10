// const path = require('path')
// const myPath = '/media/ariful/Development/NodeJs-Backend/nodeJs-Sumit/index.js'

// console.log(path.parse(myPath));

// const os = require('os');
// console.log(os.cpus());

// const fs = require('fs');
// fs.writeFileSync('myFile.txt', 'Hello Programmers')
// fs.appendFileSync('myFile.txt', ' How are you?')
// fs.readFile('myFile.txt', (err, data)=>{
//     console.log(data.toString());
// })
// console.log('Hello');

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

const School = require('./school')

// register a listener for bellRing event

// Raise an event
// setTimeout(() => {
//   emitter.emit("bellRing", {
//     period: "first",
//     text: " period ended",
//   });
// }, 2000);
const school = new School()
school.on("bellRing", ({period, text}) => {
    console.log("We need to run becase " + period + text );
  });
  
school.startPeriod();
