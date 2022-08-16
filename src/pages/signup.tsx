import { FC } from "react"
import { Form } from "../components/form"
import Layout from "../components/layout"
import { FormType, SignUpForm } from "../hooks/SetForm";
import { client } from "./_app";

interface SignupProps { };

const Signup: FC<SignupProps> = ({ }): JSX.Element => {

    const handleRequest = async (data: FormType<SignUpForm>) => {
        const res = await client.mutation('mongo.sign-up', data);
        console.log(res)
    }

    return (
        <Layout>
            <div className=''>
                <Form
                    formData={{ firstname: '', lastname: '', email: '', password: '', hidden: '' }}
                    target={'mongo.sign-up'}
                    buttons={['day', 'month', 'year']}
                    onResponse={handleRequest} />
                {/** pass types to create input fields, pass endpoint to target, buttons only needs definition for date of birth elements */}
                {/** onResponse returns complete form obj */}
            </div>
        </Layout>
    )
}

export default Signup