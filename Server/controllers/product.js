import Product from '../models/product.js';
import * as image from '../utils/image.js'; // Asegúrate de que `image.js` exporte las funciones necesarias
import cloudinary from '../services/cloudinaryConfig.js';

export async function createProduct(req, res) {
    const product = new Product(req.body);

    try {
        if (req.body.images) { // La imagen está en base64
            const result = await cloudinary.uploader.upload(req.body.images, {
                folder: 'products',
            });
            product.images = result.secure_url;
        }

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res.status(400).send({ msg: "Error al crear el producto" });
        }

        res.status(200).send({ savedProduct });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;

    try {
        const response = await Product.findById(id);

        if (!response) {
            return res.status(500).send({ msg: "No se ha encontrado el producto" });
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ msg: "Error al obtener el producto", error });
    }
}

export async function getProducts(req, res) {
    const { 
        category, 
        active, 
        onDiscount, 
        sortPrice, 
        page = 1, 
        limit = 10 
    } = req.query;

    const options = {
        page: parseInt(page, 10), 
        limit: parseInt(limit, 10)
    };

    let query = {};

    // Filter by multiple categories
    if (category) {
        const categoriesArray = category.split(',');
        query.category = { $in: categoriesArray };
    }

    // Filter by active status
    if (active !== undefined) {
        query.active = active === 'true';
    }

    // Filter by products on discount
    if (onDiscount !== undefined) {
        query.discount = onDiscount === 'true';
    }

    try {
        // Fetch and sort products
        const products = await Product.paginate(query, {
            ...options,
            sort: sortPrice === 'asc' ? { price: 1 } : sortPrice === 'desc' ? { price: -1 } : {}
        });

        if (products.docs.length === 0) {
            return res.status(400).send({ msg: "No se ha encontrado ningún producto" });
        }

        
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ msg: "Error al obtener los productos", error });
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params;

    const productData = req.body;

    try {
        if (req.files.images) {
            const imagePath = image.getFilePath(req.files.images);
            productData.images = imagePath;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            productData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send({ msg: "Error al actualizar el producto" });
        }

        res.status(200).send({ msg: "Actualización correcta", product: updatedProduct });

    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar el producto", error });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ msg: "Error al eliminar el producto" });
        }

        res.status(200).send({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar el producto", error });
    }
}
