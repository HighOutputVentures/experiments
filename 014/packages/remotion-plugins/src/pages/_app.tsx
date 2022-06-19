import "@fontsource/cardo";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import type {AppProps} from "next/app";
import "../styles/globals.css";

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
