interface IBackendRes<T> {
    "statusCode": number,
    "message": string,
    "data": T,
    "error"?: string
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

