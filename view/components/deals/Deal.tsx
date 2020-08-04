import { React, MatUI, useRouter } from '../../deps.tsx';

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
};

export default function Deal({ deal }: { deal: Deal }) {
  const { push } = useRouter();
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          style={{ height: 140 }}
          image={`/${deal.title.replace(' ', '')}.jpg`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {deal.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="h6">
            {deal.price}$/night
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button
          size="small"
          color="primary"
          onClick={() => push(`/deal/${deal.id}`)}
          style={{ margin: '0 auto' }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
