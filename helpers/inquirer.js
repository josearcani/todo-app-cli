const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué deseas hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      },
    ]
  }
]

const inquirerMenu = async () => {
  console.log('==========================='.green)
  console.log('  Selecciones una opción');
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(preguntas);

  return option;
}

const pausa = async () => {

  console.log('\n');

  await inquirer.prompt({
    type: 'input',
    name: 'pausa',
    message: `Para continuar pulse ${'Enter...'.rainbow}`,
  })
}

const confirmar = async (message) => {

  console.log('\n');

  const { confirmar } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmar',
    message,
    default: false,
  })

  return confirmar
  // console.log(confirmar); 
}

const leerInput = async (message) => {
  const pregunta = {
    type: 'input',
    name: 'desc',
    message,
    validate(value) {
      if (value.length === 0) {
        return 'Por favor ingrese un valor'
      }
      return true
    }
  }
  const { desc } = await inquirer.prompt(pregunta);
  return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map(({ id, desc }, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: id,
      name: `${idx} ${desc}`
    }
  })
  // console.log(choices);
  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`
  })
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    },
  ]
  const { id } = await inquirer.prompt(preguntas);
  return id;
  /**
   * {
   *   value: id_tarea,
   *   name: descripción 
   * }
   */
}

const mostrarListadoChecklist = async (tareas = []) => {
  
  const choices = tareas.map(({ id, desc, completadoEn }, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: id,
      name: `${idx} ${desc}`,
      checked: (completadoEn) ? true : false,
    }
  })
  
  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    },
  ]
  const { ids } = await inquirer.prompt(preguntas);
  return ids;

}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
}