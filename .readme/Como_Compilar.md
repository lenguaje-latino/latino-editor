# Compilar Latino-Editor

## Compilar editor en Windows:

### Requisitos:

* Instalar [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
> Este también se puede instalar al instalar Visual Studio.

* Instalar Node_JS version >14*  [desde aquí](https://nodejs.org/en/)

### Pasos a seguir:

* Abrir CMD como **Administrador** y escribir la siguiente línea.
```
npm install --global --production windows-build-tools
```
* Después de la instalación pasamos a clonar el repo del editor e instalar las demas dependencias desde nodeJS.
```
> git clone https://github.com/lenguaje-latino/latino-editor
> cd latino-editor
> npm i
```
* En la terminal (CMD o PowerShell) escribimos las siguientes líneas de comando:

    * Para ejecutar el editor (Run):
        ```
        > npm run eletron:serve
        ```

    * Para compilar el editor (Build):
        ```
        > npm run eletron:build
        ```
    > Este último pasara a compilarse en la carpeta dist_electron de nuestro proyecto