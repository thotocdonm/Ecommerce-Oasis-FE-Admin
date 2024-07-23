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