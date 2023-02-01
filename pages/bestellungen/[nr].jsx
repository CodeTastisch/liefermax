import { Table, Spinner, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
/* import { useSelector } from "react-redux"; */

export default function bestellungen({ order }) {
  /*   const priceSum = useSelector((state) => state.warenkorb.priceSum);
   */
  const router = useRouter();
  const { nr } = router.query;

  let status;

  switch (order.status) {
    case 0:
      console.log(0);
      status = "Eingegangen";
      break;
    case 1:
      console.log(1);
      status = "Zubereitung";
      break;
    case 2:
      console.log(2);
      status = "Lieferung";
      break;
    case 3:
      console.log(3);
      status = "Ausgeliefert";
      break;
  }

  if (nr !== order._id) {
    return (
      <>
        <h2>Bestellnummer {nr} nicht vorhanden</h2>
        <Button variant="primary" onClick={() => router.push("/")}>
          Zur Karte
        </Button>
      </>
    );
  }

  //nimm diese nummer *eindeutige id wärewieder sinnvoller wieso hier nicht generiert?

  //frage in der datenbank mit
  /*   console.log(router);
  console.log(nr); */

  console.log(order);

  return (
    <div>
      <h1>Liefer Informationen</h1>
      <div className="row mt-4">
        <div className="col-9">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Order Nr.</th>
                <th>Customer</th>
                <th>Adress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nr}</td>
                <td>{order.customer}</td>
                <td>{order.adress}</td>
                <td>
                  <span>{status}</span>
                  {order.status < 3 ? (
                    <Spinner animation="border" variant="success" size="sm" />
                  ) : (
                    <span></span>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>

          <h2>Bestellte Produkte</h2>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Extras</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>
                    {product.extras.length ? (
                      <ul>
                        {product.extras.map((extra) => (
                          <li key={extra._id}>{extra}</li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{product.amount}</td>
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
                <Card.Title>{order.amount.toFixed(2)} EUR</Card.Title>
                {order.payment === 0 ? (
                  <Button variant="danger disabled">offen</Button>
                ) : (
                  <Button variant="success disabled">bezahlt</Button>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `http://localhost:3000/api/bestellungen/${params.nr}`
  );
  return {
    props: {
      order: res.data,
    },
  };
}
