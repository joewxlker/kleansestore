
export const sendData = async (target, value) => {
    let output = '';
    await fetch(`${process.env.REACT_APP_APIURL}/api/${target}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    }).then((res) => res.json())
        .then((data) => { output = data })
    return output
}

export const getData = async (target) => {
    let output = '';
    await fetch(`${process.env.REACT_APP_APIURL}/api/${target}`,{
        method: 'get',
        data: 'json',
    }).then((res) => res.json())
        .then((data) => { output = data})
    return output
}
