import { React, MatUI } from '../../deps.tsx';
import { useDeals } from '../ctx/DealContext.tsx';
import Booking from './Booking.tsx';
import { useBookings } from '../ctx/BookingContext.tsx';

const { Grid } = MatUI as any;

export default function BookingList() {
  const { bookings } = useBookings();

  return (
    <Grid item xs={12} sm={10} md={8} container spacing={2} justify={'center'}>
      {bookings && bookings.length > 0 ? (
        [...bookings].reverse().map(booking => (
          <Grid key={booking.id} item xs={12}>
            <Booking booking={booking} />
          </Grid>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
}
