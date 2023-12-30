import {Router} from 'express';
import {getClients, getClient, saveClient, deleteClient, getCuentas, validateUser} from '../controllers/usuario.js';

const router = Router();

router.get('/cuenta', getClients);
router.get('/cuentas', getClient);
router.post('/cuentas', saveClient);
router.delete('/cuentas', deleteClient);

router.post('/iniciarSesion', getCuentas);
router.post('/validateUser', validateUser);

export default router;