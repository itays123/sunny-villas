import { React, MatUI, useRouter, MenuIcon } from '../../deps.tsx';
import { useAuth } from '../ctx/AuthContext.tsx';
import SignedInLinks from './signedInLinks.tsx';
import SignedOutLinks from './signedOutLinks.tsx';
import MobileDrawer from './MobileDrawer.tsx';
const {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Hidden,
  IconButton,
  Avatar,
} = MatUI as any;

export default function Navbar() {
  const { push } = useRouter();
  const { token, user } = useAuth();
  const [isDrawerOpen, setOpen] = (React as any).useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Hidden smUp>
            <Grid item xs={1}>
              <IconButton
                style={{ marginRight: 8 }}
                edge="start"
                aria-label="menu"
                onClick={() => setOpen(true)}
              >
                <MenuIcon style={{ color: '#fff' }} />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid
            item
            xs={8}
            sm={4}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <a onClick={() => push('/')} style={{ cursor: 'pointer' }}>
              <Typography variant="h6">Sunny Villas</Typography>
            </a>
          </Grid>
          <Grid
            item
            xs={3}
            sm={8}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Hidden only="xs">
              {token ? <SignedInLinks /> : <SignedOutLinks />}
            </Hidden>

            {user?.name && (
              <Avatar style={{ background: '#fbc02d', color: '#fff' }}>
                {user.name
                  .split(' ')
                  .map((s: string) => s[0])
                  .join('')
                  .toUpperCase()}
              </Avatar>
            )}
          </Grid>

          <MobileDrawer
            open={isDrawerOpen}
            setOpen={(b: boolean) => setOpen(b)}
          />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
