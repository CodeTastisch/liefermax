import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Liefermax - Dein lieferservice</title>
        <meta name="description" content="Wir liefern aus!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
