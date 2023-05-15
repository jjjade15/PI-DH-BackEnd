module.exports = (sequelize, DataType) => {
  const Carrinho = sequelize.define("Carrinho", {
    id_carrinho: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataType.INTEGER
    },
    valor_total: {
      type: DataType.DECIMAL(12,2),
      allowNull: true
    },
  }, {
    tableName: "carrinho",
    timestamps: false
  })

  //Criar as associações das tabelas aqui
  Carrinho.associate = (models) => {
    Carrinho.hasMany(models.Item_carrinho, {foreignKey: "id_carrinho"});
    Carrinho.belongsTo(models.Usuario, {foreignKey: "id_usuario"});
  }

  return Carrinho;
}