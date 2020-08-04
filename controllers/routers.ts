import { Router, parser } from '../serverDeps.ts';
import userController from './userController.ts';
import dealController from './dealController.ts';
import bookingController from './bookingController.ts';

const routers = new Router();
routers.use(parser);

// handle user routes
routers.use('/users', userController);
routers.use('/deals', dealController);
routers.use('/bookings', bookingController);

// handle user errors
routers.error('/users', userController);
routers.error('/deals', dealController);
routers.error('/bookings', bookingController);

export default routers;
