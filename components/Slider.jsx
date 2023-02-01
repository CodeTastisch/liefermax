import Image from "next/image"
import { Carousel } from "react-bootstrap"



export default function Slider() {
  return (
    <div className="carousel">
        <Carousel>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src='/images/food/burger.jpg' priority="true" alt="burger" width={3000} height={300}/>
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src='/images/food/pizza.jpg' priority="true" alt="pizza" width={3000} height={300}/>
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src='/images/food/burrito.jpg' priority="true" alt="burrito" width={3000} height={300}/>
            </Carousel.Item>
        </Carousel>
        
    </div>
  )
}
