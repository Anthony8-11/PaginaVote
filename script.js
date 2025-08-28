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

    document.getElementById('responseMsg').textContent = "¡Votación enviada correctamente!";
    form.reset();
});
    try {
        const res = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
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
