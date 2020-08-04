import { serviceDao } from './models/serviceDao.ts';
import { User } from './models/user.ts';
import { AuthData } from './models/authData.ts';
import { Deal } from './models/deal.ts';
import { Booking } from './models/booking.ts';
import Tokenizer from './auth/Tokenizer.ts';
import Postgres from './helpers/Postgres.ts';
import { QueryResult } from '../../serverDeps.ts';

type Id = number | string;
type Time = {
  from: string;
  to: string;
};

export default class PostgresService implements serviceDao {
  private postgres: Postgres;

  constructor() {
    this.postgres = new Postgres();
  }

  // helper functions
  private mapRows(result: QueryResult): any[] {
    let objects: any[] = [];

    result.rows.forEach((row: any) => {
      let obj: any = {};

      result.rowDescription.columns.forEach((column: any, index: number) => {
        obj[column.name] = row[index];
      });

      objects.push(obj);
    });

    return objects;
  }
  private mapBookings(arr: any[]): Booking[] {
    return arr.map(({ id, userid, dealid, from, to }: any) => ({
      id,
      userId: userid,
      dealId: dealid,
      from: new Date(Number(from)),
      to: new Date(Number(to)),
    }));
  }
  private async isUserExists(email: string): Promise<boolean> {
    let result: QueryResult = await this.postgres.findUserByEmail(email);
    return Boolean(result.rowCount && result.rowCount === 1);
  }
  private async authData(user: User): Promise<AuthData> {
    const tokenizer = new Tokenizer();
    const token = await tokenizer.create(user.id!);
    return { token, user };
  }

  // implement serviceDao
  async login(email: string, password: string): Promise<AuthData> {
    let result: QueryResult = await this.postgres.findUserByEmailAndPassword(
      email,
      password
    );
    if (!result.rowCount) {
      throw new Error('auth failed');
    }

    let user = this.mapRows(result)[0];
    return await this.authData(user);
  }
  async signup(user: User): Promise<AuthData> {
    let isUserExists = await this.isUserExists(user.email);
    if (isUserExists) {
      throw new Error('user with this email already exists');
    }

    let result = await this.postgres.createUser(
      user.email,
      user.password!,
      user.name
    );
    if (!result.rowCount) {
      throw new Error('internal server error, try again');
    }

    let newUser = this.mapRows(result)[0];
    return await this.authData(newUser);
  }
  async getAllDeals(): Promise<Deal[]> {
    let result = await this.postgres.findAllDeals();
    if (!result.rowCount) return [];
    return this.mapRows(result);
  }
  async getDeal(dealId: Id): Promise<Deal> {
    let result = await this.postgres.findDealById(Number(dealId));
    if (!result.rowCount) throw new Error('deal not found');
    return this.mapRows(result)[0];
  }
  async book(userId: Id, dealId: Id, time: Time): Promise<Booking> {
    let from = new Date(time.from).getTime();
    let to = new Date(time.to).getTime();
    let result = await this.postgres.createBooking(
      Number(userId),
      Number(dealId),
      from,
      to
    );
    if (!result.rowCount) throw new Error('internal server error, try again');
    return this.mapBookings(this.mapRows(result))[0];
  }
  async cancelBooking(userId: Id, bookingId: Id): Promise<{}> {
    await this.postgres.deleteBooking(Number(bookingId), Number(userId));
    return { msg: 'booking deleted if existed' };
  }
  async getAllBookings(userId: Id): Promise<Booking[]> {
    let result: QueryResult = await this.postgres.findBookingsByUser(
      Number(userId)
    );
    if (!result.rowCount) return [];
    return this.mapBookings(this.mapRows(result));
  }
}
