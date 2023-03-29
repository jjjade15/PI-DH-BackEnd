
let loginForm = document.querySelector("#formLogin");
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');

loginForm.addEventListener("submit", (e) => {

  //Email vazio e errado alerta 

  if(emailInput.value === "" || !emailValidation(emailInput.value)){
    alert("Por favor, preencha corretamente o email.")
    return;
  }

  //Senha vazia e errada alerta 

  if(!passwordValidation(passwordInput.value, 8)){
    alert(`Por favor, preencha a senha corretamente. Dica: a senha é de no minimo 8 digitos`);
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



