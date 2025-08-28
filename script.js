document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Validación extra (opcional)
    if ([...formData.values()].some(v => v.trim() === "")) {
        document.getElementById('responseMsg').textContent = "Por favor, completa todos los campos.";
        return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwtTBhmlShQovY8xo7PO9-Y1FyYuBQkM4fi8jPQ075YwxoKuADUKEj15tpMYTxW1cMq9Q/exec';

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
});

