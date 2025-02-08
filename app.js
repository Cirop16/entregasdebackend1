import express from 'express';
import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';

const app = express ();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({encoded: true}));

app.use('/api/products', productsRouter );
app.use('/api/carts', cartsRouter );

app.listen(8080,() => {
    console.log("el servidor esta escuchando en el puerto 8080")
});