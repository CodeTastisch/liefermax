import Link from "next/link";
import Image from "next/image";
import mongodb from "@/utils/mongodb";
import Product from "@/models/Product";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProducts } from "@/redux/warenkorbSlice";
import { ListGroup, Button, ListGroupItem } from "react-bootstrap";
import { motion } from "framer-motion";

export default function productsite({ product }) {
  const [price, setPrice] = useState(product.price);
  const [extras, setExtras] = useState([]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const router = useRouter();

  const editExtra = (e, extra) => {
    const checked = e.target.checked;
    if (checked) {
      setPrice(price + extra.price);
      setExtras([...extras, extra]);
    } else {
      setPrice(price - extra.price);
      setExtras([...extras, extra]);
      setExtras(extras.filter((allExtras) => allExtras._id !== extra._id));
    }
  };

  const editAmount = (number) => {
    setAmount(number);
  };

  const zumWarenkorb = () => {
    const _id = uuid();
    dispatch(addProducts({ ...product, extras, price, amount, _id }));

    router.push("/warenkorb");
  };

  if (!product) {
    return (
      <div>
        <h2>Product not available</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", siffness: 120 }}
    >
      <div>
        <Link href="/" className="text-dark">
          ← Back to Homepage
        </Link>
      </div>
      <div className="row row-cols-2 mt-2">
        <div>
          <Image
            className="rounded-3"
            src={product.img}
            alt={product.name}
            width={600}
            height={600}
            layout="responsive"
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="text-danger">{price.toFixed(2)} €</h2>
            </ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
            <ListGroupItem>
              {product.extras.length ? "Extras: " : <p></p>}

              {product.extras.map((extra) => (
                <span key={extra._id}>
                  {extra.text}
                  <input
                    onChange={(e) => editExtra(e, extra)}
                    key={extra.text}
                    className="form-check-input me-2"
                    type="checkbox"
                  />
                  {/* {extra.price} */}
                </span>
              ))}
            </ListGroupItem>
            <ListGroupItem>
              <input
                onChange={(e) => editAmount(e.target.value)}
                className="form-control w-50"
                type="number"
                placeholder="1"
                value={amount}
                min="1"
              ></input>
            </ListGroupItem>
            <ListGroupItem>
              <div className="row shadow">
                <Button onClick={zumWarenkorb} variant="danger">
                  zum Warenkorb
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </motion.div>
  );
}

function updatePrice() {
  //nimm alle aktiven extras
  //suche den jeweiligen preis heraus und addiere zum normal preis
}

export async function getServerSideProps(context) {
  const url = context.params.url;

  await mongodb.dbConnect();
  const product = await Product.findOne({ url }).lean();
  await mongodb.dbDisconnect();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
