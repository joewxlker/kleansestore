import { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect } from "react";
import { Form } from "../../../components/form";
import HelpLayout from "../layout";

const Unsubscribe: NextPage = () => {
  const removeFromMailList = async (email: string) => {
    return <Success />;
  };

  const Success: FC = (): JSX.Element => {
    useEffect(() => {
      window.location.href = "/";
    }, []);

    return <div>Success</div>;
  };

  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <HelpLayout>
        <>
          <div className="w-screen flex flex-col justify-center items-center py-12 ">
            <div className="h-80 my-20 w-1/2 flex flex-col items-center justify-evenly">
              <h1 className="text-2xl">Unsubscribe</h1>
              <p>Please enter the email of the account you wish to unsubscribe</p>
              <Form formData={{ email: "", hidden: "" }} buttons={[]} onResponse={email => removeFromMailList(email)} />
            </div>
          </div>
        </>
      </HelpLayout>
    </>
  );
};

export default Unsubscribe;
