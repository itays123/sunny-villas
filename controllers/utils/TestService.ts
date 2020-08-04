import { serviceDao } from './models/serviceDao.ts';
import { User } from './models/user.ts';
import { AuthData } from './models/authData.ts';
import { Deal } from './models/deal.ts';
import { Booking } from './models/booking.ts';
import Tokenizer from './auth/Tokenizer.ts';

type Id = number | string;
type Time = {
  from: string;
  to: string;
};

export default class TestService implements serviceDao {
  private users: User[];
  private deals: Deal[];
  private bookings: Booking[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'itay',
        email: 'itays2005@gmail.com',
        password: 'itays123',
      },
      {
        id: 2,
        name: 'test',
        email: 'test@test.com',
        password: 'itays123',
      },
    ];
    this.deals = [
      { id: 1, title: 'sunny villa', price: 150 },
      { id: 2, title: 'sunnier house', price: 60 },
      { id: 3, title: 'bright suite', price: 300 },
    ];
    this.bookings = [];
  }
  // helper functions
  private isUserExists(email: string): boolean {
    return this.users.some((u: User) => u.email === email);
  }
  private async authData(user: User): Promise<AuthData> {
    const tokenizer = new Tokenizer();
    const token = await tokenizer.create(user.id!);
    // prevent the service from sending back the password
    let u: User = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return { token, user: u };
  }

  // implement serviceDao
  async login(email: string, password: string): Promise<AuthData> {
    // check if user exists
    let isUserExists = this.isUserExists(email);
    if (!isUserExists) {
      throw new Error("user with this email doesn't exist");
    }

    const user: User = this.users.find((u: User) => u.email === email)!;

    // check if password is correct
    const isPasswordCorrect = password === user.password;
    if (!isPasswordCorrect) {
      throw new Error('incorrect password');
    }

    const authData = await this.authData(user);
    return authData;
  }
  async signup(user: User): Promise<AuthData> {
    const userId = this.users.length + 1;

    // check if user exists
    let isUserExists = this.isUserExists(user.email);
    if (isUserExists) {
      throw new Error('user already exists');
    }

    // get AuthData
    const authData = await this.authData({
      id: userId,
      email: user.email,
      password: user.password,
      name: user.name,
    });
    return authData;
  }
  async getAllDeals(): Promise<Deal[]> {
    return this.deals;
  }
  async getDeal(dealId: Id): Promise<Deal> {
    let deal = this.deals.filter((d: Deal) => d.id === dealId)[0];
    if (!deal) throw new Error('deal not found');
    return deal;
  }
  async book(userId: Id, dealId: Id, time: Time): Promise<Booking> {
    let from = new Date(time.from);
    let to = new Date(time.to);
    let id = this.bookings.length + 1;
    const booking: Booking = { id, userId, dealId, from, to };
    this.bookings.push(booking);
    return booking;
  }
  async cancelBooking(userId: Id, bookingId: Id): Promise<{}> {
    const updatedBookings = [...this.bookings].filter((b: Booking) => {
      return b.userId !== userId || b.id !== bookingId;
    });
    this.bookings = updatedBookings;
    return { msg: 'booking deleted if existed' };
  }
  async getAllBookings(userId: Id): Promise<Booking[]> {
    return [...this.bookings].filter((b: Booking) => b.userId === userId);
  }
}
