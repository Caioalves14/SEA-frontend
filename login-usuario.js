function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const data = {
        email: email,
        senha: senha
    };
    fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: 'cors'
})
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            throw new Error("Erro na solicitação"); 
        }
    })
    .then(responseData => {
        console.log(responseData);
        alert("Login bem-sucedido!");
    })
    .catch(error => {
        console.log("DEU RUIMMMM", error);
        alert("Senha ou Email incorretos ou ocorreu um erro na solicitação");
    });
}