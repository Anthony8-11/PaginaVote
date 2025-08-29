document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Deshabilita el botón para evitar doble envío
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const formData = new FormData(form);

    // Validación extra (opcional)
    if ([...formData.values()].some(v => v.trim() === "")) {
        document.getElementById('responseMsg').textContent = "Por favor, completa todos los campos.";
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar Votación";
        return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyWkFAhaIWZaJkGFAGWofp675tQ0MWU4y07pefsIrcV--SZrK0xYmCCcMqn0W7rnaq-rg/exec';

    try {
        const res = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        if (result.status === 'OK') {
            document.getElementById('responseMsg').textContent = "¡Votación enviada correctamente!";
            form.reset();
        } else {
            document.getElementById('responseMsg').textContent = "Error: " + (result.message || "No se pudo enviar la votación.");
        }
    } catch (err) {
        document.getElementById('responseMsg').textContent = "No se pudo conectar al servidor: " + err.message;
        console.error(err);
    }
    // Reactiva el botón
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar Votación";
});

