module.exports = (sequelize, DataType) => {
  const Usuario = sequelize.define("Usuario", {
    id_usuario: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataType.STRING(100)
    },
    email: {
      type: DataType.STRING(100)
    },
    senha: {
      type: DataType.STRING(100)
    },
    cpf: {
      type: DataType.STRING(45)
    },
    telefone: {
      type: DataType.STRING(45)
    },
    data_nasc: {
      type: DataType.DATE
    },
    adm: {
      type: DataType.BOOLEAN
    },
  }, {
    tableName: "usuario",
    timestamps: false
  })

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Endereco, {foreignKey:"id_usuario"});
    Usuario.hasOne(models.Carrinho, {foreignKey:"id_usuario"});
  }
  return Usuario;
}