# Para realizar cambios sobre TerriaJS

Terria recomienda el uso de los yarn workspaces (https://docs.terria.io/guide/contributing/development-environment/)

En circunstancias normales, terria coge como dependencia terriajs desde lo indicado en el package (github:eDatos/terriajs#x.y.z). Sin embargo, si hemos clonado el repositorio dentro de la carpeta package/terriajs, cogerá los cambios de allí

## Configuración package.json

Como indica la documentación, al cambiar entre ambos valores, borrar la carpeta mediante un rm -R node_modules/terriajs

Revisamos que en el package.json del terriajs en versión tenemos el metadata +local añadido. Este cambio no lo subimos, pero nos permite comprobar más fácil que la versión instalada es la del package y no la del git.

Cogiendo la dependencia desde el packages:
"terriajs": "8.7.2+local",

Cogiendo la dependencia desde el github:
"terriajs": "https://github.com/Edatos/terriajs.git#edatos-8.7.2",

## Problemas al usar workspaces

Si tras hacer un yarn install no está cogiendo correctamente algunas de las dependencias dentro del packages, como la dependencia de terriajs-plugin-edatos, hacer un yarn install --check-files

# Para hacer pruebas sobre los distintos catálogos de los distintos entornos

En el config.json hay varias URLs de la siguiente forma:
// "http://127.0.0.1:8081/entornos/arte/demo/apache-static/terria/config-deploy/init/erupcion-volcanica-la-palma.json",
// "http://127.0.0.1:8081/entornos/arte/demo/apache-static/terria/config-deploy/init/referencias-cartograficas.json"

Para que funcionen se asume que en la carpeta de sistemas, se ha ejecutado el comando

# Para levantar el entorno

Como indica el yarn install, para levantar en local se hace con un yarn gulp dev

# Para actualizar la versión

El proceso se resume en

- En terriajs (que estará dentro del packages de terria):
  - Hacer un merge del tag al que queremos actualizar, resolviendo conflictos si procede
  - Modificamos el package.json para añadir la coletilla "+local" a la versión, para facilitar las pruebas
- En terria:
  - Actualizamos la versión del package.json para usar la versión nueva
  - Para actualizar las dependencias de cesium y demás: yarn gulp sync-terriajs-dependencies
  - Instalamos todo con un: yarn install --check-files
  - Levantamos la aplicación y probamos que está todo en orden
- En terriajs
  - Subimos a una rama de la forma edatos-x.y.z, la actualización
- En terria:
  - Actualizamos la versión del package.json para apuntar al git
  - Instalamos todo con un: yarn install --check-files
  - Levantamos la aplicación y probamos que está todo en orden
