import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OpenBD Chat</title>
        <link href="https://banglawebfonts.pages.dev/css/hind-siliguri.min.css" rel="stylesheet" />
        <link href="https://banglawebfonts.pages.dev/css/tiro-bangla.min.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;