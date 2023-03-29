
let cadastroForm = document.querySelector("#formSignUp");
let nameInput = document.querySelector("#fullname");
let cpfInput = document.querySelector("#cpf");
let birthInput = document.querySelector("#birth");
let cellInput = document.querySelector("#cellphone");
let cepInput = document.querySelector("#cep");
let numberInput = document.querySelector("#number");
let inputEmail = document.querySelector("#email");
let passwInput = document.querySelector("#password");
let passConfirmInput = document.querySelector("#passwordC");

  //Valida Email e senha

  cadastroForm.addEventListener("submit", (e) => {

  //Email vazio e errado alerta 

  if(inputEmail.value === "" || !emailValidation(inputEmail.value)){
    alert("Por favor, preencha corretamente o email.")
    return;
  }

  //Senha vazia e errada alerta 

  if(!passwordValidation(passwInput.value, 8)){
    alert(`Por favor, crie uma senha com no minimo 8 digitos.`);
    return;
  }
  
  });

//função para formato correto do email

function emailValidation(email){
  
  const emailR = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
  
  );

  if(emailR.test(email)){
    return true
  } 
    return false

}

// Função validar formato senha

function passwordValidation(password, digitosMin) {
  if(password.length >= digitosMin){
    return true
  }

  return false

}

//confirma validação de senha

function confirmaSenha() {
  if (passwInput.value != passConfirmInput.value) {
    passConfirmInput.setCustomValidity("As senhas não batem!");
    passConfirmInput.reportValidity();
    return false;
  } else {
    passConfirmInput.setCustomValidity("");
    return true;
  }
};

// Verifica campo modificado para alerta sumir
passConfirmInput.addEventListener('input', confirmaSenha);