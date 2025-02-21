import express from 'express';
//import cartsRouter from './routes/cartsRouter.js';
import productsRouter from './routes/productsRouter.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express ();
const httpServer = app.listen(8080, () => console.log(`Listening on PORT 8080`));
const io = new Server (httpServer);
const port = 8080;

/*app.use(express.json());
app.use(express.urlencoded({encoded: true}));

app.use('/api/products', productsRouter );
app.use('/api/carts', cartsRouter );**/

app.engine('handlebars', handlebars.engine());
app.set('products',__dirname + '/products');
app.set('product engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/realtimeproducts', productsRouter);

let products = [];
io.on('connection', socket => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('userAuthenticated', user  => {
        socket.emit('productsLogs', products);
        socket.broadcast.emit('newUserConnected', user);
    })

    socket.on('product',(data) => {
        products.push(data);
        io.emit('productLogs', products);
    })
})

/*app.listen(8080,() => {
    console.log("el servidor esta escuchando en el puerto 8080")
});**/