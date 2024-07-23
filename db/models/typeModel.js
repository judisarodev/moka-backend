const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'types';

const typeSchema = {
    typeId: {
        primaryKey: true,
        field: 'type_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

class Type extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: 'Type',
            timestamps: false,
        }
    }
}

module.exports = { Type, typeSchema }; 