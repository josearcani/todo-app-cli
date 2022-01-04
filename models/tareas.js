/**
 * _listado: {
 *  'uuid-234123-234-12-34-32': {
 *    id: 213,
 *    desc: 213,
 *    completadoEn: true
 *  }
 * }
 */
require('colors');
const Tarea = require('./tarea');

class Tareas {
  _listado = {}

  get listadoArr () {
    const listado = [];-
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })

    return listado
  }

  constructor () {
    this._listado = {};
  }

  crearTarea (desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray (tareas = []) {
    for (let i = 0; i < tareas.length; i++) {
      this._listado[tareas[i].id] = tareas[i];
    }
  }
  
  listadoCompleto () {
    // console.log(this._listado)
    // console.log(this.listadoArr)
    console.log(); // para hacer espacio

    this.listadoArr.forEach((tarea, i) => {
      const num = `${i + 1}.`.green
      const estado = (tarea.completadoEn)
                      ? 'Completado'.green
                      : 'Pendiente'.red;
      console.log(num, tarea.desc, '::' , estado);
    });

    // for (let i = 0; i < this.listadoArr.length; i++) {
    //   const num = `${i + 1}.`.green
    //   const num = (i + 1).toString().green;
    //   const estado = (this.listadoArr[i].completadoEn)
    //                   ? 'Completado'.green
    //                   : 'Pendiente'.red;
    //   console.log(num, this.listadoArr[i].desc, '::' , estado);
    // }  //BOTH WORK FINE
  }

  listarPendientesCompletadas (completadas = true) {
    // console.log('listando completas')

    let contador = 0;
    this.listadoArr.forEach(({ desc, completadoEn }, i) => {

      const estado = (completadoEn)
      ? 'Completado'.green
      : 'Pendiente'.red;
      if (completadas) {
        
        if (completadoEn) {
          contador += 1;
          console.log(contador.toString().green, desc, '::' , completadoEn.green);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(contador.toString().green, desc, '::' , estado);
        }
      }
    })
  }

  borrarTarea (id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  // salidaColorida (tarea, i, completadas) {
  //   const num = `${i + 1}.`.green
  //   const estado = (tarea.completadoEn)
  //                   ? 'Completado'.green
  //                   : 'Pendiente'.red;
  //   if (completadas) console.log(num, tarea.desc, '::' , tarea.completadoEn.green);
  //   console.log(num, tarea.desc, '::' , estado);
  // }

  toggleCompletadas (ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach((tarea) => {

      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }

    });

  }

}

module.exports = Tareas;