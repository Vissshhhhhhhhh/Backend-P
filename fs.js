    // File Systems

const fs = require("fs");
if (!fs.existsSync("./data"))
  fs.mkdir("./data", (err) => {                    // mkdir('path',callback) - > async func
    if (err) console.log(err.message);
  });

if (fs.existsSync("./data")) {
  fs.readFile("./data/file.txt", (err, data) => { // readFile, writeFile - > async func
    if (err) {
      console.log(err.message);
    } else console.log(data.toString());
  });
}

if (fs.existsSync("./data/file.txt")) {
  fs.unlink("./data/file.txt", (e) => {          // fs.unlink - > Synchronous function
    if (e) console.log(e.message);
    else console.log("File deleted");
  });
}

// STREAMS