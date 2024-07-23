const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'types_per_product';

const typePerProductSchema = {
    typePerProductId: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        field: 'type_per_product_id',
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id'
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'type_id'
    }
};

class TypePerProduct extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'TypePerProduct',
            timestamps: false,
        }
    }
    static associate(models){
        this.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
        this.belongsTo(models.Type, { as: 'type', foreignKey: 'typeId' });
    }
}

module.exports = { TypePerProduct, typePerProductSchema }; 