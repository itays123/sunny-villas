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

export default function DealBookForm({
  dealId,
  token,
}: {
  dealId: number;
  token: string;
}) {
  const [from, setFrom] = (React as any).useState(new Date().toISOString());
  const [to, setTo] = (React as any).useState(new Date().toISOString());
  const { push } = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`/api/deals/${dealId}`, {
      method: 'POST',
      body: JSON.stringify({ from, to }),
      headers: { ['Authorization']: token },
    })
      .then(res => res.json())
      .then((booking: any) => console.log(booking))
      .catch((err: any) => console.log(err));
  };
  return (
    <CardActions disableSpacing>
      <form onSubmit={handleSubmit}>
        <label>From Date:</label>
        <input
          type="date"
          onChange={(e: any) => setFrom(e.target.valueAsDate.toISOString())}
        />
        <label>To Date:</label>
        <input
          type="date"
          onChange={(e: any) => setTo(e.target.valueAsDate.toISOString())}
        />
        <Button
          type="submit"
          size="small"
          color="primary"
          onClick={() => push(`/bookings`)}
          style={{ margin: '0 auto' }}
        >
          Book
        </Button>
      </form>
    </CardActions>
  );
}
