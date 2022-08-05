import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { JSONArray, JSONObject } from "superjson/dist/types";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

interface HomeProps { data: Array<object>, items: Array<object> }
interface MainProps { mobile: boolean, bool: boolean }
interface ShopItems { }

export const getSeverSideProps: GetServerSideProps = async () => {
  return { props: { data: [{}], items: [{}]} }
}

const Home: NextPage<HomeProps> = ({data, items}) => {

  const bool = false;
  const mobile = false;

  return (
    <Layout>
      <div className='' >
      <header className=''>
                <h5 className=''>Memberships Available!</h5>
            </header>
        <Main mobile={mobile} bool={bool} />
        <button onClick={e => window.scrollTo(0,0)} > ^ </button>
      </div>
    </Layout>
  )
}

export default Home

export const Main: FC<MainProps> = ({mobile, bool}): JSX.Element => {
  return (
      <>
          <div className='main-entry-container'>
          </div>
          {/* {bool['sidebar'] && mobile && <div className='darken-bg'/>} */}
      </>
  );
}