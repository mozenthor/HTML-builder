const fs = require('fs');
const path = require('path');
const WriteStreamHtml = fs.createWriteStream('./06-build-page/project-dist/index.html');
const WriteStreamStyle = fs.createWriteStream('./06-build-page/project-dist/style.css');

fs.mkdir('./06-build-page/project-dist',{recursive: true}, err => {
  if (err) throw err;
});

fs.readFile('./06-build-page/template.html', 'utf8', (err,data) => {
  if (err) {
    throw err;
  } else {
    let html = data;
    fs.readdir('./06-build-page/components', (err,files) => {
      if (err){
        throw err;
      } else {
        for(let i=0; i<files.length; i++) {
          let name = files[i].slice(0,files[i].indexOf('.'));
          fs.readFile(`./06-build-page/components/${files[i]}`,'utf8', (err,data) => {
            if (err) {
              throw err;
            } else {
              html = html.replace(`{{${name}}}`, data);
              if (i === files.length-1) {
                setTimeout( ()=> {
                  WriteStreamHtml.write(html);
                }, 100);
              }
            }
          });
        }
      }
    });
  }
});

fs.readdir('./06-build-page/styles', (error, files) => {
  if (error) {
    throw error;
  } else {
    files.forEach(file => {
      if (path.extname(`./06-build-page/styles/${file}`) === '.css'){
        fs.readFile(`./06-build-page/styles/${file}`, 'utf8', (err, data)=> {
          if (err){
            throw err;
          } else {
            WriteStreamStyle.write(data);
          }
        });
      }
    });
  }
});

fs.mkdir('./06-build-page/project-dist/assets',{recursive: true}, err => {
  if (err) throw err;
});

fs.mkdir('./06-build-page/project-dist/assets/fonts',{recursive: true}, err => {
  if (err) throw err;
});
fs.readdir('./06-build-page/assets/fonts', (err,filesA) => {
  if (err) {
    throw err;
  } else {
    filesA.forEach(fileA => {
      ReadWrite(fileA, 'fonts');
    });
  }
});

fs.mkdir('./06-build-page/project-dist/assets/svg',{recursive: true}, err => {
  if (err) throw err;
});
fs.readdir('./06-build-page/assets/svg', (err,filesA) => {
  if (err) {
    throw err;
  } else {
    filesA.forEach(fileA => {
      ReadWrite(fileA, 'svg');
    });
  }
});

fs.mkdir('./06-build-page/project-dist/assets/img',{recursive: true}, err => {
  if (err) throw err;
});
fs.readdir('./06-build-page/assets/img', (err,filesA) => {
  if (err) {
    throw err;
  } else {
    filesA.forEach(fileA => {
      ReadWrite(fileA, 'img');
    });
  }
});

const ReadWrite = (file, fold) => {
  const WriteStream = fs.createWriteStream(`./06-build-page/project-dist/assets/${fold}/${file}`);
  fs.readFile(`./06-build-page/assets/${fold}/${file}`, (err, data)=> {
    if (err){
      throw err;
    } else {
      WriteStream.write(data);
    }
  });
};
