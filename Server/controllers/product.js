const Product = require('../models/product');
const image = require('../utils/image')

async function createProduct (req, res) {
    const product = new Product(req.body);

    try {
        const imagePath = image.getFilePath(req.files.images);
        product.images = imagePath;
        
        const savedProduct = await product.save();
        if(!savedProduct){
            return res.status(400).send({ msg: "Error al crear el producto"});
        }
        
        res.status(200).send({savedProduct});
    } catch(error) {
        return res.status(500).send(error);
    }
}

async function getProduct(req, res) {
    const { id } = req.params;

    try {
        const response = await Product.findById(id);
        
        if(!response){
            return res.status(500).send({ msg: "No se ha encontrado el producto"})
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ msg: "Error al obetener el producto", error})
    }    
}

async function getProducts(req, res) {
    const { 
        category, 
        active, 
        page = 1, 
        limit = 10 
    } = req.query;

    const options = {
        page: parseInt(page, 10), 
        limit: parseInt(limit, 10)
    };

    let query = {};
    if (category !== undefined) {
        query.category = category;
    }
    if (active !== undefined) {
        query.active = active === 'true'; 
    }

    try {
        const products = await Product.paginate(query, options);

        if (products.docs.length === 0) {
            return res.status(400).send({ msg: "No se ha encontrado ningún producto" });
        }

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ msg: "Error al obtener los productos", error });
    }
}

async function updateProduct (req, res) {
    const { id } = req.params;

    const productData = req.body;

    try {
        if(req.files.images){
            const imagePath = image.getFilePath(req.files.images);
            productData.images = imagePath;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            productData,
            {new: true},
        )

        if(!updatedProduct){
            return res.status(404).send({ msg: "Error al actualizar el producto"});
        }

        res.status(200).send({ msg: "Atualización correcta", product: updatedProduct });

    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar el producto", error})
    }
}

async function deleteProduct (req, res) {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return res.status(404).send({ msg: "Error al eliminar el producto"});
        }

        res.status(200).send({ msg: "Producto eliminado correctamente"});
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el producto", error})
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProducts, 
    updateProduct, 
    deleteProduct
}