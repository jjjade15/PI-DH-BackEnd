module.exports = (sequelize, DataType) => {
  const Imagem = sequelize.define(
    "Imagem",
    {
      id_imagem: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_produto: {
        type: DataType.INTEGER,
      },

      caminho: {
        type: DataType.STRING(255),
      },
    },
    {
      tableName: "imagem",
      timestamps: false,
    }
  );
  
  Imagem.associate = (models) => {
    Imagem.belongsTo(models.Produto, {foreignKey: "id_produto"});
  }

  return Imagem;
};
