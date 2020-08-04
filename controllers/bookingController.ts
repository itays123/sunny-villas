import { Router, Request, Response } from '../serverDeps.ts';
import { getBookings, cancelBooking } from './utils/mod.ts';

const bookingController = new Router();

bookingController.get('/', getBookings);
bookingController.delete('/:bookingId', cancelBooking);

// handle errors
function errorHandler(error: Error, req: Request, res: Response) {
  res.status(500).send({ msg: error.message });
}

bookingController.error('/', errorHandler);
bookingController.error('/:bookingId', errorHandler);

export default bookingController;
