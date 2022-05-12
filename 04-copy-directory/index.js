const fs = require('fs');

fs.mkdir('./04-copy-directory/files-copy',{recursive: true}, err => {
  if (err) throw err;
});


fs.readdir('./04-copy-directory/files', (err,files) => {
  if (err) {
    throw err;
  } else {
    fs.readdir('./04-copy-directory/files-copy', (err,files1) => {
      if (err){
        throw err;
      }else {
        files1.forEach (file1 => {
          fs.unlink(`./04-copy-directory/files-copy/${file1}`, err => {
            if (err) throw err;
          });
        });
        files.forEach (file => {
          ReadWrite(file);
        });
      }
    });
  }
});

const ReadWrite = (file) => {
  const ReadStream  = fs.createReadStream(`./04-copy-directory/files/${file}`);
  const WriteStream = fs.createWriteStream(`./04-copy-directory/files-copy/${file}`);
  ReadStream.on('data', function (chunk) {
    WriteStream.write(`${chunk.toString()}`);
  });
};