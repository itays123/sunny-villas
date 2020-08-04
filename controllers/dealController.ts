import { Router, Request, Response } from '../serverDeps.ts';
import { getAllDeals, getDeal, book } from './utils/mod.ts';

const dealController = new Router();

dealController.get('/', getAllDeals);
dealController.get('/:dealId', getDeal);
dealController.post('/:dealId', book);

// handle errors
function errorHandler(error: Error, req: Request, res: Response) {
  res.status(500).send({ msg: error.message });
}

function dealNotFound(error: Error, req: Request, res: Response) {
  if (error.message === 'deal not found') {
    res.status(404).send({ msg: error.message });
  } else return errorHandler(error, req, res);
}

dealController.error('/', errorHandler);
dealController.error('/:dealId', dealNotFound);
dealController.error('/:dealId', errorHandler);

export default dealController;
