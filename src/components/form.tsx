import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import useSetForm from "../hooks/SetForm";
import { sendData } from "../utils/sendData";
import { dateData } from "../utils/siteInfo";

interface ButtonProps { buttons: Array<'day' | 'month' | 'year'>; }
interface LoginProps { onResponse: (data: boolean) => void }

interface FormProps extends ButtonProps, LoginProps {
    type: Array<'firstname' | 'lastname' | 'email' | 'pass' | 'word' | 'hidden' | 'message' | 'day' | 'month' | 'year'>;
    target: string;
};

export const Form: FC<FormProps> = ({ type, target, buttons, onResponse }): JSX.Element => {

    const [form, setForm] = useSetForm();
    const [period, setPeriod] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCallback = useCallback((data: boolean) => {
        onResponse(data)
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        const emptyCheck = Object.values(form).map(e => { return e === '' });
        const filtered = emptyCheck.filter((x) => x === true);

        if (((type.length - 1) + buttons.length) != Object.entries(form).length || filtered[0] === true)
            return setLoading(false);

        sendData(target, form,).then((data) => { handleCallback(data); setLoading(false) })
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
                    {target === 'sign-up' ? (
                        <>
                            {buttons.map((day) =>
                                <button
                                    value={form[day]}
                                    name={day}
                                    onClick={e => setPeriod(day)}>
                                    {form[day] != undefined ? form[day] : day}
                                </button>)}</>) : <></>}
                    <button type='submit' disabled={loading}> Submit </button>

                </>
            </form>
            {buttons.map((date) => {
                return (
                    <ul>{dateData[date].map((day) => {
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