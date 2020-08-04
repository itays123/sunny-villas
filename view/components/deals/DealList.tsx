import { React, MatUI } from '../../deps.tsx';
import { useDeals } from '../ctx/DealContext.tsx';
import Deal from './Deal.tsx';

const { Grid } = MatUI as any;

export default function DealList({ limit }: { limit?: number }) {
  const { deals } = useDeals();

  return (
    <Grid item xs={12} sm={10} md={8} container spacing={2} justify={'center'}>
      {deals && deals.length > 0 ? (
        [...deals]
          .sort(() => Math.random() - 0.5)
          .splice(0, limit || deals.length)
          .map(deal => (
            <Grid key={deal.id} item xs={12} sm={6} md={4}>
              <Deal deal={deal} />
            </Grid>
          ))
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
}
