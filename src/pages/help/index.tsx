import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import { Form } from "../../components/form";
import Layout from "../../components/layout"
import { ContactForm, FormType } from "../../hooks/SetForm";
import { client } from "../_app";

const Contact: FC = ({ }): JSX.Element => {



    return (
        <>
            <Head>
                <meta name="description" content="" />
            </Head>
            <Layout>

                <div id='hardfadein' className='flex flex-col justify-center items-center'>
                    <div className='h-80 w-full mb-20'>
                        <Image src='/images/models/womenputtingcream.jpg' alt='womens skincare product' height={400} width={2000} objectFit='cover' />
                    </div>
                    <h1 className='text-3xl'>CONTACT US</h1>
                    <h2 className='text-md'>WE ARE HERE TO HELP</h2>

                    <div className="flex flex-row items-start justify-center h-full w-auto border-b-3 border-b-black border-b m-8 mx-5 pb-12" style={{}}>

                        <div className='w-full h-4/6 flex flex-row flex-wrap justify-center items-center'>
                            <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                                <h1 className='text-grey text-2xl px-3'>FAQ&apos;s</h1>
                                <p className='px-3'>Your question may already be answered here!</p>
                                <Link href='/help/general'><button className='bg-grey p-4 w-full text-white'>Visit FAQ&apos;s</button></Link>
                            </div>

                            <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                                <h1 className='text-grey text-2xl px-3'>INFLUENCERS</h1>
                                <p className='px-3'>Interested in partnering with us?</p>
                                <Link href='/help/influencers'><button className='bg-grey p-4 w-full text-white'>Find out more!</button></Link>
                            </div>

                            <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                                <h1 className='text-grey text-2xl px-3'>STOCKISTS</h1>
                                <p className='px-3'>Interested in stocking our products?</p>
                                <Link href='/help/stockists'><button className='bg-grey p-4 w-full text-white'>Contact us!</button></Link>
                            </div>

                            <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                                <h1 className='text-grey text-2xl px-3'>CAREERS</h1>
                                <p className='px-3'>Interested in joining the Kleanse team?</p>
                                <Link href='/help/careers'><button className='bg-grey p-4 w-full text-white'>Contact us!</button></Link>
                            </div>

                        </div>
                        {/* other contact methods */}

                    </div>

                    <ContactFormComponent />

                    {/* contact form */}

                </div>
            </Layout>
        </>
    )
}

export default Contact

export const ContactFormComponent: FC = (): JSX.Element => {

    const handleResponse = async (data: FormType<ContactForm>) => {
        const res = await client.mutation('sendgrid.send-email', data);
        if (res.result) {
            return <Success />;
        }
        return <Failed />
    }

    const Success: FC = (): JSX.Element => {
        return (
            <div>
                Thank you for contacting kleanse
            </div>
        )
    }

    const Failed: FC = (): JSX.Element => {
        return (
            <div>
                Unfortunatly your request was unnable to reach its destination, please try again.
            </div>
        )
    }

    return (
        <div className='w-2/6 mb-20'>
            <h2 className='text-center text-md'>OTHER ENQUIRIES</h2>
            <Form formData={{ firstname: '', email: '', hidden: '', message: '' }} buttons={[]} onResponse={e => handleResponse(e)} />
            {/* contact form, doesnt require date of birth elements, pass empty array */}
            {/* onResponse returns boolean from api */}
            <div className='h-1/2 w-full flex flex-row justify-evenly items-center'>
                <span className='flex flex-col justify-center items-center cursor-pointer' onClick={e => { }}>
                    <Image src='/images/ui-elements/phone-office-thin.svg' width={30} height={30} /><h3>Mobile</h3></span>
                <span className='flex flex-col justify-center items-center cursor-pointer' onClick={e => { }}>
                    <Image src='/images/ui-elements/envelope-circle-check-light.svg' width={30} height={30} /><h3>email</h3></span>
                <span className='flex flex-col justify-center items-center cursor-pointer' onClick={e => { }}>
                    <Image src='/images/ui-elements/mailbox-thin.svg' width={30} height={30} />
                    <h3>post</h3></span>
            </div>
        </div>
    )
}