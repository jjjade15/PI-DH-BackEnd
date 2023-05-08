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
    }
  }, {
    tableName: "usuario",
    timestamps: false
  })

  Endereco.associate = (models) => {
    Endereco.belongsTo(models.Usuario, {foreignKey: "id_usuario"})
  }

  return Endereco;
}

