const fs = require('fs');
const path = require('path');
const WriteStream = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

fs.readdir('./05-merge-styles/styles', (error, files) => {
  if (error) {
    throw error;
  } else {
    files.forEach(file => {
      if (path.extname(`./05-merge-styles/styles/${file}`) === '.css'){
        fs.readFile(`./05-merge-styles/styles/${file}`, 'utf8', (err, data)=> {
          if (err){
            throw err;
          } else {
            WriteStream.write(data);
          }
        });
      }
    });
  }
});