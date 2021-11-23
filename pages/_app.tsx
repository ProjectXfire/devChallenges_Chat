import "../styles/globals.css";
import type { AppProps } from "next/app";
// Styles
import { Container } from "@styles/shared/container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
