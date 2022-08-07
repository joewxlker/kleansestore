import { FC } from "react"
import { Form } from "../components/form"
import Layout from "../components/layout"

interface SignupProps { };

const Signup: FC<SignupProps> = ({ }): JSX.Element => {
    return (
        <Layout>
            <div className=''>
                <Form type={['firstname', 'lastname', 'email', 'pass', 'hidden', 'word']} target={'sendGrid'} buttons={['day', 'month', 'year']} onResponse={() => ''} />
            </div>
        </Layout>
    )
}

export default Signup