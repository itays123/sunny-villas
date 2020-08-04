import { React, setTitle, MatUI } from '../deps.tsx';
import Layout from '../components/Layout.tsx';
import DealList from '../components/deals/DealList.tsx';
const { Grid } = MatUI as any;

export default function Index() {
  setTitle('Sunny Villas - Welcome');

  return (
    <Layout>
      <Grid style={{ textAlign: 'center' }} container justify={'center'}>
        <DealList limit={2} />
      </Grid>
    </Layout>
  );
}
