import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { cards, images } from "../utils/siteInfo";
import { inferQueryOutput } from "../utils/trpc";

interface HomeProps { products: inferQueryOutput<'stripe.all-products'> }
interface MainProps { mobile: boolean, bool: boolean }

export const getStaticProps: GetStaticProps = async () => {
  const req = await fetch('http://localhost:3000/api/stripe');
  const products = await req.json();
  return { props: { products } }
}

const Home: NextPage<HomeProps> = (props) => {

  const bool = false;
  const mobile = false;

  return (
    <Layout>
      <>

        <div className='' >
          <header className=''>
            <h5 className='' onClick={e => console.log(props)}>Memberships Available!</h5>
          </header>
          <Main mobile={mobile} bool={bool} />
          <ImageCards />
          <button onClick={e => window.scrollTo(0, 0)} > ^ </button>
        </div>
      </>
    </Layout>

  )
}

export default Home


interface MainProps { }
export const Main: FC<MainProps> = (props): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  const [hover, setHover] = useState<boolean>(false);


  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIncrement(2, 'image', true);

    }, 5000)
    return () => clearInterval(interval);
  }, [count, setCount, hover])

  return (
    <>
      <div className='' onMouseOver={e => setHover(false)} style={{ position: 'fixed', height: '100vh', width: '100vw', top: '0', zIndex: '-1', background: 'rgba(0,0,0,0.1)' }} />
      <div className='' onMouseEnter={e => setHover(true)} style={{ padding: '2rem 0rem', background: 'gray', zIndex: '1' }}>
        <h1>{images[count['image']]?.title}</h1>
        <Image src={`${images[count['image']]?.image}`} width={2000} height={700} />
      </div>

    </>
  );
}

interface ImageCards { }
export const ImageCards: FC<ImageCards> = (props): JSX.Element => {

  const [hover, setHover] = useState<boolean>()

  return (
    <>
      {cards.map((info) => {
        return (

          <>
            <div className='' onMouseEnter={e => { e.preventDefault(); setHover(true) }}>
              <h3 className=''>{info.title}</h3>
              <p className=''>{info.paragraph}</p>
              <Image src={info.image} width={600} height={320} />

            </div>
          </>
        )
      })}
    </>
  )
};