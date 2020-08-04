import database from './database.ts';
import { QueryResult } from '../../../serverDeps.ts';

export default class Postgres {
  // user queries
  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<QueryResult> {
    return await database.query({
      text:
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      args: [email, password, name],
    });
  }

  async findUserByEmail(email: string): Promise<QueryResult> {
    return await database.query({
      text: 'SELECT id FROM users WHERE email = $1',
      args: [email],
    });
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<QueryResult> {
    return await database.query({
      text:
        'SELECT id, name, email FROM users WHERE email = $1 AND password = $2',
      args: [email, password],
    });
  }

  // deal queries
  async findAllDeals(): Promise<QueryResult> {
    return await database.query('SELECT * FROM deals;');
  }

  async findDealById(dealId: number): Promise<QueryResult> {
    return await database.query({
      text: 'SELECT * FROM deals WHERE id = $1;',
      args: [dealId],
    });
  }

  // booking queries
  async createBooking(
    userId: number,
    dealId: number,
    from: number,
    to: number
  ): Promise<QueryResult> {
    return await database.query({
      text:
        'INSERT INTO bookings (userId, dealId, "from", "to") VALUES ($1, $2, $3, $4) RETURNING *',
      args: [userId, dealId, from, to],
    });
  }

  async deleteBooking(bookingId: number, userId: number): Promise<QueryResult> {
    return await database.query({
      text: 'DELETE FROM bookings WHERE id = $1 AND userId = $2',
      args: [bookingId, userId],
    });
  }

  async findBookingsByUser(userId: number): Promise<QueryResult> {
    return await database.query({
      text: 'SELECT * FROM bookings WHERE userId = $1',
      args: [userId],
    });
  }
}
