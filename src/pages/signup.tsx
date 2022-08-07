import { FC } from "react"
import { Form } from "../components/form"
import Layout from "../components/layout"

interface SignupProps { };

const Signup: FC<SignupProps> = ({ }): JSX.Element => {
    return (
        <Layout>
            <div className=''>
                <Form type={['firstname', 'lastname', 'email', 'password', 'hidden',]} target={'mongo.sign-up'} buttons={['day', 'month', 'year']} onResponse={() => ''} />
                {/** pass types to create input fields, pass endpoint to target, buttons only needed definition for date of birth elements */}
                {/** onResponse returns api mutation return value from endpoint @target*  */}
            </div>
        </Layout>
    )
}

export default Signup