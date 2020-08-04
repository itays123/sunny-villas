import { React, MatUI, useRouter, setTitle } from '../../deps.tsx';
import Layout from '../../components/Layout.tsx';
import useFetch from '../../fetch.tsx';
import DealRoute from '../../components/deals/DealRoute.tsx';
import { useAuth } from '../../components/ctx/AuthContext.tsx';
import DealBookForm from '../../components/deals/DealBookForm.tsx';

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

export default function ID() {
  setTitle('Deal Details');
  const router = useRouter();
  const { token } = useAuth();
  const { data, status } = useFetch(`/api/deals/${router.params.id}`, {});

  if (status === 404) {
    router.push('/404');
    return null;
  }

  // @ts-ignore
  const deal = data?.deal;

  return (
    <Layout>
      <Grid container style={{ height: '100%' }} justify={'center'}>
        <Grid item xs={12} sm={10} md={8} lg={6} style={{ padding: 12 }}>
          <Card style={{ height: '100%' }}>
            <CardActionArea>
              {deal ? <DealRoute deal={deal} /> : <LoadingDeal />}
            </CardActionArea>
            {token ? (
              <DealBookForm dealId={deal.id} token={token} />
            ) : (
              <p>Log In to book a room</p>
            )}
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
