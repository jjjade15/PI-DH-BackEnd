const {check} = require("express-validator");

//Middleware de validação de produto
const validarProduto = [
  check("nome").notEmpty().isString().isLength({max:255}).withMessage("Nome inválido"),
  check("preco").notEmpty().isNumeric().withMessage("Preço Inválido (use . para separar casas decimais)"),
  check("fabricante").notEmpty().isString().isLength({max:45}),
  check("id_departamento").notEmpty().isNumeric().withMessage("Departamento inválido"),
  check("id_sub_departamento").optional().isNumeric().withMessage("Sub departamento inválido"),
  check("descricao").optional().isString().withMessage("Descricao inválida")
]

module.exports = validarProduto;