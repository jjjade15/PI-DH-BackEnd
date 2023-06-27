module.exports = (sequelize, DataType) => {
  const Produto = sequelize.define("Produto", {
    id_produto: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataType.STRING(255)
    },
    preco: {
      type: DataType.DECIMAL(10, 2)
    },
    fabricante: {
      type: DataType.STRING(45),
      allowNull: true
    },
    id_departamento: {
      type: DataType.INTEGER
    },
    id_sub_departamento: {
      type: DataType.INTEGER,
      allowNull: true
    },
    imagem_principal: {
      type: DataType.STRING,

    },
    descricao: {
      type: DataType.TEXT,
      allowNull: true
    },
  }, {
    tableName: "produto",
    timestamps: false
  })

  //Criar as associações das tabelas aqui
  Produto.associate = (models) => {
    Produto.hasMany(models.Imagem, {foreignKey: "id_produto"});
    Produto.hasMany(models.Item_carrinho, {foreignKey: "id_produto"});

    Produto.belongsTo(models.Departamento, {foreignKey: "id_departamento"});
    Produto.belongsTo(models.Sub_departamento, {foreignKey: "id_sub_departamento"});
  }

  return Produto;
}