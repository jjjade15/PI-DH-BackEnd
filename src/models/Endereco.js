const Usuario = require("./Usuario");

module.exports = (sequelize, DataType) => {
  const Endereco = sequelize.define("Endereco", {
    id_endereco: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataType.INTEGER
    },
    cep: {
      type: DataType.STRING(13)
    },
    rua: {
      type: DataType.STRING(45)
    },
    numero: {
      type: DataType.INTEGER
    },
    bairro: {
      type: DataType.STRING(200)
    },
    cidade: {
      type: DataType.STRING(200)
    },
    estado: {
      type: DataType.STRING(200)
    },
    complemento: {
      type: DataType.STRING(200)
    }
  }, {
    tableName: "endereco",
    timestamps: false
  })

  Endereco.associate = (models) => {
    Endereco.belongsTo(models.Usuario, {foreignKey: "id_usuario"})
  }

  return Endereco;
}

