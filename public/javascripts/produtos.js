//Mostra a quantidade de resultados encontrados
const xboxfab = document.querySelector(".fabricantes form") //filtro produto
const fabricantes = document.querySelectorAll(".fabricantes form input") //filtro produto


const numProdutos = document.querySelector(".flex-anuncios").childElementCount;
document.querySelector("#quantid-produtos").innerText = numProdutos;
const selectOptions = document.querySelectorAll(".filtro-header option");

//Analisa a URL
const urlSite = new URL(location.href)
const urlParams = new URLSearchParams(urlSite.search);

//Muda o query string selecionado
if(urlParams.get("order") === "menorp") {
  selectOptions[1].setAttribute("selected", "")
}else if(urlParams.get("order") === "maiorp") {
  selectOptions[2].setAttribute("selected", "")
}

const fabSelecionado = urlSite.searchParams.get("fabricante");

//Deixa check box selecionada
fabricantes.forEach((fab) =>{
  console.log(fabSelecionado)

    if(fab.name == fabSelecionado){
      fab.checked = true
      
    }
})

//Muda a rota para a query string com o filtro correto
document.querySelector(".select-ord").addEventListener("change", function(e) {
  urlSite.searchParams.set("order", this.value);

  window.location.href = urlSite;
});


// Filtro fabricantes
xboxfab.addEventListener("change", function(e) {


  if(e.target.checked){
    urlSite.searchParams.set("fabricante", e.target.name);
    window.location.href = urlSite;
    console.log(urlSite.href);
    
    
  }
})
