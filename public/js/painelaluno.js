var selectedId;
var turmaList = [];
var turma = {}
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
const diasTag = document.querySelector(".dias"),
    dataAtual = document.querySelector(".data-atual"),
    iconesAntProx = document.querySelectorAll(".seta span");

// obtendo nova data, ano e mês atuais
let data = new Date(),
    anoAtual = data.getFullYear(),
    mesAtual = data.getMonth();

// armazenando o nome de todos os meses
const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", 
    "Maio", "Junho", "Julho", "Agosto", "Setembro", 
    "Outubro", "Novembro", "Dezembro"
];

const renderizarCalendario = () => {
    let primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay(), // obtendo o primeiro dia do mês
        ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate(), // obtendo o último dia do mês
        ultimoDiaDoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate(); // obtendo o último dia do mês anterior
    let liTag = "";

    for (let i = primeiroDiaDoMes; i > 0; i--) {
        // criando li dos últimos dias do mês anterior
        liTag += `<li class="inactive">${ultimoDiaDoMesAnterior - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimoDiaDoMes; i++) {
        // criando li de todos os dias do mês atual
        // adicionando a classe ativa à li se o dia atual, o mês e o ano corresponderem
        let hoje =
            i === data.getDate() &&
                mesAtual === new Date().getMonth() &&
                anoAtual === new Date().getFullYear()
                ? "active"
                : "";
        liTag += `<li class="${hoje}">${i}</li>`;
    }

    for (let i = ultimoDiaDoMes; i < 6; i++) {
        // criando li dos primeiros dias do próximo mês
        liTag += `<li class="inactive">${i - ultimoDiaDoMes + 1}</li>`;
    }
    dataAtual.innerText = `${meses[mesAtual]} ${anoAtual}`; // passando o mês e o ano atuais como texto da data atual
    diasTag.innerHTML = liTag;
};

renderizarCalendario();

iconesAntProx.forEach(seta => {
    // obtendo ícones de anterior e próximo
    seta.addEventListener("click", () => {
        // adicionando evento de clique em ambos os ícones
        // se o ícone clicado for o ícone anterior, então decrementar o mês atual em 1, senão incrementar em 1
        mesAtual = seta.id === "ant" ? mesAtual - 1 : mesAtual + 1;

        if (mesAtual < 0 || mesAtual > 11) {
            // se o mês atual for menor que 0 ou maior que 11
            // criando uma nova data do ano e mês atuais e passando como valor da data
            data = new Date(anoAtual, mesAtual, new Date().getDate());
            anoAtual = data.getFullYear(); // atualizando o ano atual com o ano da nova data
            mesAtual = data.getMonth(); // atualizando o mês atual com o mês da nova data
        } else {
            data = new Date(); // passando a data atual como valor da data
        }
        renderizarCalendario(); // chamando a função renderizarCalendario
    });
});
