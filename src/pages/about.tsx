import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import Layout from "../components/layout";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Find out what drives us at kleanse" />
      </Head>
      <Layout>
        <div className="w-screen flex flex-col justify-center items-center pt-18">
          <div className="h-80 w-full mb-20 overflow-hidden">
            <Image
              src="/images/models/womenputtingcream.jpg"
              alt="womens skin care banner"
              width={2000}
              height={700}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="h-80 my-20 w-1/2 flex flex-col items-center justify-evenly">
            <h1>ABOUT KLEANSE</h1>
            <p>
              Influential, innovative and progressive, Kleanse is reinventing a wholly modern approach to fashion. Under the new vision of
              creative director Fabrice, the House has redefined luxury for the 21st century, further reinforcing its position as one of the
              world&#39;s most desirable fashion houses. Eclectic, contemporary, romantic—Kleanse products represent the pinnacle of Italian
              craftsmanship and are unsurpassed for their quality and attention to detail. Kleanse is part of the Kering Group. A global
              Luxury group, Kering manages the development of a series of renowned Houses in Fashion, Leather Goods, Jewellery and Watches.
              Discover the stories behind Alessandro Michele&apos;s collections, exclusively on Stories.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;

interface ModuleProps {
  title?: string;
  images?: Array<string>;
  textBody?: Array<string>;
  align: string;
}

export const Module: FC<ModuleProps> = ({ title, images, textBody, align }): JSX.Element => {
  return (
    <div className={`w-full px-40 py-20 flex flex-col items-${align}`}>
      <div className="w-2/3 flex flex-col justify-evenly">
        <h1 className="text-4xl">{title}</h1>
        <h2 className="text-2xl">sub heading</h2>
        {textBody !== undefined && <p>{textBody[0]}</p>}
        {images !== undefined && <Image alt={``} src={images[0] ?? ''} height={400} width={700} />}
      </div>
    </div>
  );
};
