import { JSONObject } from "superjson/dist/types";

export const sendData = async (target: string, value: JSONObject) => {

    const res = await fetch(`http://localhost:3000/api/${target}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
    return res.json();

}

export const getData = async (target: string) => {
    let output = '';
    await fetch(`${process.env.REACT_APP_APIURL}/api/${target}`, {
        method: 'get',
    }).then((res) => res.json())
        .then((data) => { output = data })
    return output
}
