import {Router} from 'express';
import {getProducts, getProduct, saveProduct, deleteProduct} from '../controllers/productos.js';

const router = Router();

router.get('/producto', getProducts);
router.get('/productos', getProduct);
router.post('/productos', saveProduct);
router.delete('/productos', deleteProduct);

export default router;