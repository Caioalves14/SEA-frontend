
function cadastrarUsuario() {
    let imputCategoria = localStorage.getItem('categoria_atual');
    let imputNome = document.getElementById("alunoNomeadd").value;
    let imputEmail = document.getElementById("alunoEmailadd").value;
    let imputSenha = document.getElementById("senhaAlunoadd").value;
    const dadosUsuario = {
        nome: imputNome,
        email: imputEmail,
        senha: imputSenha,
        categoria: imputCategoria,
      };

    let dadosJson = JSON.stringify(dadosUsuario)

    fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: dadosJson,
        mode: 'cors'
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) {
                    // Erro de CORS
                    console.error('Erro de CORS:', response.statusText);
                } else {
                    // Outro erro
                    console.log("esse erro")
                    throw new Error(JSON.stringify(dadosUsuario));
                }
            }
            return response.json();
        })
        .then(data => {
            console.log("DEU BOM")
            // document.getElementById('resultado').textContent = 'Usuário cadastrado com sucesso';
        })
        .catch(error => {
            console.error('Erro:', error);
            // document.getElementById('resultado').textContent = 'Erro na requisição da API';
        });
}

function setCategoriaAtual(categoria) {
    localStorage.setItem("categoria_atual", categoria);
}


function toggleCategory(categoria = undefined) {
    if (categoria === undefined) {
        categoria = localStorage.getItem("categoria_atual")
    } else {
        setCategoriaAtual(categoria=categoria)
    }

    const elemento = document.getElementById(categoria);
    const elemento2 = categoria === "professor" ? "aluno" : "professor";
    const element2 = document.getElementById(elemento2);
    
    element2.style.background = "transparent";
    elemento.style.background = "#5D557D";
    elemento.style.borderRadius = "8px";
}
