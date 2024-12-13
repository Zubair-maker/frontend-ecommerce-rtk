import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const DemoCarousel = () => {
  return (
    <Carousel>
      <div>
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2024/BAU/Hero/Unrec/D91435399_WLA-BAU-Unrec-Hero_DesktopTallHero_3000x1200._CB582928607_.jpg"
          alt="Slide 3"
        />
      </div>
      <div>
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/GW-Hero-PC_BBAug23_Soft-toys_with-Apay_Lifestyle_2x._CB597740150_.jpg"
          alt="Slide 1"
        />
      </div>
      <div>
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/HPC/GW/SVD/Dec/Apay/BFCM24_GW_PC_Hero_lifestyle_02._CB539162390_.jpg"
          alt="Slide 2"
        />
      </div>
    </Carousel>
  );
};

const Home = () => {
  const addToCart = () => {};
  return (
    <div className="home">
      <section>
        <DemoCarousel />
      </section>
      <h1>
        Latest Product
        <Link to={"/search"} className="more">
          More
        </Link>
      </h1>
      <div className="latest_product">
        <ProductCard
          productId="154541wudnwd"
          name="macbook"
          price={2500}
          stock={25}
          handler={addToCart}
          photo="https://m.media-amazon.com/images/I/71RDgtHsREL._AC_UY218_.jpg"
        />
        
      </div>
    </div>
  );
};

export default Home;
