import { useState } from "react";

const useSetForm = () => {
  const [value, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    honeypot: '',
  });
  return [value, (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((oldValue) => {
      return { ...oldValue, [event.target?.name]: event.target.value };
    });
  },
  ];
};

export default useSetForm;