
const express = require('express');
const router = express.Router();
const { models } = require('./../../db/sequelize');
const path = require('path'); 
const sequelize = require('./../../db/sequelize');
const { Op, where } = require('sequelize');

router.get('/get-all-product-types', async (req, res) => {
    try{
        const types = await models.Type.findAll();
        return res.status(200).json([{
            typeId: 0,
            name: 'Todas las categorías'
        }, ...types]); 
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
});

router.get('/get-all-products', async (req, res) => {
    try{
        const products = await models.Product.findAll({
            order: sequelize.random(),
            attributes: ['productId', 'name', 'fileName']
        });
        
        return res.status(200).json(products); 
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message); 
    }
});

router.get('/get-all-products/:typeId', async (req, res) => {
    try{
        const { typeId } = req.params;

        const typesPerProduct = await models.TypePerProduct.findAll({ 
            where: { typeId }, 
            order: sequelize.random(),
            attributes: ['productId'] 
        });

        const productIds = [];
        for(const typePerProduct of typesPerProduct){
            productIds.push(typePerProduct.dataValues.productId);
        }
        
        const products = await models.Product.findAll({
            order: sequelize.random(),
            where: {
                productId: productIds
            },
            attributes: ['productId', 'name', 'fileName']
        });
        
        return res.status(200).json(products); 
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

/*router.post('/insert-product', async (req, res) => {
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
});*/

module.exports = router; 