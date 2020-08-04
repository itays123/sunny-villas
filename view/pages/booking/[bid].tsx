import { React, MatUI, useRouter, setTitle } from '../../deps.tsx';
import Layout from '../../components/Layout.tsx';
import { useBookings } from '../../components/ctx/BookingContext.tsx';
import { useDeals } from '../../components/ctx/DealContext.tsx';
import BookingRoute from '../../components/bookings/BookingRoute.tsx';
import { useAuth } from '../../components/ctx/AuthContext.tsx';

const {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} = MatUI as any;

function LoadingDeal() {
  return (
    <CardContent>
      <Typography varient="body1">Loading...</Typography>
    </CardContent>
  );
}

export default function BID() {
  setTitle('Booking Details');
  const [booking, setBooking] = (React as any).useState({});
  const [deal, setDeal] = (React as any).useState({});
  const router = useRouter();
  const { token } = useAuth();
  const { getById } = useBookings();
  const { findById } = useDeals();

  (React as any).useEffect(() => {
    if (!token) {
      router.push('/');
    }
    let b = getById(Number(router.params.bid));
    if (!b.dealId) {
      router.push('/404');
      return;
    }
    setBooking(b);
    let d = findById(b.dealId);
    setDeal(d);
  }, []);

  async function cancelBooking() {
    fetch(`/api/bookings/${booking.id}`, {
      method: 'DELETE',
      headers: { ['Authorization']: token! },
    });
  }

  return (
    <Layout>
      <Grid container style={{ height: '100%' }} justify={'center'}>
        <Grid item xs={12} sm={10} md={8} lg={6} style={{ padding: 12 }}>
          <Card style={{ height: '100%' }}>
            <CardActionArea>
              <BookingRoute deal={deal} booking={booking} />
            </CardActionArea>
            <CardActions>
              <Button
                type="submit"
                size="small"
                color="primary"
                onClick={() => cancelBooking()}
                style={{ margin: '0 auto' }}
              >
                Cancel Booking
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
