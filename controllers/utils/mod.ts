import { Request, Response } from '../../serverDeps.ts';
import { serviceDao } from './models/serviceDao.ts';
import TestService from './TestService.ts';
import Tokenizer from './auth/Tokenizer.ts';
import { User } from './models/user.ts';
import PostgresService from './PostgresService.ts';

const HEADER = 'Authorization';

let service: serviceDao;
// service = new TestService();
service = new PostgresService();

type Id = number | string;
const tokenizer = new Tokenizer();

export async function signup(req: Request, res: Response) {
  type reqBody = { user: User };
  const { user }: reqBody = await req.body({ type: 'json' }).value;
  const authData = await service.signup(user);
  res
    .status(201)
    .setContentType('application/json')
    .send({ ...authData });
}

export async function login(req: Request, res: Response) {
  type reqBody = { email: string; password: string };
  const { email, password }: reqBody = await req.body({ type: 'json' }).value;
  const authData = await service.login(email, password);
  res
    .status(200)
    .setContentType('application/json')
    .send({ ...authData });
}

export async function getAllDeals(req: Request, res: Response) {
  const deals = await service.getAllDeals();
  res.status(200).setContentType('application/json').send({ deals });
}

export async function getDeal(req: Request, res: Response) {
  let { dealId }: { dealId: Id } = req.params;
  if (!isNaN(Number(dealId))) dealId = Number(dealId);
  const deal = await service.getDeal(dealId);
  res.status(200).setContentType('application/json').send({ deal });
}

export async function book(req: Request, res: Response) {
  // get deal id
  let { dealId }: { dealId: Id } = req.params;
  if (!isNaN(Number(dealId))) dealId = Number(dealId);

  // get user id
  let userId = await tokenizer.validate(req.headers.get(HEADER));

  // get time
  type reqBody = { from: string; to: string };
  const { from, to }: reqBody = await req.body({ type: 'json' }).value;
  let booking = await service.book(userId, dealId, { from, to });
  res.status(201).send({ ...booking });
}

export async function cancelBooking(req: Request, res: Response) {
  let { bookingId }: { bookingId: Id } = req.params;
  if (!isNaN(Number(bookingId))) bookingId = Number(bookingId);
  let userId = await tokenizer.validate(req.headers.get(HEADER));
  const response = await service.cancelBooking(userId, bookingId);
  res.status(200).send({ ...response });
}

export async function getBookings(req: Request, res: Response) {
  // get user id
  let userId = await tokenizer.validate(req.headers.get(HEADER));
  const bookings = await service.getAllBookings(userId);
  res.status(200).send({ bookings });
}
