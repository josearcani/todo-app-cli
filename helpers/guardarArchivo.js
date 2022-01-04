const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = ( data ) => {
  // console.log(Array.isArray(data)); para saber si es array
  /* como se ejecutara desde app.js parimos de ahi */
  fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    /* cuando no exista */
    return null
  }

  const info = fs.readFileSync(archivo, { encoding: 'utf-8'});

  return JSON.parse(info);
}

module.exports = {
  guardarDB,
  leerDB
};
