const fs = require('fs');

const writeConfig = (content)=>{
    fs.writeFile('config.json', content, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File has been written');
      });
}
const readConfig = ()=>{
  return new Promise((resolve, reject) => {
    fs.readFile('config.json', 'utf8',  (err, data) => {
      if (err) {
        console.error(err);
        return;
      }  
      resolve(JSON.parse(data))
    });
  });  
}


module.exports = {
    writeConfig,
    readConfig,
 }