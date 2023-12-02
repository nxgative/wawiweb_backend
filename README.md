# grupo_wawiweb_backend

## Como levantar la base de datos:

Asumiendo que se quiere probar la base de datos localmente, es necesario tener creadas las variables de entorno para que esta pueda funcionar correctamente. Para probar en development, debes tener creada una base de datos en psql llamada calendour_db_development. Las variables de entorno mencionadas anteriormente debes instanciarlas en un .env (crear un archivo .env y luego copiar y pegar el texto de abajo).

------
DB_USERNAME = calendour_user.

DB_PASSWORD = michischispop 

DB_NAME = calendour_db

DB_HOST = "localhost"

JWT_ALGORITHM = "HS256"

JWT_EXPIRATION_SECONDS = 86400

JWT_SECRET = "michispop"

-----

Para correr la aplicación y poblar la base de datos se puede utilizar yarn o npm. Para esta documentación utilizaremos yarn.

Debido a que todas las dependencias necesarias para utilizar la aplicación y poder comunicarnos con el frontend exitosamente están ya en los paquetes, solamente es necesario correr en la terminal el comando yarn para poder instalar todo lo necesario.  

Luego, para poder poblar la base de datos y poder lograr un correcto utilizamiento de la aplicación es necesario correr un set de comandos que ayudarán a crear los modelos, poblar, y establecer las migraciones para utilizar la aplicación. 

Así, correr los siguientes comandos:

-----
yarn

yarn db:create calendour_db_development (Opcional, si fue ya creada con psql pasar al siguiente comando)

yarn db:migrate

yarn seeds

yarn dev (Correr aplicación con nodemon)

-------

Una vez utilizado los comandos anteriores es posible correr el backend de la aplicación. El puerto utilizado en esta aplicación es el puerto 3000. En caso de tener otras operaciones corriendo en este puerto, favor de terminar estos procesos o cambiar el puerto a utilizar en la aplicación. Para esto ir a la linea 7 de index.js y cambiar 3000 por el puerto deseado. 

## Documentación de la API:

Para poder ver la documentación de la API, favor apretar el siguiente link:

https://docs.google.com/document/d/1mh4qgRA1lpaM2j4wcdyTNrcBt-4kFNVqQX0fXalWm5s/edit?usp=sharing

Las dependencias más importantes para esta son:

--------
"koa": "^2.14.2"

"koa-body": "^6.0.1"

"koa-cors2": "^0.0.1"

"koa-logger": "^3.2.1"

"koa-router": "^11.0.2"

--------

Estas son de suma importancia debido a que manejan la comunicación entre el backend y frontend
Se encargan de establecer rutas seguras además de permitir pasar controles de accesos que normalmente no se podrían traspasar entre estos.
Nuevamente, estos están en el package.json por lo que basta con correr yarn para que estos se instalen correctamente.

## Deploy
El deploy en render se realizó y se encuentra en 
https://calendour.onrender.com

Se utilizó el repo original (privado), probablemente por eso no responde.