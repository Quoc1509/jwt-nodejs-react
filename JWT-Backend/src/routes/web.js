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
    router.get('/update-user/:id', handleHomeController.getUpdateUserPage)

    router.post('/users/create-user', handleHomeController.handleCreateNewUser)
    router.post('/delete-user/:id', handleHomeController.handleDeleteUser)
    router.post('/user/update-user', handleHomeController.handleUpdateUser)
    return app.use('/', router);
}

export default initWebRoutes;