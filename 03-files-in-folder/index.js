const fs = require('fs');
const path = require('path');

const poi = (way) => {
  fs.readdir(way,{withFileTypes: true}, (error, files) => {
    if (error) {
      throw error;
    } else {
      files.forEach(file => {
        if (file.isFile()) {
          if (path.extname(`${way}/${file.name}`) === '') {
            const name = file.name;
            const extname = 'no have';
            fs.stat(`${way}/${file.name}`, (error, stat) => {
              if (error) {
                throw error;
              } else {
                const size = stat.size/1000;
                console.log(`${name} - ${extname} - ${size}kb`);
              }
            });
          } else {
            const extname = path.extname(`${way}/${file.name}`);
            const name = file.name.split('.')[0];
            fs.stat(`${way}/${file.name}`, (error, stat) => {
              if (error) {
                throw error;
              } else {
                const size = stat.size/1000;
                console.log(`${name} - ${extname.slice(extname.indexOf('.')+1)} - ${size}kb`);
              }
            });
          }
        } else {
          poi(`${way}/${file.name}`);
        }
      });
    }
  });
};

poi('./03-files-in-folder/secret-folder');