const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const WriteStream = fs.createWriteStream('02-write-file/text.txt');
const rl = readline.createInterface({ input, output });

rl.on('SIGINT', () => {
  console.log('\nВвод текста завершен, результат в text.txt');
  rl.close();
});
rl.question('Введите текст(ввод exit прекратит ввод текста): ', (text) => {
  if (text === 'exit'){
    console.log('Вы ничего не ввели, файл text.txt пустой');
    rl.close();
  } else {
    WriteStream.write(`${text}`);
    console.log('Текст записан, продолжайте вводить текст или exit для прекращения ввода');
    rl.on('line', (text2) => {
      if (text2 === 'exit'){
        console.log('Ввод текста завершен, результат в text.txt');
        rl.close();
      } else {
        WriteStream.write(`\n${text2}`);
      }
    });
  }
});