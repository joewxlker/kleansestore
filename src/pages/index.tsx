import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";
import Products, { ProductData } from '../components/products'
import Head from "next/head";

interface HomeProps {
  onCartUpdates: (items: ProductData) => void;
  products: inferQueryOutput<'stripe.all-products'>
}
/** infer query output infers typing based on routes defined {@module src/server/router/routes.ts} */

const Home: NextPage<HomeProps> = (props) => {

  return (
    <>
      <Layout>
        <>
          <div className='pt-6' >
            <Slider />
            <ImageCards />
            <Products params={'all-products'} products={props.products} />
          </div>
        </>
      </Layout>
    </>
  )

}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch('http://localhost:3000/api/stripe');
  const products = await req.json();
  return { props: { products } }
}

interface SliderProps { }
export const Slider: FC<SliderProps> = (): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIncrement(images.length - 1, 'image', true);
    }, 5000)
    return () => clearInterval(interval);
  }, [count, setCount, hover, setIncrement])
  /** 
   * 
   * iterates imageslider data, see data here - src/utils/siteInfo.ts 
   * 
   *  */

  return (
    <>
      <Head>
        <meta name="description" content="Home of the official kleanse australia" />
      </Head>
      <div key={count['image']} id='fadein' className='bg-white z-20 flex flex-center items-center flex-col pt-20 m-auto'
        onMouseEnter={e => setHover(true)}
        onMouseLeave={e => setHover(false)}>
        <div className='lg:block md:block hidden' >
          <Image src={`${images[count['image']]?.image}`} width={2000} height={800} alt={`${images[count['image']]?.title}`} objectFit='cover' />
        </div>
        <div className='lg:hidden md:hidden block' >
          <Image src={`${images[count['image']]?.image}`} width={2000} height={1800} alt={`${images[count['image']]?.title}`} objectFit='cover' />
        </div>

        <div
          className='absolute w-screen flex flex-col justify-center items-center lg:top-0 md:top-0 top-0'
          style={{ height: `50vw`, minHeight: '35rem' }}
          // @ts-ignore
          onClick={e => { if (images[count['image']]?.href !== undefined) return window.location.href = images[count['image']]?.href }}
        >
          <div className='relative h-2/6 w-2/6 flex flex-col justify-center items-center' style={{}}>
            <h1 className='text-white w-screen text-center' style={{ fontSize: '4vh', fontWeight: '50' }}>{`${images[count['image']]?.title}`}</h1>
            <p className=''>{`${images[count['image']]?.paragraph}`}</p>
            <button
              className='lg:visible h-2/6 w-2/6 lg:bg-grey text-white shadow-2xl hover:border border-white border-1 sm:invisible bg-grey md:visible invisible '
              onClick={e => { window.location.href = `${images[count['image']]?.href}` }}>
              {`${images[count['image']]?.buttonText}`}
            </button>
          </div>
        </div>
        {/* image slider text/button container */}
        {/* setIncrement custom hook increments image slider data object */}

        <div className='h-8 w-screen relative bottom-0 z-10 -translate-y-10 flex-row justify-center items-center lg:flex hidden' style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
          {images.map(({ id }) => {
            return (
              <button key={id} className='h-4 w-4 bg-white m-2 hover:bg-grey hover:border border-black border-1'
                style={{
                  borderRadius: '25px',
                  boxShadow: 'inset 0rem 0.1rem 0.3rem 0.001rem rgba(0,0,0,0.5)',
                  opacity: `${count['image'] === id - 1 ? '100%' : '40%'}`,
                }}
                onClick={e => setCount('image', id - 1)} ></button>
            )
          })}

        </div>
        {/* round slider buttons container */}

      </div>
    </>
  );
}

interface ImageCards { }
export const ImageCards: FC<ImageCards> = (): JSX.Element => {

  return (
    <div className='w-full flex flex-row flex-wrap justify-center z-1 relative '>
      {cards.map((info) => {
        return (
          <div key={info.title} className='lg:w-1/4 md:w-1/4 w-5/6 min-w-[20rem] md:py-12 sm:py-6' onMouseEnter={e => { e.preventDefault(); }}>
            <h2 className=''>{info.title}</h2>
            <p className=''>{info.paragraph}</p>
            <div className='w-90 h-80 bg-white z-3 mx-5'
              style={{
                backgroundImage: `url(${info.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }} />
          </div>
        )
      })}
      {/** images imported from src/utils/siteInfo.ts */}
    </div>
  )
};