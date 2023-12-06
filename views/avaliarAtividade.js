function avaliarAtividade() {
    const atividadeId = 1; // Substitua pelo ID da atividade que está avaliando
    const nota = document.getElementById("nota").value;
    const comentario = document.getElementById("comentario").value;

    fetch(`/api/atividades/${atividadeId}/avaliar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nota: nota,
            comentario: comentario
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Atividade avaliada com sucesso!");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erro ao avaliar atividade.");
    });
}
