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
let dataJson={}
const readConfig =()=>{
     fs.readFile('config.json', 'utf8',  (err, data) => {
        if (err) {
          console.error(err);
          return;
        }  
        dataJson = data
      });
      return dataJson
}


module.exports = {
    writeConfig,
    readConfig,
 }