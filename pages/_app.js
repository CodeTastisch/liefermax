/* import "../styles/globals.css"; */
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.scss";
import Layout from "../components/Layout";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
/* client id
AZnP84Qe-BWu6qeqix1hntwchnTz57Qyl1YQHd9_ubymcLChDmktAuKAuoTnbIJ4AaxJ8Lbj6E2KgVNY

user pw:
buis
sb-nkayj24881684@personal.example.com
8I?a%|Cc

personal
sb-gjmr224958366@business.example.com
@<M@5Bv3



*/
