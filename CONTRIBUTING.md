# Contribuyendo a LatinoEditor

LatinoEditor es un editor de código libre. Cualquier contribución es bienvenida.

## Configuraciones de desarrollo

Necesitarás Node.js versión 14.19.0+.

1. Luego de clonar el repositorio, ejecutar:
```
$ npm i
```

2. Para levantar el servidor de desarrollo de la versión Web, ejecutar:

```
$ npm run serve
```

Para levantar el servidor de desarrollo para la versión de Electron.js:
```
$ npm run electron:serve
```

## Estilo de código

Para asegurar la consistencia del código, se utilizan EsLint + Prettier. Para ello, se encuentran disponibles los siguientes scripts:

- Lint: Ejecuta EsLint para "lintear" y revisar la sintaxis de todos los archivos del proyecto.
```
$ npm run lint
```

- Lint Fix: Ejecuta EsLint con el flag **--fix**, que corrige la sintáxis en caso de que no cumpla la guía de estilo.
```
$ npm run lint --fix
```

Para facilitar esta tarea, se encuentran disponibles diversos Plugins para los diferentes IDEs, de manera que se pueda ejecutar por medio de algún atajo.

