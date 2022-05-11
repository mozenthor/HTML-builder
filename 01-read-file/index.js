const fs = require('fs');

const ReadStream  = fs.createReadStream('01-read-file/text.txt');
ReadStream.on('data', function (chunk) {
  console.log(chunk.toString());
});