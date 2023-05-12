module.exports = (sequelize, DataType) => {
  const Sub_departamento = sequelize.define(
    "Sub_departamento",
    {
      id_sub_departamento: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_departamento: {
        type: DataType.INTEGER,
      },

      nome: {
        type: DataType.STRING(45),
      },
    },
    {
      tableName: "sub_departamento",
      timestamps: false,
    }
  );

  Sub_departamento.associate = (models) => {
    Sub_departamento.belongsTo(models.Departamento, {foreignKey: "id_departamento"});
    Sub_departamento.hasMany(models.Produto, {foreignKey:"id_sub_departamento"});
  }

  return Sub_departamento;
};
