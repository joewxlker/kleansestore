export const setLocalData = (type, data) => {   
    localStorage.setItem(JSON.stringify(type), JSON.stringify(data))
    return
}
export const getLocalData = async (input) => {
    return await JSON.parse(localStorage.getItem(JSON.stringify(input)));
}