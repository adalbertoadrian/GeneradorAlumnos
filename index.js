//Conexion a la Base de Datos
const fs = require('fs');
const { Client } = require('pg')
const client = new Client(JSON.parse(fs.readFileSync('config.json', 'utf8')))

main()
  .then(console.log)
  .catch(console.error)

async function main () {
    var faker = require('faker');
    var id = 2;
    var firstName;
    var lastName;

    await client.connect()
    //Creo el Primer alumno con ID 2
    firstName = faker.fake("{{name.firstName}}")
    lastName = faker.fake("{{name.lastName}}")
    await client.query('INSERT INTO alumnos (id, alumno_name, alumno_lastname, estado) VALUES ($1, $2, $3, $4)', [id, firstName, lastName, 1])
    //Creo el Restante
    for (var i = 1; i <= 1199; i++) {
        firstName = faker.fake("{{name.firstName}}")
        lastName = faker.fake("{{name.lastName}}")
        id = await buscar(id)
        await client.query('INSERT INTO alumnos (id, alumno_name, alumno_lastname, estado) VALUES ($1, $2, $3, $4)', [id, firstName, lastName, 1])
    }
    await client.end()

    return "Alumnos Creados"
}

function buscar(j){
    var find = false
    var num = j+1
    while(!find) {
        if (primo(num)) {
            return num
        } else {
            num++
        }
    }
}

function primo(numero) {
    for (var i = 2; i < numero; i++) {
        if (numero % i === 0) {
        return false
        }
    }
    return numero !== 1;
}