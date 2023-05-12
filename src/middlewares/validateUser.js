const { check } = require('express-validator');
const validarCadastro = [
    check('nome').notEmpty().withMessage('Não se esqueça de preencher o nome ;)').bail()
    .isString().withMessage('Apenas letras no campo de nome ;)'),
    check('email').notEmpty().withMessage('Não se esqueça de preencher o email ;)').bail()
    .isEmail().withMessage('Por favor, preencha um email valido ;)'),
    check('senha').notEmpty().withMessage('Não se esqueça de definir uma senha ;)').bail()
    .isLength({ min: 8 }).withMessage('Crie uma senha de no minimo 8 digitos ;)'),
    check('passwordC').notEmpty().withMessage('Preencha o campo de confirmação de senha ;)').bail(), //inserir validação de comparação
    check('cpf').isLength({max:11}).withMessage('CPF muito longo')
];

module.exports = validarCadastro;