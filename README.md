# LatinoEditor

Editor de código para el [Lenguaje Latino](https://www.lenguajelatino.org/), desarrollado por [Melvin Guerrero](https://melvinguerrero.blogspot.com/).

Este editor de código no es oficial, y es desarrollado por [Enzo Notario](https://enzonotario.me).

![image](https://user-images.githubusercontent.com/10469299/161657579-8a119db5-042c-486d-9d2b-3f22925bbc56.png)

## Descargar

### Windows
> Para ejecutar el código en LatinoEditor, es necesario instalar previamente el [Lenguaje Latino](https://github.com/MelvinG24/Latino/releases/download/v1.4.1/Latino-1.4.1-Win.exe).

- Descargar para [Windows (versión portable)](https://github.com/enzonotario/latino-editor/releases/download/v0.0.1-alpha.0/LatinoEditor.0.0.1-alpha.0.exe)
- Descargar para [Windows (instalador)](https://github.com/enzonotario/latino-editor/releases/download/v0.0.1-alpha.0/LatinoEditor.Instalador.0.0.1-alpha.0.exe)

### Linux
- Descargar para [Linux (AppImage)](https://github.com/enzonotario/latino-editor/releases/download/v0.0.1-alpha.0/LatinoEditor-0.0.1-alpha.0.AppImage)
- Descargar para [Linux (snap)](https://github.com/enzonotario/latino-editor/releases/download/v0.0.1-alpha.0/latino-editor_0.0.1-alpha.0_amd64.snap)
- Descargar para [Linux (deb)](https://github.com/enzonotario/latino-editor/releases/download/v0.0.1-alpha.0/latino-editor_0.0.1-alpha.0_amd64.deb)

## Documentación

LatinoEditor sólo permite ejecutar código Latino. Para más información, dirigirse al [Manual de Latino](https://manual.lenguajelatino.org/es/stable/).

## Compilar Editor

### Compilar editor en Windows:
Pasos:
#### instalar Windows SDK para windows
	> https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
	> Tambine se puede instalar desde el Visual Studio
#### Instalar NodeJS
#### Despues de NodeJS ejecutar la siguiente linea de codigo:
	>>> CMD como Administrador <<<
	> npm install --global --production windows-build-tools
#### Clonar Repo
	>>> abrir CMD como Administrador <<<
	>>> ejecutar en la terminal el siguiente codigo
	> npm i
#### Ejecutar el siguiente codigo:
	> npm run eletron:serve
#### (Para compilar):
	>>> ubicacion: dist_electron <<<
	> npm run eletron:build