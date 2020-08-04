import { React, MatUI } from '../deps.tsx';
import Navbar from './nav/Navbar.tsx';
const { Grid } = MatUI as any;

export default function Layout({ children }: any) {
  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid
        style={{ marginTop: 60, minHeight: 'calc(100% - 60px - 64px)' }}
        item
        xs={12}
      >
        {children}
      </Grid>
    </Grid>
  );
}
