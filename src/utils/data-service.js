import Cookies from "js-cookie";

export const getDataFromCookie = (title) => {
    return Cookies.get(title)
}
export const setDataToCookie = (title, data) => {
    Cookies.set(title, data)
}
export const removeDataFromCookie = (title) => {
    Cookies.remove(title)
}
