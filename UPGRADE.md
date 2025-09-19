# UPGRADE - Proceso de actualización entre versiones

_Para actualizar de una versión a otra es suficiente con actualizar el WAR a la última versión. El siguiente listado presenta aquellos cambios de versión en los que no es suficiente con actualizar y que requieren por parte del instalador tener más cosas en cuenta. Si el cambio de versión engloba varios cambios de versión del listado, estos han de ejecutarse en orden de más antiguo a más reciente._

_De esta forma, si tuviéramos una instalación en una versión **A.B.C** y quisieramos actualizar a una versión posterior **X.Y.Z** para la cual existan versiones anteriores que incluyan cambios listados en este documento, se deberá realizar la actualización pasando por todas estas versiones antes de poder llegar a la versión deseada._

_EJEMPLO: Queremos actualizar desde la versión 1.0.0 a la 3.0.0 y existe un cambio en la base de datos en la actualización de la versión 1.0.0 a la 2.0.0._

_Se deberá realizar primero la actualización de la versión 1.0.0 a la 2.0.0 y luego desde la 2.0.0 a la 3.0.0_

## 2.0.0 a 3.0.0

### Breaking changes

- Sube la versión de Terria (7.11.16 a 8.10.0). Dado que Terria permite la existencia de enlaces guardados con configuración dependiente de la versión, esto es un breaking change.
- Cambia tanto la configuración como los catálogos
  - El modo de actualizar los catálogos es con el comando catalog-converter (https://github.com/TerriaJS/catalog-converter). Ejemplo: catalog-converter wwwroot/init/v7erupcion-volcanica-la-palma.json wwwroot/init/erupcion-volcanica-la-palma.json
- Cambios relevantes para el proyecto es que se deprecan los WMS con region mapping

## 1.0.0 a 2.0.0

## 0.0.0 a 1.0.0

- El proceso de instalación desde cero está definido en "Metamac - Manual de instalación.doc"
