import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Form } from "../../../components/form";
import { Layover } from "../../../components/layover";
import HelpLayout from "../layout";

interface Params {
  title: string;
}

const Careers: NextPage<CareerProps> = (props): JSX.Element => {
  const [applicationForm, setApplicationForm] = useState<boolean>(false);
  const [params, setParams] = useState<Params | undefined>();
  const [jobData, setJobdata] = useState<Array<JobData> | undefined | []>();
  const [data, setData] = useState(false);

  useEffect(() => {
    setJobdata(props.jobData);
  }, []);

  const handleFormResponse = async (response: any) => {
    // const res = client.mutation('sendgrid.send-email', response);
    return <></>;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleClick = () => {
    if (!data) {
      setData(!data);
      return setJobdata([]);
    }
    setData(!data);
    return setJobdata([
      {
        title: "Web Developers",
        description: "Kleanse is currently seeking fulltime web developers to help in maintaining the kleanse architecture.",
        timePosted: "4 hours ago",
        location: "remote",
      },
    ]);
  };

  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <HelpLayout>
        <div className="lg:flex-row md:flex-col flex-col w-screen lg:h-screen md:h-screen flex items-start">
          <div className="lg:w-5/6 md:w-full w-full h-full flex flex-col justify-start items-center">
            <div className="my-5 w-1/2 flex flex-col items-center justify-evenly">
              <h1 className="text-2xl">Careers</h1>
            </div>
            <div className="lg:w-4/6 md:w-5/6 w-full h-4/6 overflow-scroll flex flex-col justify-start shadow-xl p-12 ">
              {jobData !== undefined && jobData.length > 0 ? (
                <>
                  {jobData.map(({ title, description, timePosted, location }) => {
                    return (
                      <div key={title} className="flex flex-col m-3 w-full justify-evenly">
                        <div className=" flex lg:flex-row md:flex-col flex-col">
                          <span className="w-4/6 flex flex-col justify-center items-start lg:p-0 p-4">
                            <h1>{title}</h1>
                            <p>{description}</p>
                          </span>
                          <span className="w-2/6 flex flex-col justify-center items-end lg:p-0 p-4">
                            <h3>Posted {timePosted}</h3>
                          </span>
                        </div>
                        {location !== "perth" && <p className="lg:p-0 p-4 text-salmon"> {location}</p>}
                        {location === "perth" && <p className="lg:p-0 p-4 text-salmon">Applicant must be perth based</p>}
                        <button
                          className="bg-grey text-white py-4"
                          onClick={e => {
                            setApplicationForm(true);
                            setParams({ title: title });
                          }}
                        >
                          APPLY
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>We do not currently have any jobs posted</p>
              )}
            </div>
          </div>
          <button className="bg-grey text-white" onClick={e => handleClick()}>
            Toggle Job data
          </button>
          <div className="h-full lg:h-4/6 lg:w-4/6 md:w-full w-full flex flex-col justify-center items-center py-12 lg:justify-start">
            <span className="w-4/6 h-4/6 flex flex-col justify-evenly items-evenly">
              <h1 className="text-lg">Why work for us?</h1>
              <p>
                Influential, innovative and progressive, Kleanse is reinventing a wholly modern approach to fashion. Under the new vision of
                creative director Fabrice, the House has redefined luxury for the 21st century, further reinforcing its position as one of
                the world&#39;s most desirable fashion houses. Eclectic, contemporary, romantic—Kleanse products
              </p>
            </span>
          </div>
          {applicationForm && (
            <Layover>
              <div className="flex flex-col items-center">
                <header className="h-12 w-full flex flex-row justify-end items-center px-8">
                  <button onClick={e => setApplicationForm(false)}>
                    <p>Changed your mind about applying?</p>
                  </button>
                </header>
                <span className="w-full flex flex-col justify-center items-center">
                  <h1>Applying for {params?.title}</h1>
                  Please provide a cover letter with your resume and we will contact you
                </span>
                <div className="h-full bg-white w-4/6">
                  <Form
                    formData={{ email: "", subject: "", phonenumber: "", message: "", hidden: "" }}
                    buttons={[]}
                    onResponse={handleFormResponse}
                  ></Form>
                </div>
              </div>
            </Layover>
          )}
        </div>
      </HelpLayout>
    </>
  );
};

export default Careers;

interface CareerProps {
  jobData: Array<JobData>;
}

interface JobData {
  title: string;
  description: string;
  timePosted: string;
  location: string;
}
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { jobData: [] } };
};
