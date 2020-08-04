export interface Booking {
  id: number | string;
  userId: number | string;
  dealId: number | string;
  from: Date;
  to: Date;
}
