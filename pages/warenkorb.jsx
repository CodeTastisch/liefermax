import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { removeProduct, clear } from "@/redux/warenkorbSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, CloseButton, Button } from "react-bootstrap";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Warenkorb() {
  const dispatch = useDispatch();
  const warenkorb = useSelector((state) => state.warenkorb);

  const ClientID =
    "AZnP84Qe-BWu6qeqix1hntwchnTz57Qyl1YQHd9_ubymcLChDmktAuKAuoTnbIJ4AaxJ8Lbj6E2KgVNY";
  const [kasse, setKasse] = useState(false);

  const router = useRouter();

  const amount = warenkorb.priceSum.toFixed(2);
  const currency = "EUR";
  const style = {
    layout: "vertical",
    height: 30,
  };

  const createOrder = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(
        "http://localhost:3000/api/bestellungen",
        data
      );
      if (res.status === 201) {
        dispatch(clear());
        router.push(`/bestellungen/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromList = (product) => {
    dispatch(removeProduct(product));
    toast.error(product.name + "wurde entfernt", {
      postion: "top-center",
      autoClose: 3000,
    });
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={async function (data, actions) {
            const details = await actions.order.capture();
            // Your code here after capture the order
            const customer = details.purchase_units[0].shipping;
            console.log(customer);
            createOrder({
              customer: customer.name.full_name,
              adress:
                customer.address.address_line_1 +
                ", " +
                customer.address.admin_area_2,
              amount: warenkorb.priceSum,
              status: 0,
              payment: 1,
              products: warenkorb.products.map((product) => ({
                name: product.name,
                amount: product.amount,
                extras: product.extras.map((extra) => extra.text),
              })),
            });
          }}
        />
      </>
    );
  };

  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", siffness: 120 }}
    >
      <h1>Warenkorb</h1>
      <div className="row mt-4">
        <div className="col-9">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Bild</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Menge</th>
                <th>Betrag</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              {warenkorb.products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td>
                    <Link href={`/products/${product.url}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td>
                    <ul>
                      {product.extras.map((extra) => (
                        <li key={extra._id}>{extra.text}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{product.amount}</td>
                  <td>{(product.price * product.amount).toFixed(2)} EUR</td>
                  <td>
                    <Button
                      className="btn-sm"
                      onClick={() => deleteFromList(product)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-3 p-2">
          <div className="shadow">
            <Card>
              <Card.Header as="h5">Gesammt</Card.Header>
              <Card.Body className="text-center">
                <Card.Title>{warenkorb.priceSum.toFixed(2)} EUR</Card.Title>
                {kasse ? (
                  <PayPalScriptProvider
                    options={{
                      "client-id": ClientID,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                ) : (
                  <Button variant="primary" onClick={() => setKasse(true)}>
                    Zur Kasse
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
