import "@/styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from "./components/navbar";

export default function App({ Component, pageProps }) {return (
  <>
  <ChakraProvider>
  <AuthProvider>
    <Navbar/>
    <Component {...pageProps} />
  </AuthProvider>
  </ChakraProvider>
  </>
)};