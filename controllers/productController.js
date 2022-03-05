const productModel = require('../models/productModel');


const getProducts = (req, res, next) => {
    const { id } = req.params;

    if(id){
        productModel.findOne( {_id: id} )
            .then((product) => res.send(product))
            .catch((err) => res.send(err))
    }

    productModel.find( {} ).lean()
        .then((products) => res.render("products", {products}))
        .catch((err) => res.send(err))
        //todo hacer el views mejor para esto, sacar las cards del index
}

const getByCategory = (req, res, next) => {
    const { category } = req.params;

    productModel.find( {category: category} )
        .then((product) => res.send(product))
        .catch((err) => res.send(err))
}

// add producto solo si se es admin
const addProduct = (req, res, next) => {

    const isAdmin = req.user.admin;
    console.log(isAdmin)
    if (isAdmin != "admin"){
        res.json({error: -1, descripcion: "Path not authorized"});
    } 

    const {title, description, price, img, category, stock} = req.body;

    const productSaved = new productModel({title, description, category, img, price, stock});

    console.log(productSaved);

    productSaved.save()
        .then( () => res.sendStatus(201) )
        .catch( (err) => res.status(400).json({
            status: 400,
            message: err
        }))
}

// actualizar producto por ID

const updateProduct = (req, res, next) =>{

    const isAdmin = req.user.admin;
    console.log(isAdmin)
    if (isAdmin != "admin"){
        res.json({error: -1, description: "Path not authorized"});
    } 

    const { id } = req.params;

    const {title, description, price, img, category, stock} = req.body;   
    
    productModel.updateOne({_id: id}, {
        $set: {title: title, description: description, price: price, img: img, category: category, stock: stock}
    })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => res.send(err))

}

//* eliminar producto por ID

const deleteProduct = (req, res, next) => {
    
    const isAdmin = req.user.admin;
    console.log(isAdmin)
    if (isAdmin != "admin"){
        res.json({error: -1, descripcion: "Path not authorized"});
    } 
    
    const { id } = req.params;

    productModel.deleteOne( {_id: id} )
        .then(() => res.sendStatus(200))
        .catch( (err) => res.status(404).json({
            status: 404,
            message: 'ID not found. Product can not be deleted.'
        }))
}


module.exports = {
    getProducts,
    getByCategory,
    addProduct,
    updateProduct, 
    deleteProduct
}