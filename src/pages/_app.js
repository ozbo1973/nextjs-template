// import App from 'next/app'
import { useRouter } from "next/router";
import NavLayout from "../components/navLayout";
import "../styles/styles.sass";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLanding = router.pathname === "/";

  const styles = {
    containerType: isLanding ? "hero" : "container",
  };

  return (
    <>
      <section className={styles.containerType}>
        <NavLayout />
        <main className="hero is-fullheight">
          <section className="section">
            <Component {...pageProps} />
          </section>
        </main>
      </section>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
