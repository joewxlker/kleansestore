import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { client } from "../_app";

interface HelpLayoutProps {
  children: JSX.Element;
}
interface HeaderProps {}
interface FooterProps {}

const HelpLayout: FC<HelpLayoutProps> = ({ children }): JSX.Element => {
  const [history, setHistory] = useState<Array<string> | undefined>();
  const router = useRouter();

  useEffect(() => {
    setHistory(router.pathname.split("/"));
  }, []);

  return (
    <>
      <Head>
        <title>kleanse Help Center</title>
        <meta name="description" content="kleanse official website" />
      </Head>
      <Header />
      {history !== undefined && (
        <div className="h-20 w-full flex flex-row">
          {history.map(data => {
            return (
              <>
                {data !== "" && (
                  <span className="h-full w-32 p-5 flex flex-row justify-evenly items-center">
                    <span className="w-1/2 flex flex-row justify-center">
                      <Link
                        href={`${history
                          .slice(0, history.indexOf(data) + 1)
                          .map(x => {
                            if (x !== "") return `/${x}`;
                          })
                          .join("")}`}
                      >
                        <span className="w-full" style={{ color: `${history[history.length - 1] === data ? "rgba(0,0,0,0.5" : "black"}` }}>
                          <h4>{data}</h4>
                        </span>
                      </Link>
                    </span>
                    <span className="w-1/2 flex flex-row justify-center">
                      <h4 className="w-full text-center">
                        {history[history.length - 1] !== data && (
                          <Image alt="" src="/images/ui-elements/angle-right-thin.svg" width={20} height={20} />
                        )}
                      </h4>
                    </span>
                  </span>
                )}
              </>
            );
          })}
        </div>
      )}
      {children}
      <Footer />
    </>
  );
};

export default HelpLayout;

export const Header: FC<HeaderProps> = (): JSX.Element => {
  // toggles setBoolean in layout component

  return (
    <div className="w-full bg-white shadow flex flex-row items-center">
      <div className=" h-full w-1/2 p-5 flex flex-row justify-center items-center">
        <Link href="/">
          <span className="p-2 cursor-pointer">
            <Image alt="" src="/images/ui-elements/arrow-left-long-thin.svg" width={20} height={20} />
            <span className="px-5">BACK TO KLEANSE</span>
          </span>
        </Link>
      </div>
      <div className=" h-full w-1/2 p-5 flex flex-col justify-center items-center">
        <Image alt="" src="/images/kleanse-logos/kleanse-wing-in-text.svg" width={100} height={40} />
        <h1 className="text-xl">help center</h1>
      </div>
    </div>
  );
};

export const Footer: FC<FooterProps> = (): JSX.Element => {
  return (
    <div className="flex bg-grey p-5 text-white flex-row justify-center items-center" style={{ color: "rgb(150,150,150)" }}>
      <p>Terms of use</p>
      <p className="px-5">|</p>
      <p>Privacy</p>
    </div>
  );
};
