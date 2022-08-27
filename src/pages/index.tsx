import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";
import Products, { handleCartUpdates, ProductData } from '../components/products'
import { useSession } from "next-auth/react";
import { CartContext } from "./_app";

interface HomeProps {
  onCartUpdates: (items: ProductData) => void;
  products: inferQueryOutput<'stripe.all-products'>
}
/** infer query output infers typing based on routes defined {@module src/server/router/routes.ts} */

const Home: NextPage<HomeProps> = (props) => {

  const [productData, setProductData] = useState<ProductData | undefined>();

  return (
    <Layout>
      <>
        <div className='' >
          <Slider />
          <ImageCards images={props.products} />
          <Products params={'all-products'} products={props.products} />
          <button className=" fixed h-12 w-12 bg-salmon bottom-12 right-12 z-90" onClick={e => window.scrollTo(0, 0)} > ^ </button>
        </div>
      </>
    </Layout>

  )
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
  const req = await fetch('http://localhost:3000/api/stripe');
  const products = await req.json();
  return { props: { products } }
  // populates website with static stripe product data
}

interface SliderProps { }
export const Slider: FC<SliderProps> = (): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  /** increment/decrement count based on input vars,  src/hooks*/
  const [hover, setHover] = useState<boolean>(false);
  // prevents setInterval from running on hover

  // const { data: session } = useSession()

  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIncrement(2, 'image', true);
      // 2 = limit, 'target varible = image', true = increment
    }, 5000)
    return () => clearInterval(interval);
  }, [count, setCount, hover, setIncrement])
  /** iterates imageslider data, see data here - src/utils/siteInfo.ts  */

  return (
    <>
      <div key={count['image']} id='fadein' className='bg-white bg-gray z-20'
        onMouseEnter={e => setHover(true)}
        onMouseLeave={e => setHover(false)}>
        <Image src={`${images[count['image']]?.image}`} width={2000} height={800} alt={``} />

        <div className='absolute w-screen flex flex-col justify-center items-center h-1/2 top-0' style={{ height: `50vw`, minHeight: '40rem' }}>
          <div className='relative h-2/6 w-2/6 flex flex-col justify-center items-center' style={{ minHeight: '10rem', minWidth: '20rem', }}>
            <h1 className='text-white' style={{ fontSize: '2.7vw', fontWeight: '50' }}>{`${images[count['image']]?.title}`}</h1>
            <p className=''>{`${images[count['image']]?.paragraph}`}</p>
            <button
              className='h-2/6 w-2/6 bg-grey text-white shadow-2xl hover:border border-white border-1'
              onClick={e => { window.location.href = `${images[count['image']]?.href}` }}>
              {`${images[count['image']]?.buttonText}`}
            </button>
          </div>
        </div>
        {/* image slider text/button container */}
        {/* setIncrement custom hook increments image slider data object */}

        <div className='h-8 w-screen relative bottom-0 z-20 -translate-y-10 flex flex-row justify-center items-center' style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
          <button className='h-4 w-4 bg-white m-2 hover:bg-grey hover:border border-black border-1'
            style={{
              borderRadius: '25px',
              boxShadow: 'inset 0rem 0.1rem 0.3rem 0.001rem rgba(0,0,0,0.5)',
              opacity: `${count['image'] === 0 ? '100%' : '40%'}`,
            }}
            onClick={e => setCount('image', 0)} />
          <button className='h-4 w-4 bg-white m-2 hover:bg-grey hover:border border-black border-1'
            style={{
              borderRadius: '25px',
              boxShadow: 'inset 0rem 0.1rem 0.3rem 0.001rem rgba(0,0,0,0.5)',
              opacity: `${count['image'] === 1 ? '100%' : '40%'}`,
            }}
            onClick={e => setCount('image', 1)} />
          <button className='h-4 w-4 bg-white m-2 hover:bg-grey hover:border border-black border-1'
            style={{
              borderRadius: '25px',
              boxShadow: 'inset 0rem 0.1rem 0.3rem 0.001rem rgba(0,0,0,0.5)',
              opacity: `${count['image'] === 2 ? '100%' : '40%'}`,
            }}
            onClick={e => setCount('image', 2)} />
        </div>
        {/* round slider buttons container */}

      </div>
    </>
  );
  {/** images imported from src/utils/siteInfo.ts */ }
}

interface ImageCards { images: Array<object> }
export const ImageCards: FC<ImageCards> = (props): JSX.Element => {

  const [hover, setHover] = useState<boolean>()
  // hover target image adds effects

  return (
    <div className='w-full flex flex-row flex-nowrap flow-scroll z-1 relative'>
      {cards.map((info, key) => {
        return (

          <>

            <div className=' w-2/4' onMouseEnter={e => { e.preventDefault(); setHover(true) }}>
              <h3 className=''>{info.title}</h3>
              <p className=''>{info.paragraph}</p>
              <div className='w-90 h-80 bg-white z-3'
                style={{
                  backgroundImage: 'url("/images/models/moisturizer.svg")',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }} />
            </div>
          </>
        )
      })}
      {/** images imported from src/utils/siteInfo.ts */}
    </div>
  )
};