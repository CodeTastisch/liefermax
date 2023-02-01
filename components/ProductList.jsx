import {Card, Button} from 'react-bootstrap'
import Link from 'next/link'


export default function ProductList({products}) {
  return (
    <div>
      
      <div className="row row-cols-3">


        {products?.map(product =>
          <div key={product._id} className="mt-3 col">

            <Card>
              <Link href={`/products/${product.url}`}>
                  <Card.Img variant='top' src={product.img}/>
              </Link>
              <Card.Body>
                <Card.Title>
                  {product.name} {product.price}€
                </Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Button variant="danger">Zum Warenkorb</Button>
              </Card.Body>
            </Card>


          </div>
          )}

      </div>
      <br /><br />

    </div>

  )
}



//SSR
/* export async function getServerSideProps() {
  const answer = await fetch("/data/");

  const products = await answer.json();

  return {
    props: {
      products,
    },
  };
} */
