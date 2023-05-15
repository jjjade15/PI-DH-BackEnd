module.exports = (sequelize, DataType) => {
  const Item_carrinho = sequelize.define("Item_carrinho", {
    id_carrinho: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    id_produto: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    quantidade: {
      type: DataType.INTEGER,
    },
  }, {
    tableName: "item_carrinho",
    timestamps: false
  })

  //Criar as associações das tabelas aqui
  Item_carrinho.associate = (models) => {
    Item_carrinho.belongsTo(models.Carrinho, {foreignKey: "id_carrinho"});
    Item_carrinho.belongsTo(models.Produto, {foreignKey: "id_produto"});
  }

  return Item_carrinho;
}