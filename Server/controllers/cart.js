import Cart from '../models/cart.js';
import Product from '../models/product.js';

export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        // Si el carrito no existe, crea uno nuevo
        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Buscar si el producto ya está en el carrito
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        // Si el producto ya está en el carrito, solo actualiza la cantidad
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, lo añade
            cart.items.push({ productId, quantity });
        }

        // Recalcular el total del carrito usando un bucle for
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            total += item.quantity * product.price;
        }
        cart.total = total;

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Eliminar el producto del carrito
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Recalcular el total del carrito usando un bucle for
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            total += item.quantity * product.price;
        }
        cart.total = total;

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Buscar el carrito del usuario
        let cart = await Cart.findOne({ userId });

        // Si el carrito no existe, devolver un error
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Verificar si el producto está en el carrito
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // Si la cantidad es 0, eliminar el producto del carrito
            if (quantity <= 0) {
                cart.items.splice(existingItemIndex, 1);
            } else {
                // Actualizar la cantidad del producto en el carrito
                cart.items[existingItemIndex].quantity = quantity;
            }

            // Recalcular el total del carrito
            let total = 0;
            for (const item of cart.items) {
                const product = await Product.findById(item.productId);
                total += item.quantity * product.price;
            }
            cart.total = total;

            // Guardar el carrito actualizado
            await cart.save();

            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
