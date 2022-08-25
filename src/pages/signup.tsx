import { FC } from "react"
import { Form } from "../components/form"
import Layout from "../components/layout"
import { FormType, SignUpForm } from "../hooks/SetForm";
import { client } from "./_app";

interface SignupProps { };

const Signup: FC<SignupProps> = ({ }): JSX.Element => {

    const handleRequest = async (data: FormType<SignUpForm>) => {
        console.log(data)
        const res = await client.mutation('mongo.sign-up', data);
        console.log(res)
    }

    return (
        <Layout>
            <div className='h-screen justify-center flex items-center flex-col'>
                <Form
                    formData={{ firstname: '', lastname: '', email: '', password: '', hidden: '' }}
                    buttons={['day', 'month', 'year']}
                    onResponse={e => handleRequest(e)} />
                {/** pass types to create input fields, pass endpoint to target, buttons only needs definition for date of birth elements */}
                {/** onResponse returns complete form obj */}
            </div>
        </Layout>
    )
}

export default Signup