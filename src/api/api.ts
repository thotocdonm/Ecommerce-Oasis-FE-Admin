import axios from "./axios.customize"


export const fetchUserWithPaginate = async (query: string) => {
    let res: any = await axios.get(`users/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}