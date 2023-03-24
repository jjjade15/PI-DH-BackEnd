//Mostra a quantidade de resultados encontrados
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

//Muda a rota para a query string com o filtro correto
document.querySelector(".select-ord").addEventListener("change", function(e) {
  urlSite.searchParams.set("order", this.value);
  console.log(urlSite.href);
  window.location.href = urlSite;
});


urlSite.searchParams.set("abacaxi", 222);