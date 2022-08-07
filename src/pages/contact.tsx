import { FC } from "react"
import { Form } from "../components/form";
import Layout from "../components/layout"
import useSetForm from "../hooks/SetForm";

export interface ContactForm extends FormData { }

const Contact: FC = ({ }): JSX.Element => {

    const [form, setForm] = useSetForm();

    return (
        <Layout>
            <div className=''>
                <Form type={['firstname', 'email', 'hidden', 'message']} target={'sendgrid'} buttons={[]} onResponse={(data) => console.log(data)} />
            </div>
        </Layout>
    )
}

export default Contact