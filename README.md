# Servidor de APIs para manejo de usuarios (NodeJS)

En este repositorio van a encontrar un proyecto que consiste en backend desarrollado con Node.JS para el almacenamiento de usuarios e imagenes para cada usuario. Este proyecto fue realizado por _Franco Adrian Balich_ únicamente con fines educativos por lo que la seguridad del mismo no está garantizada.

`Se necesitará una base de datos MongoDB`

# Descarga

Podrán descargar el repositorio al hacer clic en el botón verde `<> Code` de Github y hacer clic en `Download ZIP` para que se les descargue todo el repositorio.

Otra opción también es hacer clic en el botón verde `<> Code` de Github y hacer clic en `HTTPS` y copiar el link.

Luego ir a la carpeta de nuestra computadora donde queremos guardar nuestro proyecto y ejecutar el comando:

```
git clone <link HTTPS>
```

Esto funcionara si tienen git instalado y configurado en su computadora.

# Instalación

Para probar el proyecto primero deberán posicionarse dentro de la carpeta del proyecto y ejecutar los comandos:

En primer lugar se deberá copiar el archivo `.env.example` y renombrarlo como `.env` y completar las variables de entorno `PORT, DB_CNN y SECRET_JWT_SEED`.

En caso de no hacerlo el proyecto no se ejecutará por no tener el link de conexión con la base de datos MongoDB y faltara la seed para generar los JSON Web Token.

_De forma opcional_, tambien puede completar las variables de entorno `CLOUD_NAME, API_KEY y API_SECRET` de [Cloudinary](https://cloudinary.com/).

Si no se ingresa un puerto, el proyecto se ejecutará por defecto en el puerto 3000.

Para instalar todas las dependencias:

```
npm install
```

Otra opción seria ejecutar el comando:

```
npm i .
```

Para ejecutar el proyecto:

```
npm run dev
```

## Autor

- 📌[@francobalich](https://www.github.com/francobalich)
- 🔴[En directo por Twitch](https://www.twitch.tv/francolabs)
