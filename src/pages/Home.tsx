import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductQuery } from "../redux/api-rtk/productApi";
import { Skeleton } from "../components/Loader";
import toast from "react-hot-toast";

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
  const { data, isLoading, isError } = useLatestProductQuery("");

  // console.log("home",data?.data)
  if (isError) toast.error("Cant Fetch Products");
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
        {isLoading ? (
          <Skeleton width="40vw" />
        ) : (
          data?.data.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.productName}
              price={product.price}
              stock={product.stock}
              handler={addToCart}
              photo={product.photo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
