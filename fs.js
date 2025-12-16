    // File Systems

const fs = require("fs");
if (!fs.existsSync("./data"))
  fs.mkdir("./data", (err) => {                    // mkdir('path',callback) - > async func
    if (err) console.log(err.message);
  });

if (fs.existsSync("./data")) {
  fs.writeFile("./data/file.txt",'I am here' ,(err) => { // readFile, writeFile - > async func
    if (err) {
      console.log(err.message);
    }
  });
}

// if (fs.existsSync("./data/file.txt")) {
//   fs.unlink("./data/file.txt", (e) => {          // fs.unlink - > Synchronous function
//     if (e) console.log(e.message);
//     else console.log("File deleted");
//   });
// }

// Streams

const readstream = fs.createReadStream('./data/file.txt',{encoding : 'utf8'});
readstream.on('data',(buffer)=>{
    console.log(buffer);
})