const {check} = require("express-validator");

//Middleware de validação de produto
const validarProduto = [
  check("nome").notEmpty().isString().isLength({max:255}).withMessage("Nome inválido"),
  check("preco").notEmpty().isNumeric().withMessage("Preço Inválido (use . para separar casas decimais)").bail().isLength({max:11}).withMessage("Número muito alto, valor máximo do site 9999999.99"),
  check("fabricante").optional().isString().isLength({max:45}).withMessage("Nome fabricante muito longo"),
  check("id_departamento").notEmpty().isNumeric().withMessage("Departamento inválido"),
  check("id_sub_departamento").optional().isNumeric().withMessage("Sub departamento inválido"),
  check("descricao").optional().isString().withMessage("Descricao inválida")
]

module.exports = validarProduto;