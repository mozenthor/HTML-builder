const fs = require('fs');
const path = require('path');
const WriteStreamHtml = fs.createWriteStream('./06-build-page/project-dist/index.html');
const WriteStreamStyle = fs.createWriteStream('./06-build-page/project-dist/style.css');

function createDir() {
  fs.mkdir('./06-build-page/project-dist',{recursive: true}, err => {
    if (err) throw err;
  });

  fs.mkdir('./06-build-page/project-dist/assets',{recursive: true}, err => {
    if (err) throw err;
  });
  
  fs.mkdir('./06-build-page/project-dist/assets/fonts',{recursive: true}, err => {
    if (err) throw err;
  });

  fs.mkdir('./06-build-page/project-dist/assets/svg',{recursive: true}, err => {
    if (err) throw err;
  });

  fs.mkdir('./06-build-page/project-dist/assets/img',{recursive: true}, err => {
    if (err) throw err;
  });
}

async function htmlBuilder() {
  let html = await fs.promises.readFile('./06-build-page/template.html', 'utf8');
  const components = await fs.promises.readdir('./06-build-page/components');
  for (const value of components) {
    const name = value.slice(0,value.indexOf('.'));
    const component = await fs.promises.readFile(`./06-build-page/components/${value}`,'utf8');
    html = html.replace(`{{${name}}}`, component);
  }
  WriteStreamHtml.write(html);
}

function cssBuilder() {
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
}

function fontsCopy() {
  fs.readdir('./06-build-page/assets/fonts', (err,filesA) => {
    if (err) {
      throw err;
    } else {
      filesA.forEach(fileA => {
        ReadWrite(fileA, 'fonts');
      });
    }
  });
}

function svgCopy() {
  fs.readdir('./06-build-page/assets/svg', (err,filesA) => {
    if (err) {
      throw err;
    } else {
      filesA.forEach(fileA => {
        ReadWrite(fileA, 'svg');
      });
    }
  });
}

function imgCopy() {
  fs.readdir('./06-build-page/assets/img', (err,filesA) => {
    if (err) {
      throw err;
    } else {
      filesA.forEach(fileA => {
        ReadWrite(fileA, 'img');
      });
    }
  });
  
}

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

async function result() {
  await createDir();
  await htmlBuilder();
  await cssBuilder();
  await fontsCopy();
  await svgCopy();
  await imgCopy();
}
result();