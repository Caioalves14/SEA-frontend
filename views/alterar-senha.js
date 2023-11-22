
function alterarSenha(){
    // Definindo essas variáveis que vem dos campos da tela
    const senhaAtual = document.getElementById("senhaAntiga").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmaNovaSenha = document.getElementById("confNovaSenha").value;
    
    // Definindo uma url em uma variável
    const url = "http://localhost:8080/alterarSenha";

    // :Definindo uma constante
    const dataSenha = {
        senhaAtual: senhaAtual,
    };
    
    // Verificando se a nova senha e a sua confirmação se coincidem
    if(novaSenha !== confirmaNovaSenha){
        alert("nova senha e sua confirmação não coincidem");
        return;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSenha),
        mode: 'cors'
    })

    .then(response =>{
        if(response.ok) {
            alert("Senha alterada com sucesso");
            alert("Deu certo");
        } else {
            throw new Error("Erro na senha");
        }
    })
    .then(responseData => {
        console.log(responseData);
        alert("Graças a Deus");
    })
    // Verificação de erro
    .catch(error => {
        console.log("Deu errado", error);
        alert("Senha antiga incorreta")
    })

}