document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#botao");
    const modal = document.querySelector("dialog");
    const botaoOk = document.querySelector("#ok");
    const botaoCancela = document.querySelector("#cancela");
    const emailDialogInput = document.querySelector("#emailDialogInput");

    button.onclick = function () {
        modal.showModal();
    };

    botaoOk.onclick = function () {
        // Recupera o valor do campo email da caixa de diálogo
        const emailAluno = emailDialogInput.value;

        // Chama a função para enviar a requisição ao servidor
        enviarRequisicaoParaServidor(emailAluno);

        modal.close();
    };

    botaoCancela.onclick = function () {
        modal.close();
    };

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.close();
        }
    });
});

function enviarRequisicaoParaServidor(email) {
    const url = 'http://localhost:8080/adicionarAluno';

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    };

    fetch(url, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        });
}
