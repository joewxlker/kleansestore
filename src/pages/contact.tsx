import { FC } from "react"
import { Form } from "../components/form";
import Layout from "../components/layout"
import { ContactForm, FormType } from "../hooks/SetForm";

const Contact: FC = ({ }): JSX.Element => {

    const handleResponse = (data: FormType<ContactForm>) => {
        return
    }

    return (
        <Layout>
            <div className=''>
                <Form formData={{ firstname: '', email: '', hidden: '', message: '' }} target={'sendgrid.send-email'} buttons={[]} onResponse={handleResponse} />
                {/* contact form, doesnt require date of birth elements, pass empty array */}
                {/* onResponse returns boolean from api */}
            </div>
        </Layout>
    )
}

export default Contact