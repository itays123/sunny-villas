import { React, setTitle, MatUI, useRouter } from '../deps.tsx';
import Layout from '../components/Layout.tsx';
import { useAuth } from '../components/ctx/AuthContext.tsx';
const { Grid, Typography, Input, Button } = MatUI as any;

export default function Login() {
  setTitle('Sunny Villas - Login');
  const [email, setEmail] = (React as any).useState('');
  const [password, setPassword] = (React as any).useState('');
  const { token, login } = useAuth();
  const { push } = useRouter();

  (React as any).useEffect(() => {
    if (token) {
      push('/');
    }
  }, [token]);

  function handleSubmit(e: any) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <Layout>
      <Grid style={{ textAlign: 'center' }} container justify={'center'}>
        <Grid container justify={'center'}>
          <Grid item xs={10} sm={6} md={4} lg={3}>
            <Typography variant="h4" color="secondary">
              Log In
            </Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder="example@service.com"
                  onChange={(e: any) => setEmail(e.target.value)}
                  inputProps={{ type: 'email' }}
                />
              </div>
              <div>
                <Input
                  onChange={(e: any) => setPassword(e.target.value)}
                  placeholder="********"
                  inputProps={{ type: 'password' }}
                />
              </div>
              <div>
                <Button type="submit" label="login">
                  Log In
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
