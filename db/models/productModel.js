const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'products';

const productSchema = {
    productId: {
        primaryKey: true,
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
        field: 'image_url'
    }
};

class Product extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'Product',
            timestamps: false,
        }
    }
}

module.exports = { Product, productSchema }; 