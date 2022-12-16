import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import useSetForm, { FormData } from "../hooks/SetForm";
import { dateData } from "../utils/siteInfo";

interface FormProps {
  formData: FormData;
  onResponse: (data: any) => Promise<JSX.Element | null>;
  buttons: Array<"day" | "month" | "year"> | [];
}

export const Form: FC<FormProps> = ({ buttons, onResponse, formData }): JSX.Element => {
  const [form, setForm] = useSetForm(formData);
  const [input, setInput] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<JSX.Element | null>();

  const handleCallback = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const res = await onResponse(form);
      setLoading(false);
      setError(res);
    },
    [onResponse, form],
  );

  useEffect(() => {
    if (form["hidden"] !== "") return setInput(false);
    const text = Object.values(form).filter(e => e === "");
    const button = buttons.filter(x => form[x] === undefined);
    return setInput(text.length === 1 && button.length === 0);
  }, [form, setForm, buttons]);

  return (
    <div className="h-1/2">
      <form className="p-3 flex flex-col w-full justify-center items-center " onSubmit={e => handleCallback(e)}>
        <div className="w-full">
          {Object.keys(formData).map(types => {
            /** type is passed from parent elements,  */
            return (
              <>
                <input
                  className="w-full bg-grey p-2 m-2 text-white"
                  style={{ paddingBottom: `${types === "message" && "10rem"}` }}
                  key={types}
                  name={types}
                  value={Object.values(form)[Object.keys(form).indexOf(types)]}
                  type={types === "confirm_password" ? "password" : types}
                  placeholder={types}
                  onChange={e => {
                    setForm(e, "");
                  }}
                />
              </>
            );
            //renders form text input elements
          })}

          {buttons.map(period => {
            return (
              <select className="w-full p-2 m-2" key={period} name={period}>
                <option value="" disabled selected>
                  {period}
                </option>
                {dateData[period].map(value => {
                  return (
                    <>
                      <option
                        key={value}
                        value={value}
                        placeholder={period}
                        onClick={(event: any) => {
                          setForm(event, period);
                        }}
                      >
                        {value}
                      </option>
                    </>
                  );
                })}
              </select>
            );
          })}
        </div>
        <button className="bg-grey text-white p-2 px-5" type="submit" disabled={!input} style={{ opacity: `${!input ? "50%" : "100%"}` }}>
          Submit
        </button>
      </form>

      <div className="w-full justify-center items-center flex flex-col">{error}</div>
      {loading && <p>Loading...</p>}
    </div>
  );
};
