import express from 'express';
import  handleHomeController  from '../controllers/homeController';


const router = express.Router();

/**
 * 
 * @param {*} app - express app
 */

const initWebRoutes = (app) => {
    router.get('/', handleHomeController.handleHelloWorld)
    router.get('/user', handleHomeController.handleUsePage)

    return app.use('/', router);
}

export default initWebRoutes;