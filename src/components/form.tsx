import { FC, FormEvent, useCallback, useState } from "react";
import useSetForm from "../hooks/SetForm";
import { client } from "../pages/_app";
import { dateData } from "../utils/siteInfo";
import { inferMutationOutput } from "../utils/trpc";

interface ButtonProps { buttons: Array<'day' | 'month' | 'year'>; }
interface LoginProps { onResponse: (data?: inferMutationOutput<'mongo.login' | 'mongo.sign-up'>) => void }

interface FormProps extends ButtonProps, LoginProps {
    type: Array<'firstname' | 'lastname' | 'email' | 'password' | 'hidden' | 'message' | 'day' | 'month' | 'year'>;
    target: `mongo.${'sign-up' | 'login'}` | `sendgrid.send-email`;
};

export const Form: FC<FormProps> = ({ type, target, buttons, onResponse }): JSX.Element => {

    const [form, setForm] = useSetForm();
    const [period, setPeriod] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCallback = useCallback((data: inferMutationOutput<'mongo.login' | 'mongo.sign-up'>) => {
        onResponse(data)
        // pass data to parent elements
    }, [onResponse])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        const emptyCheck = Object.values(form).map(e => { return e === '' });
        console.log(emptyCheck)
        // returns true at index of ''
        const filtered = emptyCheck.filter((x) => x === true);
        // filters through array of boolean values, returns empty array | [true, ...] 
        if (((type.length - 1) + buttons.length) != Object.entries(form).length || filtered[0] === true)
            /** -1 here to remove hidden input value from equation, 
             * checks length of properties passed to component matches form input length.
            */
            return setLoading(false);
        // returns, no data is sent to server

        const res: any = await client.mutation(target, form);
        //tRPC request
        handleCallback(res)

        //TODO fix infered output typing from tRPC
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <>

                    {type.map((types) => {
                        /** type is passed from parent elements,  */
                        return (
                            <input
                                key={types}
                                name={types}
                                value={form[types]}
                                type={types}
                                placeholder={types}
                                onChange={setForm} />)
                        //renders form text input elements  
                    })}


                    {target === 'mongo.sign-up' ? (
                        /** date of birth form elements only required for signup */
                        <>
                            {buttons.map((day) =>
                                <button
                                    key={day}
                                    value={form[day]}
                                    name={day}
                                    onClick={e => setPeriod(day)}>
                                    {form[day] != undefined ? form[day] : day}
                                </button>)}</>) : <></>}

                    {buttons.map((date) => {
                        // maps button types to ul
                        return (
                            <ul key={date}> {dateData[date].map((day) => {
                                //maps list items based on button type

                                return (
                                    <>
                                        {period === date &&
                                            <button
                                                key={day} // 1,2,3,4 | january,february etc
                                                name={date} // day, month, year
                                                value={day}
                                                onClick={(event: any) => { setForm(event); setPeriod('') }}>
                                                {/* creates key value pair from name + value props */}
                                                {day}
                                            </button>}</>)
                            })}</ul>
                        )
                    })}


                </>
                <button type='submit' disabled={!loading}> Submit </button>
            </form>
        </>
    )
}