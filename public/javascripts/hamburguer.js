function hamburguerMenuOficial(elAbre) {
  //Abre e fecha o menu
  function menuContainer() {
    const menuHamburguer = document.querySelector(".push-menu-container");

    const fechaMenu = document.querySelector("#fecha-menu");

    let c = 0;
    function mudaMenu() {
      // Usa impar par pra abrir o menu mesmo
      if (!c) {
        menuHamburguer.style.transform = "translateX(0)";
        document.body.style.overflow = "hidden";

        document.body.insertAdjacentHTML(
          "afterbegin",
          `<div id="blur"> </div>`
        );
        c = 1;
      } else {
        menuHamburguer.style.transform = "translateX(-100%)";
        document.body.style.overflow = "auto";
        document.querySelector("#blur").remove();
        c = 0;
      }
    }

    elAbre.addEventListener("click", mudaMenu);
    fechaMenu.addEventListener("click", mudaMenu);
    document.body.addEventListener("click", function (e) {
      if (e.target === document.querySelector("#blur")  && c === 1) mudaMenu();
    });
  }

  function dropdownHanburguer() {
    const dropdownContainer = document.querySelector(".dropdown-hamburguer");

    dropdownContainer.addEventListener("click", function (e) {
      const clicado = e.target.closest("li");

      const subMenu = clicado.nextElementSibling;
      const menuPai = subMenu.parentNode;
      //Retorna caso não haja um sub menu
      if (!subMenu.classList.contains("sub_m")) return;

      //Ativa o submenu
      if (!subMenu.classList.contains("active")) {
        subMenu.classList.add("active");
        clicado.classList.add("active");
        subMenu.style.height = subMenu.scrollHeight +  "px";
        
        //Faz com que o menu pai não tenha mais uma height fixa
        menuPai.style.height = "auto";
        console.log("Ativou");
      } 
      //Desativa o submenu
      else {
        
        const fechaSubMenu = (sm) => {
          sm.classList.remove("active");
          clicado.classList.remove("active");
          
          //Reajusta a altura do elemento para um valor fixo para que a animação ocorra normalmente
          subMenu.style.height = subMenu.scrollHeight +  "px";
          setTimeout(() => {
                      
          sm.style.height = "0px";
    
          
          }, 10);



        }

        fechaSubMenu(subMenu); //Fecha o menu clicado

        //Fecha os submenus dos submenus que podem ter ficado abertos
        const [...filhosSubMenu] = subMenu.children

        filhosSubMenu.forEach((el) => {
          if(el.classList.contains("sub_m")) {
            fechaSubMenu(el);
          }
        });

      }
    });


  }

  //Principal
  menuContainer();
  dropdownHanburguer();
}


window.onload = function(){
  document.querySelector(".push-menu-container").style.display = "flex";
  hamburguerMenuOficial(document.querySelector(".hamburguer-mobile"));
}


