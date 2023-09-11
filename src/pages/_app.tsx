import { StateProvider } from "@/store/StateProvider";
import { ChakraProvider } from "@chakra-ui/react";
import "@/shared/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <ChakraProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </StateProvider>
  );
}
