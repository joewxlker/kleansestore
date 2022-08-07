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
    const [period, setPeriod] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCallback = useCallback((data: inferMutationOutput<'mongo.login' | 'mongo.sign-up'>) => {
        onResponse(data)
    }, [onResponse])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        const emptyCheck = Object.values(form).map(e => { return e === '' });
        const filtered = emptyCheck.filter((x) => x === true);
        if (((type.length - 1) + buttons.length) != Object.entries(form).length || filtered[0] === true)
            return setLoading(false);

        const res: any = await client.mutation(target, form);
        handleCallback(res)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <>
                    {type.map((types) => {
                        return (
                            <input
                                key={types}
                                name={types}
                                value={form[types]}
                                type={types}
                                placeholder={types}
                                onChange={setForm} />)
                    })}
                    {target === 'mongo.sign-up' ? (
                        <>
                            {buttons.map((day) =>
                                <button
                                    key={day}
                                    value={form[day]}
                                    name={day}
                                    onClick={e => setPeriod(day)}>
                                    {form[day] != undefined ? form[day] : day}
                                </button>)}</>) : <></>}
                    <button type='submit' disabled={false}> Submit </button>

                </>
            </form>
            {buttons.map((date) => {
                return (
                    <ul key={date}>{dateData[date].map((day) => {
                        return (
                            <>
                                {period === date &&
                                    <button
                                        key={day}
                                        name={date}
                                        value={day}
                                        onClick={(event: any) => { setForm(event); setPeriod('') }}>
                                        {day}
                                    </button>}</>)
                    })}</ul>
                )
            })}
        </>
    )
}