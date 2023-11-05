function recuperarSenha(){
    const email = document.getElementById("email").value;

    const dataEmail = {
        email: email,
    };
    fetch("http://localhost:8080/recuperarSenha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataEmail),
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                alert("Foi enviado um código de verificação para o seu email");
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
            alert("Email Incorreto");
        });
}