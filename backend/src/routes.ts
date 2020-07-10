import express from 'express'


import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//desacopla as rotas
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
//padrão da comunidade: index, show, create, update, delete
routes.get('/items', itemsController.index );
routes.post('/points', pointsController.create );
routes.get('/points', pointsController.index );
// para pontos específicos: request.param
routes.get('/points/:id', pointsController.show );

export default routes;

//TODO
//Routes:service pattern
//BD: repository pattern (data mapper)