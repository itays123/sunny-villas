import { React, MatUI } from '../../deps.tsx';

const {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} = MatUI as any;

type Deal = {
  id: number | string;
  title: string;
  price: number;
  ordered?: number;
  limted?: number;
  imageUrl?: string;
  description?: string;
};

type Booking = {
  id: number | string;
  userId: number | string;
  dealId: number | string;
  from: string;
  to: string;
};

export default function BookingRoute({
  deal,
  booking,
}: {
  deal: Deal;
  booking: Booking;
}) {
  return (
    <>
      <CardMedia
        style={{ height: 140 }}
        image={`/${deal.title.replace(' ', '')}.jpg`}
      />
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1">
          {deal.title}
        </Typography>
        <Typography varient="body1" component="p">
          {new Date(booking.from).toLocaleDateString()} -{' '}
          {new Date(booking.to).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="h4">
          {deal.price}$/night!
        </Typography>
      </CardContent>
    </>
  );
}
