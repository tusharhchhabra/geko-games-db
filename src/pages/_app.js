import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { AuthModalProvider } from "@/context/AuthModalContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthModalProvider>
  );
}
