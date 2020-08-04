import { React, MatUI, useRouter, setTitle } from "../deps.tsx";
const {
  Button,
  Grid,
} = MatUI as any;
import Layout from "../components/Layout.tsx";

export default function PageNotFound({ data }: any) {
  setTitle("React-Attain App - Page Not Found");
  const router = useRouter();

  return (
    <Layout>
      <Grid style={{ textAlign: "center" }} container justify={"center"}>
        <Grid item xs={10} sm={8}>
          <h1>404 Page Not Found</h1>
        </Grid>

        <Grid container justify={"center"}>
          <Grid item xs={10} sm={6} md={2}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => router.push("/")}>
              Go to Home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}