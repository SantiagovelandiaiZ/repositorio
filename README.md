# Gestor de Tareas (Expo / React Native)

## Requisitos
- Node.js LTS y npm
- Una cuenta de Expo para compilar en la nube con EAS

## Ejecutar localmente
Desde esta carpeta:

```powershell
npm install
npx expo start
```

Escanea el QR con Expo Go para probar la aplicación.

## Generar APK con EAS
1. Inicia sesión:

```powershell
npx eas-cli login
```

2. Configura el proyecto (solo la primera vez):

```powershell
npx eas-cli build:configure
```

Si EAS indica que necesita un repositorio Git y este proyecto no usa Git, en PowerShell ejecuta primero:

```powershell
$env:EAS_NO_VCS="1"
```

3. Compila un APK para Android:

```powershell
npx eas-cli build --platform android --profile preview
```

La primera compilación puede pedir que crees o vincules el proyecto Expo y que configures las credenciales Android. Sigue las instrucciones que muestre la terminal. Cuando termine, EAS mostrará un enlace para descargar el APK.

## Nota
Las tareas se guardan en memoria por ahora. Si cierras la aplicación, los cambios no se conservan. Se puede agregar almacenamiento local posteriormente.
