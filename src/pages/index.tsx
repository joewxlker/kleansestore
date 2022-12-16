import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";
import Products, { ProductData } from "../components/products";
import Head from "next/head";

interface HomeProps {
  onCartUpdates: (items: ProductData) => void;
  products: inferQueryOutput<"stripe.all-products">;
}
/** infer query output infers typing based on routes defined {@module src/server/router/routes.ts} */

const Home: NextPage<HomeProps> = props => {
  return (
    <>
      <Head>
        <meta name="description" content="Home of the official kleanse australia" />
      </Head>
      <Layout>
        <>
          <div>
            <Slider />
            <ImageCards />
            <Products params={"all-products"} products={props.products} />
          </div>
        </>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch("http://localhost:3000/api/stripe");
  const products = await req.json();
  return { props: { products } };
};

export const Slider: FC = (): JSX.Element => {
  const [count, setCount, setIncrement] = useIncrementData();
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIncrement(images.length - 1, "image", true);
    }, 5000);
    return () => clearInterval(interval);
  }, [count, setCount, hover, setIncrement]);

  return (
    <>
      <div
        key={count["image"]}
        id="fadein"
        className="bg-white z-20 flex flex-center items-center flex-col pt-4 m-auto"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="lg:flex md:flex hidden overflow-hidden h-[80vh] items-center justify-center">
          <Image src={`${images[count["image"]]?.image}`} width={2000} height={800} alt={`${images[count["image"]]?.title}`} />
        </div>
        <div className="lg:hidden md:hidden block overflow-hidden">
          <Image src={`${images[count["image"]]?.image}`} width={2000} height={1800} alt={`${images[count["image"]]?.title}`} />
        </div>

        <div
          className="absolute w-screen flex flex-col justify-center items-center -translate-y-[5vh]"
          style={{ height: `50vw`, minHeight: "55rem" }}
          onClick={() => {
            if (images[count["image"]]?.href !== undefined) return (window.location.href = images[count["image"]]?.href ?? "/");
          }}
        >
          <div className="relative h-2/6 w-2/6 flex flex-col justify-center items-center" style={{}}>
            <h1 className="text-white w-screen text-center" style={{ fontSize: "4vh", fontWeight: "50" }}>{`${images[count["image"]]?.title
              }`}</h1>
            <p className="">{`${images[count["image"]]?.paragraph}`}</p>
            <button
              className="lg:visible h-2/6 w-2/6 lg:bg-grey text-white shadow-2xl hover:border border-white border-1 sm:invisible bg-grey md:visible invisible "
              onClick={() => {
                window.location.href = `${images[count["image"]]?.href}`;
              }}
            >
              {`${images[count["image"]]?.buttonText}`}
            </button>
          </div>
        </div>
        {/* image slider text/button container */}
        {/* setIncrement custom hook increments image slider data object */}

        <div
          className="h-8 w-screen relative bottom-8 z-10 flex-row justify-center items-center lg:flex hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          {images.map(({ id }) => {
            return (
              <button
                key={id}
                className="h-4 w-4 bg-white m-2 hover:bg-grey hover:border border-black border-1"
                style={{
                  borderRadius: "25px",
                  boxShadow: "inset 0rem 0.1rem 0.3rem 0.001rem rgba(0,0,0,0.5)",
                  opacity: `${count["image"] === id - 1 ? "100%" : "40%"}`,
                }}
                onClick={() => setCount("image", id - 1)}
              ></button>
            );
          })}
        </div>
        {/* round slider buttons container */}
      </div>
    </>
  );
};

export const ImageCards: FC = (): JSX.Element => {
  return (
    <div className="w-full flex flex-row flex-wrap justify-center z-1 relative ">
      {cards.map(info => {
        return (
          <div
            key={info.title}
            className="lg:w-1/4 md:w-1/4 w-5/6 min-w-[20rem] md:py-12 sm:py-6 overflow-hidden"
            onMouseEnter={e => {
              e.preventDefault();
            }}
          >
            <h2 className="">{info.title}</h2>
            <p className="">{info.paragraph}</p>
            <div
              className="w-90 h-80 bg-white z-3 mx-5"
              style={{
                backgroundImage: `url(${info.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
        );
      })}
      {/** images imported from src/utils/siteInfo.ts */}
    </div>
  );
};
