import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/auth';

import uploadConfig from './config/upload';
import OrphanageController from './controllers/OrphanagesController'
import UserController from './controllers/UserController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);
routes.post('/orphanages', upload.array('images'), OrphanageController.create);
routes.put('/orphanages/:id', upload.array('images'), OrphanageController.update);

routes.post('/users', UserController.create);
routes.post('/login', UserController.login);

routes.use(authMiddleware)

export default routes;
