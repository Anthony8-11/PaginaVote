// Este archivo es solo una referencia para el backend en Google Apps Script.
// Copia este código en el editor de Google Apps Script vinculado a tu Google Sheet.

// doPost: procesa los datos del formulario
function doPost(e) {
  // Reemplaza por el ID de tu hoja de cálculo
  var ss = SpreadsheetApp.openById('15jR8e6G5r3v9FcZyMeLf-f3OzVo-PalKgi9qhNTgFZo');
  var sheet = ss.getSheetByName('Votaciones');
  var data = e.parameter; // <-- cambio aquí

  sheet.appendRow([
    new Date(),
    data.voterName,
    data.nominado1,
    data.nominado2,
    data.nominado3,
    data.nominado4,
    data.nominado5,
    data.nominado6
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: 'OK'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// doOptions: responde a preflight CORS (no procesa datos)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// Google Apps Script NO permite modificar los headers CORS en Web Apps.
// Para evitar el error de CORS:
// 1. Usa tu frontend en HTTPS.
// 2. Publica el Web App como "Cualquiera, incluso anónimo".
// 3. Para desarrollo local, usa un proxy CORS como cors-anywhere.

// Si tu frontend está en HTTPS y el Web App está publicado como "Cualquiera, incluso anónimo",
// ya puedes enviar datos desde Vercel sin problemas de CORS.
// No necesitas modificar este archivo.

// Recuerda publicar el script como "Web App" y permitir acceso anónimo.

// ¿Dónde verifico la URL pública del Web App?
  // 1. Abre el editor de Google Apps Script.
  // 2. Ve al menú "Implementar" > "Administrar implementaciones".
  // 3. Busca la implementación activa de tu Web App.
  // 4. Haz clic en el ícono de "Web App" y copia la URL que aparece.
  // 5. Usa esa URL en tu frontend (por ejemplo, en script.js como scriptURL).

function doGet(e) {
  return ContentService.createTextOutput("API de votaciones activa")
    .setMimeType(ContentService.MimeType.TEXT);
}

// NOTA: No puedes especificar el dominio permitido para CORS en Google Apps Script Web Apps.
// El control de acceso se realiza solo mediante la configuración de publicación del Web App.
// Google Apps Script no permite modificar el header Access-Control-Allow-Origin.

// Checklist para descartar problemas de CORS:
// 1. El Web App está publicado como "Cualquiera, incluso anónimo".
// 2. Estás usando la URL pública actual del Web App en tu frontend.
// 3. Tu frontend está desplegado en HTTPS (por ejemplo, Vercel).
// 4. El método de envío en el frontend es POST usando FormData (NO JSON).
// 5. El backend usa e.parameter para recibir los datos.
// 6. No hay headers personalizados en fetch (NO 'Content-Type': 'application/json').
// 7. La hoja de cálculo existe y tiene el nombre correcto.
// 8. El ID de la hoja de cálculo es el correcto.
// 9. No hay errores de permisos en la hoja de cálculo.
// 10. No hay bloqueos por extensiones del navegador (prueba en modo incógnito).

// Si todo esto está correcto y el error persiste, es una limitación de Google Apps Script con CORS.
// No hay solución definitiva desde el código, solo seguir las recomendaciones anteriores.

// IMPORTANTE:
// Google Apps Script Web Apps NO permite peticiones AJAX/fetch cross-domain por CORS.
// Solo puedes enviar datos usando formularios HTML tradicionales (method="POST").
// Si necesitas fetch/AJAX, usa un backend intermedio o cambia de plataforma.

