interface IBackendRes<T> {
    "statusCode": number,
    "message": string,
    "data": T,
    "error"?: string
}

interface IBackendResPaginate<T> {
    "meta": {
        "current": number,
        "pageSize": number,
        "pages": number,
        "total": number
    },
    "result": T

}

interface IBackendResLogin {
    "access_token": string,
    "refresh_token": string,
    "user": {
        "_id": string,
        "name": string,
        "email": string,
        "role": string
    }
}

interface IBackendResFetchUserWithPaginate {
    "meta": {
        "current": number,
        "pageSize": number,
        "pages": number,
        "total": number
    },
    "result":
    {
        "_id": string,
        "name": string,
        "password": string,
        "email": string,
        "address": string,
        "role": string,
        "deletedAt": string,
        "isDeleted": boolean,
        "createdAt": string,
        "updatedAt": string,
        "__v": number,
    }[]
}

interface IUsersData {
    "_id": string,
    "name": string,
    "password"?: string,
    "email": string,
    "address": string,
    "role": string,
    "deletedAt"?: string,
    "isDeleted"?: boolean,
    "createdAt"?: string,
    "updatedAt"?: string,
    "__v"?: number,
}

interface IProductsData {
    "_id": string,
    "name": string,
    "price": number,
    "colors":
    {
        "colorName": string,
        "colorCode": string,
        "image": string[]
    }[],
    "size": string[]
    "quantity": number,
    "sold": number,
    "type": string,
    "style": string,
    "deletedAt": string,
    "createdBy": {
        "_id": string,
        "email": string
    },
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

interface IReviewsData {
    "_id": string,
    "rating": 5,
    "content": string,
    "product":
    {
        "_id": string,
        "name": string
    }[]
    ,
    "createdBy": {
        "_id": string,
        "email": string,
        "name": string
    },
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

interface IOrdersData {
    "_id": string,
    "user": {
        "_id": string,
        "name": string,
        "email": string
    },
    "name": string,
    "address": string,
    "phone": string,
    "price": number,
    "status": string,
    "detail": [
        {
            "productName": string,
            "quantity": number,
            "_id": string
        }
    ],
    "isDeleted": boolean,
    "deletedAt": null,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

