document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Validación extra (opcional)
    if ([...formData.values()].some(v => v.trim() === "")) {
        document.getElementById('responseMsg').textContent = "Por favor, completa todos los campos.";
        return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwcglPkhQCO-Qv5FH7EousrYmY87jsiY-jS6ahrNoO7R-6XVVOWJDq1Xo2qD-D15cYpJA/exec';

    try {
        const res = await fetch(scriptURL, {
            method: 'POST',
            body: formData
            // No pongas headers, fetch los pone automáticamente para FormData
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
