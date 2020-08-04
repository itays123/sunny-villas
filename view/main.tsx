import { React, MatUI, useRouter, useDocument } from './deps.tsx';
import theme from './resources/theme.tsx';
import AuthContextProvider from './components/ctx/AuthContext.tsx';
import DealContextProvider from './components/ctx/DealContext.tsx';
import BookingContextProvider from './components/ctx/BookingContext.tsx';

export default function Main({ SSR, Component }: any) {
  const { pageProps } = SSR.attainProps;
  const { pathname } = useRouter();

  React.useEffect(() => {
    const document = useDocument();
    const jssStyles = document && document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <MatUI.ThemeProvider theme={theme}>
        <AuthContextProvider>
          <DealContextProvider>
            <BookingContextProvider>
              <Component {...pageProps} />
            </BookingContextProvider>
          </DealContextProvider>
        </AuthContextProvider>
      </MatUI.ThemeProvider>
    </>
  );
}

Main.ServerSideAttain = async ({
  req,
  res,
  Component,
  query,
  isServer,
}: any) => {
  if (!Component) {
    res.redirect('/404');
  }

  const pageProps = Component.ServerSideAttain
    ? await Component.ServerSideAttain({ req, res, Component, query, isServer })
    : {};

  return {
    attainProps: {
      pageProps,
    },
  };
};
