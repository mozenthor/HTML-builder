const fs = require('fs');
const path = require('path');

const f = (way) => {
  fs.readdir(way,{withFileTypes: true}, (error, files) => {
    if (error) {
      throw error;
    } else {
      files.forEach(file => {
        if (file.isFile()) {
          const extname = path.extname(`${way}/${file.name}`);
          const name = file.name;
          fs.stat(`${way}/${file.name}`, (error, stat) => {
            if (error) {
              throw error;
            } else {
              const size = stat.size/1000;
              console.log(`${name.slice(0, name.lastIndexOf('.'))} - ${extname.slice(extname.indexOf('.')+1)} - ${size}kb`);
            }
          });
        }
      });
    }
  });
};

f('./03-files-in-folder/secret-folder');