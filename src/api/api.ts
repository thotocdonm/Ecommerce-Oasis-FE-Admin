import axios from "./axios.customize"


export const fetchUserWithPaginate = async (query: string) => {
    let res: any = await axios.get(`users/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const createNewUser = async (values: any) => {
    const { name, role, email, address, password } = values
    let res: any = await axios.post(`users`, { name, role, email, address, password })
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const updateUser = async (values: any) => {
    const { _id, name, role, email, address } = values
    let res: any = await axios.patch(`users/${_id}`, { name, role, email, address })
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const deleteUser = async (id: string) => {
    let res: any = await axios.delete(`users/${id}`);
    if (res && res.data) {
        return res
    }
    else return res.error
}