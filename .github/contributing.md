# Guía para contribuir a LatinoEditor

Hola! Estamos encantados/as de que estés interesado/a en contribuir al proyecto. Antes de hacerlo, por favor ten en cuenta lo siguiente:

- [Código de conducta](https://www.contributor-covenant.org/es/version/2/0/code_of_conduct/)
- [Guía para realizar un PR](#guía-para-realizar-un-pr-pull-request)
- [Configuración del entorno de desarrollo](#configuración-del-entorno-de-desarrollo)
- [Descripción del proyecto](#descripcion-del-proyecto)

## Guía para realizar un PR (*Pull Request*)

- Realiza el *checkout* de tu rama, saliendo `main`, y luego realiza el PR contra `main`.
- Si se agrega una nueva característica:
    - Provee una razón conveniente para agregar la característica. Idealmente, primero deberías haber abierto un *issue* para discutir los pasos a seguir.
- Si soluciona un problema:
    - Provee una descripción detallada del problema.
- Puedes tener múltiples pequeños *commits* mientras trabajas en el PR, luego se realizará un *squash*.
- Los mensajes de los *commits* deben seguir la especificación: [Commits Convencionales](https://www.conventionalcommits.org/es/v1.0.0/). La descripción y cuerpo pueden ser en Español.

## Configuración del entorno de desarrollo

Necesitarás:
- Node.js v14.19.0+
- npm/yarn

Luego de clonar el repositorio, ejecuta:

```bash
# Instala las dependencias del  proyecto.
$ npm install # o yarn install
```

Crea un archivo `.env` (puedes copiar `.env.template`):

```bash
$ cp .env.template .env
```

Para desarrollar el proyecto en local, deberás ejecutar:

```bash
$ npm run dev
```

De esta manera, podrás acceder a http://localhost:3000. Cualquier modificación que hagas en el código fuente será reflejado automáticamente en el navegador.

Es importante mantener un estilo y formato del código, por lo tanto, asegúrate de ejecutar Eslint luego de realizar tus cambios:

```bash
$ npm run lint
```

## Descripción del proyecto

LatinoEditor está desarrollado en [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/). El estado de la aplicación gestiona con [Pinia](https://pinia.vuejs.org/).

Utilizamos [Monaco Editor](https://microsoft.github.io/monaco-editor/) como editor de código. La ejecución se realiza desde [LatinoEditorBackend](https://github.com/enzonotario/latino-editor-backend), encargado de crear el proceso, y establecer la conexión vía socket.io, para permitirle al Usuario interactuar con la consola en LatinoEditor, utilizando [node-pty](https://github.com/microsoft/node-pty).

En cuanto al diseño, nos alineamos lo más posible a las directivas de [Material Design](https://material.io/design), por medio de [Vuetify 3](https://next.vuetifyjs.com/), permitiéndonos modificar el diseño según consideremos necesario con CSS personalizado. Para esto, preferimos el uso de [TailwindCSS](https://tailwindcss.com/).
