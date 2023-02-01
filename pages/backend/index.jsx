import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import cookie from "cookie";
/* import { useSelector } from "react-redux"; */

export default function bestellungen({ orders }) {
  /*   const priceSum = useSelector((state) => state.warenkorb.priceSum);
   */
  const router = useRouter();

  const statusUpdate = async (id, currentStatus) => {
    console.log(currentStatus);
    try {
      if (currentStatus <= 2) {
        console.log(currentStatus);
        await axios.put(`http://localhost:3000/api/bestellungen/` + id, {
          status: currentStatus + 1,
        });
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bestellungen/` + id);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  let status = ["Eingegangen", "Zubereitung", "Lieferung", "Ausgeliefert"];

  return (
    <div>
      <h1>Admin Backend</h1>
      <div className="row mt-4">
        <div className="col-12">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Bestell Nr.</th>
                <th>Kunde</th>
                <th>Adresse</th>
                <th>Status</th>
                <th>Entfernen</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link
                      className="text-danger"
                      href={`bestellungen/${order._id}`}
                    >
                      {order._id}
                    </Link>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.adress}</td>
                  <td>
                    <Button
                      onClick={() => statusUpdate(order._id, order.status)}
                    >
                      {status[order.status]}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteOrder(order._id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/backend/login",
        permant: false,
      },
    };
  }
  const res = await axios.get(`http://localhost:3000/api/bestellungen/`);
  return {
    props: {
      orders: res.data,
    },
  };
}
