
const express = require('express');
const router = express.Router();
const { models } = require('./../../db/sequelize');
const path = require('path'); 
const sequelize = require('./../../db/sequelize');
const { Op } = require('sequelize');

router.get('/get-all-product-types', async (req, res) => {
    try{
        const types = await models.Type.findAll();
        return res.status(200).json(types); 
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
});

router.get('/get-all-products', async (req, res) => {
    try{
        const products = await models.Product.findAll();
        const response = [];
        for(const product of products){
            const p = product.toJSON();
            const types = await models.TypePerProduct.findAll({ 
                where: { productId: p.productId },
                include: [{
                    model: models.Type,
                    as: 'type'
                }]
            });
            
            p.types = [];
            for(const type of types){
                p.types.push(type.dataValues.type.name);
            }
            
            response.push(p);
        }
        return res.status(200).json(response); 
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message); 
    }
});

router.get('/get-random-cakes/:typeId', async (req, res) => {
    try{
        const { typeId } = req.params;
        const arr = await models.TypePerProduct.findAll({ 
                where: { typeId }, 
                order: sequelize.random(),
                limit: 10,
                attributes: ['productId'] 
            });
            console.log(arr);
            const whereClause = [];
            for(const p of arr){
                whereClause.push({ productId: p.productId });
            }
        const products = await models.Product.findAll({ where: { [Op.or]: whereClause }, attributes: ['productId', 'fileName'] });
        return res.status(200).json(products); 
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message); 
    }
});

console.log('path', path.join(__dirname, '../../assets'));

router.post('/insert-product', async (req, res) => {
    try{
        const {
            name, 
            description,
            fileName,
            typesIds
        } = req.body;
        const product = await models.Product.create({ name, description, fileName });
        
        for(const id of typesIds){
            await models.TypePerProduct.create({ productId: product.dataValues.productId, typeId: id }); 
        }
        return res.status(200).json({ message: 'Producto creado con éxito' });
    }catch(error){
        console.log(error.message);
        return res.status(500).json(error.message); 
    }
});


module.exports = router; 