import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useIncrementData } from "../hooks/useIntervals";
import { inferQueryOutput } from "../utils/trpc";
import Products from "./products";

interface HomeProps { stripe: inferQueryOutput<'stripe.all-products'> }
interface MainProps { mobile: boolean, bool: boolean }
interface ShopItems { }

export const getStaticProps: GetStaticProps = async () => {
  const database = await fetch('http://localhost:3000/api/getStripeItems');
  const stripe = await database.json();
  return { props: { stripe } }
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
        <Products stripe={props.stripe} />
      </>
    </Layout>

  )
}

export default Home


interface MainProps { }
export const Main: FC<MainProps> = (props): JSX.Element => {

  const [count, setCount, setIncrement] = useIncrementData();
  const [hover, setHover] = useState<boolean>(false);

  const images = [{
    title: 'KLEANSE  X  HYGIENE',
    paragraph: "",
    image: '',
    active: [true, false, false]
  },
  {
    title: 'KLEANSE AND COFFEE',
    paragraph: '',
    image: '',
    active: [false, true, false]
  },
  {
    title: 'KLEANSE  REWARDS',
    paragraph: '',
    image: '',
    active: [false, false, true]
  }
  ]
  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIncrement(2, 'image-slider', true);

    }, 5000)
    return () => clearInterval(interval);
  }, [count, setCount, hover])

  return (
    <>
      <div className='' onMouseOver={e => setHover(false)} style={{ position: 'fixed', height: '100vh', width: '100vw', top: '0', zIndex: '0', }} />
      <div className='' onMouseEnter={e => setHover(true)} style={{ padding: '2rem 0rem', background: 'gray', zIndex: '1' }}>
        <h1>{images[count['image-slider']]?.title}</h1>
        <Image src={`${images[count['image-slider']]?.image}`} width={1000} height={500} />
      </div>

    </>
  );
}

interface ImageCards { }
export const ImageCards: FC<ImageCards> = (props): JSX.Element => {

  const [hover, setHover] = useState<boolean>()

  const cards = [{
    title: "TRENDING",
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '',
    about: ''
  }, {
    title: 'NEW ARRIVALS',
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '',
    about: ''
  }, {
    title: 'MORE COMING SOON...',
    hovertext: 'More items coming soon',
    paragraph: '',
    image: '',
    about: ''
  }]

  return (
    <>
      {cards.map((info) => {
        return (

          <>
            <div className='' onMouseEnter={e => { e.preventDefault(); setHover(true) }}>
              <h3 className=''>{info.title}</h3>
              <p className=''>{info.paragraph}</p>
              <Image src={info.image} width={200} height={100} />

            </div>
          </>
        )
      })}
    </>
  )
};