import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const router = Router();

const productsFilePath = join(__dirname, '../productos.json');

const readProducts = () => {
    const data = readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProducts = (products) => {
    writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

router.get('/', (req, res) => {
    const products = readProducts();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

router.post('/', (req, res) => {
    const products = readProducts();
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = {
        id: (products.length + 1).toString(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            ...req.body,
            id: products[productIndex].id
        };
        products[productIndex] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

router.delete('/:pid', (req, res) => {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        writeProducts(products);
        res.json(deletedProduct);
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

export default router;