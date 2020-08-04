import { React, setTitle, MatUI } from '../deps.tsx';
import Layout from '../components/Layout.tsx';
import BookingList from '../components/bookings/BookingList.tsx';
const { Grid } = MatUI as any;

export default function Bookings() {
  setTitle('Sunny Villas - Your Bookings');

  return (
    <Layout>
      <Grid style={{ textAlign: 'center' }} container justify={'center'}>
        <BookingList />
      </Grid>
    </Layout>
  );
}
