//Dependencies

const path = require("path");
const fs = require("fs");

const lib = {};

//base directory of data folder
lib.basedir = path.join(__dirname, "/../.data/");

//write data to file
lib.create = function (dir, file, data, callback) {
  //open file for writing
  fs.open(
    `${lib.basedir + dir}/${file}.json`,
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //convert data to string
        const stringData = JSON.stringify(data);

        //write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, (err2) => {
          if (!err2) {
            fs.close(fileDescriptor, (err3) => {
              if (!err3) {
                callback(false);
              } else {
                callback("Error closing the new file!");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exists!");
      }
    }
  );
};
lib.read=(dir, file, callback)=>{
  fs.readFile( `${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data)=>{
    callback(err, data);
  })
}

//Update Existing file
lib.update = (dir, file, data, callback)=>{
  // file open for writing
  fs.open(`${lib.basedir + dir}/${file}.json`,'r+', (err, fileDescriptor)=>{
    if(!err){
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err)=>{
        if(!err){
          //Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err)=>{
            if(!err){
              fs.close(fileDescriptor, (err)=>{
                if(!err){
                  callback(false)
                }else{
                  callback('Error closing file!')
                }
              })
            }else{
              callback('Error wring to file')
            }
          })
        }else{
          callback('Error Truncating file!');
        }
      })
    }else{
      console.log('Err updating. File nay not exit');
    }
  })
}

//Delete existing File
lib.delete = (dir, file,  callback)=>{
  //unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err)=>{
    if(!err){
      callback(false);
    }else{
      callback('Error deleting file')
    }

  })
}

module.exports = lib;
