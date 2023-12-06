var selectedId;
var turmaList = [];
var turma = {}

    document.querySelector('.create-turma').addEventListener('click', function() {
        openAddPopup();
        teladisabled();
    });
    // Chamada para preencher as turmas (pode ser uma chamada à API ou carga inicial)
    updateTurmas();
    // Função para atualizar a exibição das turmas
    function updateTurmas() {
        var boxTurma = document.getElementById('box-turma');
        boxTurma.innerHTML = '';

        // Obtemos as turmas do backend
        fetch('http://localhost:8080/ListTurmas', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter turmas do backend');
            }
            return response.json();
        })
        .then(data => {
            // Iteramos sobre as turmas e criamos os cards
            data.forEach(turma => {
                var turmaDiv = createTurmaCard(turma);
                boxTurma.appendChild(turmaDiv);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
    // Função para criar um card de turma
    function createTurmaCard(turma) {
        // Criação da div principal para a turma
        var turmaDiv = document.createElement('div');
        turmaDiv.classList.add('turma');
    
        // Adicionando nome da turma como título
        var h2 = document.createElement('h2');
        h2.innerText = turma.nome;
    
        // Criação da div para as opções de editar e excluir
        var optionDiv = document.createElement('div');
        optionDiv.classList.add('turma-option');
    
        // Criação do ícone de editar
        var imgEdit = document.createElement('img');
        imgEdit.setAttribute('src', '../public/imagem/Icon/Edit.svg');
        // Adiciona um ouvinte de evento para abrir o popup de edição ao clicar
        imgEdit.addEventListener('click', function() {
            openEditPopup(turma.id);
        });
    
        // Criação do ícone de excluir
        var imgDelete = document.createElement('img');
        imgDelete.setAttribute('src', '../public/imagem/Icon/Delete.svg');
        // Adiciona um ouvinte de evento para abrir o popup de excluir ao clicar
        imgDelete.addEventListener('click', function() {
            openRemovePopup(turma.id); 
        });
    
        // Adicionando elementos à div turma-option
        optionDiv.appendChild(imgEdit);
        optionDiv.appendChild(imgDelete);
    
        // Adicionando elementos ao card da turma
        turmaDiv.appendChild(h2);
        turmaDiv.appendChild(optionDiv);
    
        return turmaDiv;
    }
    
    // Função para abrir o popup de adição de turma
    function openAddPopup() {
        popupAdd.classList.add("openAddPopup");
    }
    // Função para fechar o popup de adição de turma
    function closeAddPopup() {
        popupAdd.classList.remove("openAddPopup");
    }
    // Função para abrir o popup de remoção de turma
    function openRemovePopup(id) {
        teladisabled();
        this.selectedId = id
        popupRemove.classList.add("open_popup");
    }
    // Função para fechar o popup de remoção de turma
    function closeRemovePopup(){
        popupRemove.classList.remove("open_popup");
    }
    // Função para reativar a tela após fechar um popup
    function telaEnabled() {
        telaDesativada.classList.remove("disabled_tela");
        backdrop.classList.remove("disabled_tela");
    }
    // Função para desativar a tela ao abrir um popup
    function teladisabled() {
        telaDesativada.classList.add("disabled_tela");
        backdrop.classList.add("disabled_tela");
    }
    // Função para abrir o popup de edição de turma
    function openEditPopup(id) {
        teladisabled();
        this.selectedId = id;
        popupEdit.classList.add("popupEditOpen");
        console.log('Id ', id);

        // Encontrar a turma correspondente ao ID selecionado
        let turmaEditando = this.turmaList.find(user => {
            return user.id === id;
        });

        console.log('Turma encontrada ', turmaEditando);

        // Preencher os campos do formulário de edição com os dados da turma
        document.getElementById('turmaNomeedit').value = turmaEditando.nome;

        if (turmaEditando.turma) {
            document.getElementById('turmaedit').value = turmaEditando.turma ? turmaEditando.turma.id : '';
        }
    }
    // Função para fechar o popup de edição de turma
    function closeEditPopup() {
        popupEdit.classList.remove("popupEditOpen");
    }
    function stopPropagation(event){
        event.stopPropagation();
    }
    
    function verificaCampo(){

        if (this.turma.nome.trim().length <= 0) {
            return true;
        } 
    
        return false;
    }
    
    // Função para adicionar uma nova turma
    function adicionar() {
        this.turma = {};
        this.turma.nome = document.getElementById('turmaNomeadd').value;
        this.turma.email = document.getElementById('emailAlunoadd').value;
        // Verificar se algum campo obrigatório está vazio
        if (verificaCampo()) {
            return exibirPopUpErro("Não foi possível atualizar a turma, há algum campo vazio.");
        }
         // Criar o objeto de dados a ser enviado para o servidor
        const dadosTurma = {
            nome: this.turma.nome,
            emailAluno: this.turma.email
        };
        let dadosJson = JSON.stringify(dadosTurma)

        // Se os campos de nomE não estiver vazio, fazer a requisição à API
        //TEM QUE FAZER O CAMINHO DO LOCALHOST
        fetch('http://localhost:8080/criarturma', {
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
                    throw new Error(JSON.stringify(dadosTurma));
                }
            }
            return response.json();
        })
        .then(data => {
            console.log("DEU BOM")
            updateTurmas();  // Atualiza a exibição após adicionar uma nova turma
        })
        .catch(error => {
            console.error('Erro:', error);
        });

        this.turma = {};

        // Limpar os campos do formulário de adição
        document.getElementById('turmaNomeadd').value = '';
        document.getElementById('emailAlunoadd').value = '';
    }
    //FUNÇÃO PARA EDITAR TURMA
    function editar() {
        // Obtém o valor do elemento com o ID "turmaNomeedit" e armazena em uma variável chamada "nome"
        var nome = document.getElementById("turmaNomeedit").value;

        // Encontra a turma na lista de turmas com base no ID selecionado
        this.turma = this.turmaList.find(user => {
            return user.id === this.selectedId;
        });

        // Atribui o novo nome à propriedade "nome" da turma
        this.turma.nome = nome;

        // Verifica se há algum campo vazio chamando a função "verificaCampo()"
        if (verificaCampo()) {
            // Exibe uma mensagem de erro se houver campo vazio e interrompe a xecução da função
            return exibirPopUpErro("Não foi possível atualizar a turma, há algum campo vazio.");
        }

        // Imprime no console a nova turma após a edição
        console.log('Nova turma ', this.turma);
        
        // Criar o objeto de dados a ser enviado para o servidor
        const dadosTurma = {
            id: this.selectedId,
            nome: this.turma.nome
        };
        let dadosJson = JSON.stringify(dadosTurma);

        // Se os campos de nome não estiverem vazios, fazer a requisição à API
        fetch('http://localhost:8080/editarTurma', {
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
                    console.log("esse erro");
                    throw new Error(JSON.stringify(dadosTurma));
                }
            }
            return response.json();
        })
        .then(data => {
            console.log("DEU BOM");
            updateTurmas();  // Atualiza a exibição após editar a turma
        })
        .catch(error => {
            console.error('Erro:', error);
        });

        this.turma = {};
    }
    //FUNÇÃO PARA EXCLUIR TURMA
    function remover() {
        // Buscar turma pelo ID
        fetch(`http://localhost:8080/buscarTurma/${turmaId}`, {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'},
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar turma');
            }
            return response.json();
        })
        .then(turma => {
            if (turma) {
                // Deletar turma pelo ID
                fetch(`http://localhost:8080/deletarTurma/${turmaId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type' : 'application/json'},
                    mode: 'cors'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao deletar turma');
                    }
                    return response.json();
                })
                .then(result => {
                    updateTurmas(); // Atualizar a exibição das turmas após a remoção
                })
                .catch(error => {
                    window.alert("Não é possível remover a turma");
                });
            } else {
                window.alert("Turma não encontrada");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    let popupRemove = document.getElementById("popupRemove");
    let popupEdit = document.getElementById("popupEdit");
    let popupAdd = document.getElementById("popupAdd");
    let telaDesativada = document.getElementById("tela");
    let backdrop = document.getElementById("backdrop");




    