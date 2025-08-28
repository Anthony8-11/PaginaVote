document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        voterName: form.voterName.value.trim(),
        nominado1: form.nominado1.value.trim(),
        nominado2: form.nominado2.value.trim(),
        nominado3: form.nominado3.value.trim(),
        nominado4: form.nominado4.value.trim(),
        nominado5: form.nominado5.value.trim(),
        nominado6: form.nominado6.value.trim()
    };

    // Validación extra (opcional)
    if (Object.values(data).some(v => v === "")) {
        document.getElementById('responseMsg').textContent = "Por favor, completa todos los campos.";
        return;
    }

    // Cambia esta URL por la de tu Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxAol0uvd3IXM1TL9w6myJ0VKIyMuKpvYEsgrqj1_megI2a6lNHQT16D3n2lUE-l4iVYA/exec';

    // Enviar datos como FormData para evitar problemas de CORS
    const formData = new FormData();
    formData.append('voterName', data.voterName);
    formData.append('nominado1', data.nominado1);
    formData.append('nominado2', data.nominado2);
    formData.append('nominado3', data.nominado3);
    formData.append('nominado4', data.nominado4);
    formData.append('nominado5', data.nominado5);
    formData.append('nominado6', data.nominado6);

    try {
        const res = await fetch(scriptURL, {
            method: 'POST',
            body: formData
            // No pongas headers, fetch los pone automáticamente
        });
        if (res.ok) {
            document.getElementById('responseMsg').textContent = "¡Votación enviada correctamente!";
            form.reset();
        } else {
            const errorText = await res.text();
            document.getElementById('responseMsg').textContent = "Error al enviar la votación: " + errorText;
        }
    } catch (err) {
        document.getElementById('responseMsg').textContent = "No se pudo conectar al servidor: " + err.message;
        console.error(err);
    }
});
