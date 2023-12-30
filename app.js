import express from 'express';
import cors from 'cors';
import usuariosroutes from './routes/usuario.js';
import productosroutes from './routes/productos.js';
import viewsRoutes from './routes/views.js';
import session from 'express-session';

const app = express();
app.set('port', 3000);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'HASSHT0KENMS5',
    cookie: { maxAge: 9000000000 },
    resave: false,
    saveUninitialized: true,
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(usuariosroutes);
app.use(productosroutes);
app.use(viewsRoutes);

export default app;