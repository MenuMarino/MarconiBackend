# Backend

- Lo primero es correr `npm install`, para instalar las dependencias del proyecto.
- Después se ejecuta `npm run seed`, este guarda en la base de datos el usuario con rol de administrador.
- Para correr el backend se utiliza `npm run local`

## Dependencias

- Node.js v16.15.0
- MongoDB

## Env

- PORT: Puerto en el cual correra el backend
- URI: URI para conectar con la base de datos de Mongo
- DBNAME: Nombre del database que se usara en Mongo
- JWTSECRET: Esto se usa para generar los jwt para el frontend.
- EXT_KEY: Key de autenticacion que se utiliza para recibir la informacion
