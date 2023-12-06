document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#botao");
    const modal = document.querySelector("dialog");
    const botaoOk = document.querySelector("#ok");
    const botaoCancela = document.querySelector("#cancela");
    const emailDialogInput = document.querySelector("#emailDialogInput");
    const campoSelect = document.querySelector("#campo");
    const tabelaBody = document.querySelector("tbody");
  
    button.onclick = function () {
      modal.showModal();
    };
  
    botaoOk.onclick = function () {
      const emailAluno = emailDialogInput.value;
      enviarRequisicaoParaServidor(emailAluno);
    };
  
    botaoCancela.onclick = function () {
      modal.close();
    };
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  
    function realizarPesquisa() {
        var termo = document.getElementById("termo").value.toLowerCase();
        var campo = document.getElementById("campo").value;

        // Fazer solicitação AJAX para o servidor
        fetch(`/pesquisaralunos?termo=${encodeURIComponent(termo)}&campo=${campo}`)
            .then(response => response.json())  // Parse da resposta como JSON
            .then(resultados => {
                atualizarTabela(resultados); // Chama a função para atualizar a tabela
            })
            .catch(error => {
                console.error('Erro durante a requisição ao servidor:', error);
                // Trate o erro de acordo com as necessidades do seu aplicativo
            });
    }

  
    function enviarRequisicaoParaServidor(email) {
      fetch('/adicionaraluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'alunoEmailadd=' + encodeURIComponent(email),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar aluno: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Aluno adicionado com sucesso:', data);
          modal.close();
          realizarPesquisa();
          // Adicione qualquer manipulação adicional aqui, se necessário
        })
        .catch(error => {
          console.error('Erro durante a requisição ao servidor:', error);
          // Trate o erro de acordo com as necessidades do seu aplicativo
        });
    }

    function atualizarTabela(resultados) {
        tabelaBody.innerHTML = "";

        if (resultados && resultados.length > 0) {
            resultados.forEach(aluno => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${aluno.nome}</td>
                    <td>${aluno.id}</td>
                    <td>${aluno.email}</td>
                    <td class="quatro">
                        <a href="/excluiraluno/${aluno.id}">
                            <img src="/imagem/excluir.png" alt="Excluir">
                        </a>
                    </td>
                `;
                tabelaBody.appendChild(tr);
            });
        } else {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td colspan="4">Nenhum aluno encontrado</td>
            `;
            tabelaBody.appendChild(tr);
        }
    }

  });
  