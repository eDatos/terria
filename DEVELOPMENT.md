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
  - Creamos rama edatos-x.y.z a partir de master
  - Hacer un merge del tag de terriajs desde el que que queremos actualizar hasta la rama edatos-x.y.z, resolviendo conflictos si procede
  - Modificamos el package.json para añadir la coletilla "+local" a la versión, para facilitar las pruebas. Por ejemplo: "8.7.2+local"
- En terria:
  - Actualizamos la versión del package.json para usar la versión nueva
  - Para actualizar las dependencias de cesium y demás: yarn gulp sync-terriajs-dependencies. Lo hacemos antes de borrar la dependencia o la tarea no existirá
  - Borrar la carpeta mediante un rm -R node_modules/terriajs
  - Instalamos todo con un: yarn install --check-files
  - Levantamos la aplicación con _yarn gulp dev_ y probamos que está todo en orden
  - Hacer un merge del tag (esta vez, de terria) al que queremos actualizar, resolviendo conflictos si procede y repetimos el proceso de sincronizar
- En terriajs
  - Subimos a una rama de la forma edatos-x.y.z, la actualización
- En terria:
  - Actualizamos la versión del package.json para apuntar al git
  - Instalamos todo con un: yarn install --check-files
  - Levantamos la aplicación y probamos que está todo en orden
  - Limpiamos estilos añadidos adicionales si se puede (custom.scss)
  - Limpiamos cadenas innecesarias en languageOverrides.json si se puede

Si resumimos aún más podríamos actualizar terriajs y terriamap, pero corremos el riesgo de encontrar errores y no saber de donde vienen.

# Para añadir cadenas de traducción

Cuando tenemos una cadena sin traducción debemos:

- 1. Si la cadena no está internacionalizada, no es habitual, internacionalizarla, y poner issue/pull request en terria
- 2. Si la cadena está internacionalizada:
  - 2.1) Añadirla en wwwroot\languages\es\languageOverrides.json
  - 2.2) Añadirla en https://hosted.weblate.org/translate/terriajs/terriajsnext/es/ para que esté disponible en futuras versiones de Terria
