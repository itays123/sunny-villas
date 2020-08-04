import { AuthData } from './authData.ts';
import { User } from './user.ts';
import { Deal } from './deal.ts';
import { Booking } from './booking.ts';

type Id = number | string;
type Time = {
  from: string;
  to: string;
};

export interface serviceDao {
  login(email: string, password: string): Promise<AuthData | undefined>;
  signup(user: User): Promise<AuthData | undefined>;
  getAllDeals(): Promise<Deal[] | undefined>;
  getDeal(dealId: Id): Promise<Deal | undefined>;
  book(userId: Id, dealId: Id, time: Time): Promise<Booking | undefined>;
  cancelBooking(userId: Id, bookingId: Id): Promise<{} | undefined>;
  getAllBookings(userId: Id): Promise<Booking[] | undefined>;
}
