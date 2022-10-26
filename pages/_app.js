import "../styles/globals.css";

function NextjsExperience({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default NextjsExperience;
