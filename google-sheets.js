// Este archivo es solo una referencia para el backend en Google Apps Script.
// Copia este código en el editor de Google Apps Script vinculado a tu Google Sheet.

// doPost: procesa los datos del formulario
function doPost(e) {
  // Reemplaza por el ID de tu hoja de cálculo
  var ss = SpreadsheetApp.openById('TU_ID_DE_HOJA_DE_CALCULO');
  var sheet = ss.getSheetByName('Votaciones');
  var data = JSON.parse(e.postData.contents);

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

// Recuerda publicar el script como "Web App" y permitir acceso anónimo.

