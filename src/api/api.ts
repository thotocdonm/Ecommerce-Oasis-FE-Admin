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

export const fetchProductsWithPaginate = async (query: string) => {
    let res: any = await axios.get(`products/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const addNewProduct = async (data: any) => {
    let res: any = await axios.post(`products`, data)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const updateAProduct = async (data: any, id: string) => {
    let res: any = await axios.patch(`products/${id}`, data)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const deleteAProduct = async (id: string) => {
    let res: any = await axios.delete(`products/${id}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const removeProductImage = async (name: string) => {
    let res: any = await axios.delete(`files/remove/${name}`, {
        headers: {
            folder_type: 'products'
        }
    })
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const uploadMultipleFile = async (files: File[]) => {
    let res: any = await axios.post(`files/multipleUpload`, files)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const uploadFile = async (file: any) => {
    let res: any = await axios.post(`files/upload`, file, {
        headers: {
            'folder_type': 'products'
        }
    })
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const fetchReviewsWithPaginate = async (query: string) => {
    let res: any = await axios.get(`reviews/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const deleteAReview = async (id: string) => {
    let res: any = await axios.delete(`reviews/${id}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const fetchOrdersWithPaginate = async (query: string) => {
    let res: any = await axios.get(`orders/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const finishAOrder = async (id: string) => {
    let res: any = await axios.post(`orders/${id}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const fetchSubscribersWithPaginate = async (query: string) => {
    let res: any = await axios.get(`subscribers/?${query}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const deleteASubscriber = async (id: string) => {
    let res: any = await axios.delete(`subscribers/${id}`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const getTotalPrice = async () => {
    let res: any = await axios.get(`orders/total-price`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

export const getTotalOrders = async () => {
    let res: any = await axios.get(`orders/total-orders`)
    if (res && res.data) {
        return res
    }
    else return res.error
}

