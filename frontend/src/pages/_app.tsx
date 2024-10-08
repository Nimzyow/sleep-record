import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "../styles/Home.module.css";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
