import Image from "next/image";
import { FC } from "react"
import { Form } from "../components/form";
import Layout from "../components/layout"
import { ContactForm, FormType } from "../hooks/SetForm";

const Contact: FC = ({ }): JSX.Element => {

    const handleResponse = (data: FormType<ContactForm>) => {
        console.log(data)
        //TODO finish sendgrid api and send data 
    }

    return (
        <Layout>
            <div id='hardfadein' className='flex flex-col justify-center items-center pt-32'>
                <h1 className='text-3xl'>CONTACT US</h1>
                <p>We are here to help.</p>

                <div className="flex flex-row items-start justify-center h-full w-auto border-b-3 border-b-black border-b mb-5 mx-5 pb-5" style={{}}>

                    <div className='w-1/2 h-4/6 flex flex-row flex-wrap justify-center items-center'>
                        <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                            <h1 className='text-grey text-2xl px-3'>FAQ's</h1>
                            <p className='px-3'>Your question may already be answered here!</p>
                            <button className='bg-grey p-4 w-full text-white'>Visit FAQ's</button>
                        </div>

                        <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                            <h1 className='text-grey text-2xl px-3'>INFLUENCERS</h1>
                            <p className='px-3'>Interested in partnering with us?</p>
                            <button className='bg-grey p-4 w-full text-white'>Find out more!</button>
                        </div>

                        <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                            <h1 className='text-grey text-2xl px-3'>STOCKISTS</h1>
                            <p className='px-3'>Interested in stocking our products?</p>
                            <button className='bg-grey p-4 w-full text-white'>Contact us!</button>
                        </div>

                        <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                            <h1 className='text-grey text-2xl px-3'>INFLUENCERS</h1>
                            <p className='px-3'>Interested in partnering with us?</p>
                            <button className='bg-grey p-4 w-full text-white'>Find out more!</button>
                        </div>

                        <div className='p-5 h-60 w-60 flex flex-col shadow-xl mx-2 justify-evenly items-center'>
                            <h1 className='text-grey text-2xl px-3'>INFLUENCERS</h1>
                            <p className='px-3'>Interested in partnering with us?</p>
                            <button className='bg-grey p-4 w-full text-white'>Find out more!</button>
                        </div>
                    </div>
                    {/* other contact methods */}

                    <div className='w-2/6'>
                        <Form formData={{ firstname: '', email: '', hidden: '', message: '' }} buttons={[]} onResponse={handleResponse} />
                        {/* contact form, doesnt require date of birth elements, pass empty array */}
                        {/* onResponse returns boolean from api */}
                        <div className='h-1/2 w-full flex flex-row justify-evenly items-center'>
                            <span className='flex flex-col justify-center items-center'><Image src='' height={50} width={50} /><h3>mobie</h3></span>
                            <span className='flex flex-col justify-center items-center'><Image src='' height={50} width={50} /><h3>email</h3></span>
                            <span className='flex flex-col justify-center items-center'><Image src='' height={50} width={50} /><h3>post</h3></span>
                        </div>
                    </div>

                    {/* contact form */}

                </div>
            </div>
        </Layout>
    )
}

export default Contact