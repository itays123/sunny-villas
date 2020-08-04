import { React, MatUI, ReactDOMServer } from './deps.tsx';

export default function Document({ MainScript, styled, Main, headers }: any) {
  return (
    <html>
      <head lang="en">
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using attain-cli" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
        body {
          font-family: "Roboto", sans-serif;
          margin: 0px;
          background-color: #eee;
        }
        `,
          }}
        />
        {headers}
        {styled}
      </head>
      <body>
        <div id="root">
          <Main />
        </div>
        <MainScript />
      </body>
    </html>
  );
}

Document.ServerSideAttain = async ({ MainScript, Main }: any) => {
  const sheets = new MatUI.ServerStyleSheets();

  try {
    const Renderd = (ReactDOMServer as any).renderToString(
      sheets.collect(Main)
    );

    return {
      MainScript,
      Main: Renderd,
      styled: [
        <React.Fragment key="styles">
          {sheets.getStyleElement()}
        </React.Fragment>,
      ],
    };
  } finally {
  }
};
