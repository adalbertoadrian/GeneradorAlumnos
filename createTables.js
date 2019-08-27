//Conexion a la Base de Datos
const fs = require('fs');
const { Client } = require('pg')
const client = new Client(JSON.parse(fs.readFileSync('config.json', 'utf8')))

const createTables = `
CREATE TABLE public.cursos (
	id serial NOT NULL,
	profesor_id int4 NOT NULL,
	curso_name varchar(200) NOT NULL,
	estado int4 NOT NULL,
	created_at timestamp NULL,
	modified_at timestamp NULL,
	CONSTRAINT cursos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profesores (
	id serial NOT NULL,
	profesor_name varchar(200) NULL,
	profesor_lastname varchar(200) NULL,
	estado int4 NOT NULL,
	created_at timestamp NULL,
	modified_at timestamp NULL,
	CONSTRAINT profesores_pkey PRIMARY KEY (id)
);
CREATE TABLE public.alumnos (
	id int4 NOT NULL,
	alumno_name varchar(200) NULL,
	alumno_lastname varchar(200) NULL,
	estado int4 NOT NULL,
	created_at timestamp NULL,
	modified_at timestamp NULL
);
CREATE TABLE public.alumnos_cursos (
	id serial NOT NULL,
	alumno_id int4 NOT NULL,
	curso_id int4 NOT NULL,
	created_at timestamp NULL,
	modified_at timestamp NULL,
	CONSTRAINT alumnos_cursos_pkey PRIMARY KEY (id)
);
`
;(async () => {
    await client.connect()
    await client.query(createTables)
    await client.end()
})().catch(e => console.error(e.stack))