'use strict'

//Otimizar
function menuHover() {
  const listaMenus = document.querySelectorAll(".menu > li");

  //faz aparecer o submenu principal
  listaMenus.forEach((menu) => {
    //Guard Clause: Retorna caso seja a monte seu pc
    if(menu.classList.contains("monte-pc"))
      return;
    
    menu.addEventListener("mouseover", function() {
      const subMenu = menu.querySelector(".sub-menu");
      subMenu.style.display = "block";
      
      
      setTimeout(() => {
        subMenu.style.opacity  = '1';
      }, 10);
    });

    menu.addEventListener("mouseleave", function() {
      const subMenu = menu.querySelector(".sub-menu");  
      subMenu.style.opacity  = '0.5';
      setTimeout(() => {
        subMenu.style.display = "none";
      }, 100);
      

    });
  });

  //Faz o sub menu secundário aparecer
  const subMenuDep = document.querySelector(".menu-dep .sub-menu");

  subMenuDep.addEventListener("mouseover", function(e) {
    const hoverEl = e.target.closest("li");
    const subMenu_2 = hoverEl.querySelector(".sub-menu_2"); //Puxa o 2º submenu
    
    if(hoverEl.classList.contains("iterable")){
      
      subMenu_2.style.display = "block";
      setTimeout(() => {
        subMenu_2.style.left = "100%";
      }, 10);
      this.style.borderBottomRightRadius = "0px";
    }
  });
  
  //Faz o sub menu secundario sumir
  const liIteraveis = subMenuDep.querySelectorAll(".iterable");

  liIteraveis.forEach((el) => {
    el.addEventListener("mouseleave", function() {
      const subMenu_2 = el.querySelector(".sub-menu_2");
      subMenu_2.style.display = "none";
      subMenu_2.style.left = "97%";

      subMenuDep.style.borderBottomRightRadius = "5px";
    });
  } )

}

//Hamburguer2
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


//Código principal
menuHover();
hamburguerMenuOficial(document.querySelector(".hamburguer-mobile"));