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

menuHover();