import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';

//tratando de solucionar problemas 1
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'

const router = Router();

//tratando de solucionar problemas 2
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cartsFilePath = join(__dirname, '../carrito.json');

const readCarts = () => {
    const data = readFileSync(cartsFilePath);
    return JSON.parse(data);
};

const writeCarts = (carts) => {
    writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: (carts.length + 1).toString(),
        products: []
    };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        writeCarts(carts);
        res.json(cart.products);
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

export default router;