const { Product, productSchema } = require('./productModel');
const { Type, typeSchema } = require('./typeModel');
const { TypePerProduct, typePerProductSchema } = require('./typePerProductModel');

function setUpModels(sequelize){
    Product.init(productSchema, Product.config(sequelize));
    Type.init(typeSchema, Type.config(sequelize));
    TypePerProduct.init(typePerProductSchema, TypePerProduct.config(sequelize));

    TypePerProduct.associate(sequelize.models);
}

module.exports = setUpModels; 