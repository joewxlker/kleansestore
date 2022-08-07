import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";

interface HomeProps { products: inferQueryOutput<'stripe.all-products'> }
/** infer query output infers typing based on routes defined {@module src/server/router/routes.ts} */

export const getStaticProps: GetStaticProps = async () => {
  const req = await fetch('http://localhost:3000/api/trpc/stripe.all-products');
  //TODO convert to useMutation
  const products = await req.json();
  return { props: { products } }
  // populates website with static stripe product data
}

const Home: NextPage<HomeProps> = (props) => {

  return (
    <Layout>
      <>
        <div className='' >
          <header className=''>
            <h5 className='' onClick={e => ''}>Memberships Available!</h5>
          </header>
          <Main />
          <ImageCards />
          <button onClick={e => window.scrollTo(0, 0)} > ^ </button>
        </div>
      </>
    </Layout>

  )
}

export default Home


interface MainProps { }
export const Main: FC<MainProps> = (): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  /** increment/decrement count based on input vars, see definition @module src/hooks*/
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
  /** iterates imageslider data, see definition @module src/utils/siteInfo.ts  */

  return (
    <>
      <div className='' onMouseOver={e => setHover(false)} style={{ position: 'fixed', height: '100vh', width: '100vw', top: '0', zIndex: '-1', background: 'rgba(0,0,0,0.1)' }} />
      <div className='' onMouseEnter={e => setHover(true)} style={{ padding: '2rem 0rem', background: 'gray', zIndex: '1' }}>
        <h1>{images[count['image']]?.title}</h1>
        <Image src={`${images[count['image']]?.image}`} width={2000} height={700} alt={``} />
      </div>

    </>
  );
  {/** images imported from @module src/utils/siteInfo.ts */ }
}

interface ImageCards { }
export const ImageCards: FC<ImageCards> = (props): JSX.Element => {

  const [hover, setHover] = useState<boolean>()
  // hover target image adds effects

  return (
    <>
      {cards.map((info) => {
        return (

          <>
            <div className='' onMouseEnter={e => { e.preventDefault(); setHover(true) }}>
              <h3 className=''>{info.title}</h3>
              <p className=''>{info.paragraph}</p>
              <Image src={info.image} width={600} height={320} alt={''} />

            </div>
          </>
        )
      })}
      {/** images imported from @module src/utils/siteInfo.ts */}
    </>
  )
};