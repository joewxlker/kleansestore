import { FC } from "react"
import { Form } from "../components/form";
import Layout from "../components/layout"

export interface ContactForm extends FormData { }

const Contact: FC = ({ }): JSX.Element => {

    return (
        <Layout>
            <div className=''>
                <Form type={['firstname', 'email', 'hidden', 'message']} target={'sendgrid.send-email'} buttons={[]} onResponse={(data) => console.log(data)} />
                {/* contact form, doesnt require date of birth elements, pass empty array */}
                {/* onResponse returns boolean from api */}
            </div>
        </Layout>
    )
}

export default Contact