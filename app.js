require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    // establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  } 
  // await pausa();

  while(opt !== '0') {
    console.clear();
    opt =  await inquirerMenu();
    // console.count('bucle while');

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:')
        // console.log(desc)
        tareas.crearTarea(desc);
      break;
      case'2':
        tareas.listadoCompleto();
      break;

      case'3':
        tareas.listarPendientesCompletadas(true);
      break;

      case'4':
        tareas.listarPendientesCompletadas(false);
      break;

      case'5': // completado | pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids);
        // console.log(ids);
      break;

      case'6':
        const id =  await listadoTareasBorrar(tareas.listadoArr);
        // TODO: preguntar si esta seguro
        console.log({ id });
        if (id !== '0') {
          if (await confirmar('¿Estás seguro?')) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          } else {
            console.log('Operación cancelada')
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);
    // console.log({ opt })
    await pausa();

  }
}

main();