import { React, MatUI, useRouter } from '../../deps.tsx';
import { Booking } from '../../../controllers/utils/models/booking.ts';
import { useDeals } from '../ctx/DealContext.tsx';

const {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} = MatUI as any;

type BookingType = {
  id: number | string;
  userId: number | string;
  dealId: number | string;
  from: string;
  to: string;
};

export default function Booking({ booking }: { booking: BookingType }) {
  const { push } = useRouter();
  const { findById } = useDeals();
  const deal: any = findById(booking.dealId);
  return (
    <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {deal.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="h6">
              {new Date(booking.from).toLocaleDateString()} -{' '}
              {new Date(booking.to).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" component="h6">
              {deal.price}$/night
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button
            size="small"
            color="primary"
            onClick={() => push(`/booking/${booking.id}`)}
            style={{ margin: '0 auto' }}
          >
            Learn More
          </Button>
        </CardActions>
      </div>
      <CardMedia
        style={{ width: '40%' }}
        image={`/${deal.title.replace(' ', '')}.jpg`}
      />
    </Card>
  );
}
