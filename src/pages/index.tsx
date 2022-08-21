import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";
import Products from '../components/products'

interface HomeProps { products: inferQueryOutput<'stripe.all-products'> }
/** infer query output infers typing based on routes defined {@module src/server/router/routes.ts} */

const Home: NextPage<HomeProps> = (props) => {

  return (
    <Layout>
      <>
        <div className='' >
          <header className='z-20 block flex flex-column justify-center bg-salmon h-10 align-center mb-6'>
            <h5 className='' onClick={e => ''}>Memberships Available!</h5>
          </header>
          <Main />
          <ImageCards images={props.products} />
          <Products params={'all-products'} products={props.products} />
          <button onClick={e => window.scrollTo(0, 0)} > ^ </button>
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

interface MainProps { }
export const Main: FC<MainProps> = (): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  /** increment/decrement count based on input vars,  src/hooks*/
  const [hover, setHover] = useState<boolean>(false);
  // prevents setInterval from running on hover

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
      <div className='bg-white' onMouseEnter={e => setHover(false)} onMouseLeave={e => setHover(false)} style={{ position: 'fixed', height: '100vh', width: '100vw', top: '0', zIndex: '0' }} />
      <div className='bg-white' onMouseEnter={e => setHover(true)} style={{ margin: '3rem 0rem', background: 'gray', zIndex: '1' }}>
        <h1>{images[count['image']]?.title}</h1>
        <Image src={`${images[count['image']]?.image}`} width={2000} height={700} alt={``} />
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
              <div className='w-90 h-80 bg-salmon z-3' style={{ backgroundImage: 'url("https://files.stripe.com/links/MDB8YWNjdF8xTEtIM1lFdTkwczBGNXpJfGZsX3Rlc3RfOEZvOU9XejJJRHV2NDBjS2dYTjdwSGtz00AYcNJHih")' }} />
            </div>
          </>
        )
      })}
      {/** images imported from src/utils/siteInfo.ts */}
    </div>
  )
};