module.exports = (sequelize, DataType) => {
  const Departamento = sequelize.define("Departamento", {
    id_departamento: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataType.STRING(45)
    },    
  }, {
    tableName: "departamento",
    timestamps: false
  })

  Departamento.associate = (models) => {
    Departamento.hasMany(models.Produto, {foreignKey: "id_departamento"});
    Departamento.hasMany(models.Sub_departamento, {foreignKey: "id_departamento"});
  }

  return Departamento;
}