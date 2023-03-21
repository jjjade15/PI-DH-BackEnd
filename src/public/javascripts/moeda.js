'use strict'

export function realParaNumber(num) {
  //Verifica a quantidade de caracteres da parte inteira
  num = num.replace(',', '.').replace("R$", '');
  
  return Number(num)
  
}

export function numberParaReal(n) {
  return n.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}


